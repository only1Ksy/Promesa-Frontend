import axios from 'axios';

import { store } from './utils';

const baseURL = typeof window === 'undefined' ? process.env.API_BASE_URL : '/api';

export const rawAxios = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// reissue - need to refactor (Invalid CORS request)
let reissuePromise: Promise<string | null> | null = null;

export const reissueOnce = async (): Promise<string | null> => {
  if (reissuePromise) return reissuePromise;

  reissuePromise = (async () => {
    try {
      const { data } = await rawAxios.post('/auth/reissue');
      const newToken = data.data.data.accessToken as string | undefined;
      if (newToken) {
        store().setAccessToken(newToken);
        return newToken;
      }
      return null;
    } catch {
      return null;
    } finally {
      reissuePromise = null;
    }
  })();

  return reissuePromise;
};

// logout
let logoutInProgress = false;

export const logoutOnce = async (): Promise<void> => {
  if (logoutInProgress) return;

  logoutInProgress = true;

  try {
    await rawAxios.post('/auth/logout').catch(() => undefined);
  } finally {
    store().clear();
    logoutInProgress = false;
  }
};

// is logged in
export const fetchIsLoggedIn = async (): Promise<boolean> => {
  const call = async (accessToken?: string | null) => {
    return rawAxios.get('/auth/me', {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
    });
  };

  try {
    const res = await call(store().accessToken);
    return !!res.data?.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      const newToken = await reissueOnce();
      if (newToken) {
        try {
          const res = await call(newToken);
          return !!res.data?.data;
        } catch {}
      }

      await logoutOnce();
      return false;
    }

    throw err;
  }
};
