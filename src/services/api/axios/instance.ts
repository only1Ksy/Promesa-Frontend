import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { logoutOnce, reissueOnce } from './auth';
import { setHeader, shouldBypass, store, toHttpError } from './utils';

const baseURL = typeof window === 'undefined' ? process.env.API_BASE_URL : '/api';

export const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (shouldBypass(config.url)) return config;

    const token = store().accessToken;
    if (token) setHeader(config.headers, 'Authorization', `Bearer ${token}`);

    return config;
  },
  (error) => Promise.reject(error),
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config, response } = error;
    const originalRequest = config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!response) {
      throw toHttpError(error);
    }

    if (response.status === 401 && !originalRequest._retry && !shouldBypass(originalRequest.url)) {
      originalRequest._retry = true;

      const newToken = await reissueOnce();

      if (newToken) {
        setHeader(originalRequest.headers, 'Authorization', `Bearer ${newToken}`);
        return axiosInstance(originalRequest);
      }

      await logoutOnce();
      return Promise.reject(error);
    }

    if (response.status === 403) {
      await logoutOnce();
    }

    return Promise.reject(error);
  },
);

// template
export async function withErrorBoundary<Args extends unknown[], Return>(
  fn: (...args: Args) => Promise<Return>,
  ...args: Args
): Promise<Return> {
  try {
    return await fn(...args);
  } catch (error) {
    throw toHttpError(error);
  }
}

// is logged in
export const fetchIsLoggedIn = async (): Promise<boolean> => {
  try {
    const res = await axiosInstance.get('/auth/me');
    return !!res.data?.data;
  } catch {
    return false;
  }
};
