import type { AxiosError, AxiosRequestHeaders } from 'axios';

import { useAccessTokenStore } from '@/lib/store/use-access-token-store';
import type { APIErrorResponse } from '@/types/axios.dto';

import { rawAxios } from './raw';

// common utils
export const store = useAccessTokenStore.getState;

export const toErrorMessage = (e: unknown): string => {
  const err = e as AxiosError<APIErrorResponse>;
  return err.response?.data?.reason ?? err.message ?? 'Unknown error has occurred.';
};

export const setHeader = (headers: AxiosRequestHeaders, key: string, val: string) =>
  typeof headers.set === 'function' ? headers.set(key, val) : (headers[key] = val);

// logout and reissue once
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

const BYPASS_PATHS = new Set(['/auth/reissue', '/auth/logout']);
export const shouldBypass = (url?: string): boolean => !!url && [...BYPASS_PATHS].some((p) => url.endsWith(p));

let refreshing = false;
let refreshPromise: Promise<string | null> | null = null;
export let refreshFailed = false;

export const reissueOnce = async (): Promise<string | null> => {
  if (refreshFailed) return null;
  if (refreshing && refreshPromise) return refreshPromise;

  refreshing = true;
  refreshPromise = (async () => {
    try {
      const { data } = await rawAxios.post('/auth/reissue');
      const newToken = data.data.accessToken;

      if (newToken) {
        store().setAccessToken(newToken);
        return newToken;
      }

      throw new Error('No accessToken');
    } catch {
      refreshFailed = true;
      await logoutOnce();
      return null;
    } finally {
      refreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
