// import type { AxiosRequestHeaders } from 'axios';
import axios from 'axios';

// import { refreshFailed, reissueOnce, setHeader, shouldBypass, store, toErrorMessage } from './utils';
import { store, toErrorMessage } from './utils';

const isServer = typeof window === 'undefined';
const baseURL = isServer ? process.env.API_BASE_URL : '/api';

export const axiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = store().accessToken;

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

// // request interceptor
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     if (shouldBypass(config.url)) return config;

//     const token = store().accessToken ?? (await reissueOnce());

//     if (!token) throw new Error('UNAUTHENTICATED');

//     setHeader(config.headers as AxiosRequestHeaders, 'Authorization', `Bearer ${token}`);
//     return config;
//   },
//   (error) => Promise.reject(new Error(toErrorMessage(error))),
// );

// // response interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const { config, response } = error;

//     if (response.status === 401 && !shouldBypass(config.url) && !config._retry && !refreshFailed) {
//       config._retry = true;

//       const token = await reissueOnce();
//       if (token) {
//         setHeader(config.headers as AxiosRequestHeaders, 'Authorization', `Bearer ${token}`);
//         return axiosInstance(config);
//       }
//     }

//     throw new Error(toErrorMessage(error));
//   },
// );

// template
export async function withErrorBoundary<Args extends unknown[], Return>(
  fn: (...args: Args) => Promise<Return>,
  ...args: Args
): Promise<Return> {
  try {
    return await fn(...args);
  } catch (e) {
    throw new Error(toErrorMessage(e));
  }
}
