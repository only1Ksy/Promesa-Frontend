import type { AxiosError, AxiosHeaders, AxiosRequestHeaders } from 'axios';

import { useAccessTokenStore } from '@/lib/store/use-access-token-store';
import type { APIErrorResponse } from '@/types/axios.dto';
import { HttpError } from '@/types/axios.dto';

// bypass
export const BYPASS_PATHS = ['/auth/logout', '/auth/reissue'];

export const shouldBypass = (url?: string | null): boolean => !!url && BYPASS_PATHS.some((p) => url.startsWith(p));

// header
export function setHeader(headers: AxiosHeaders | AxiosRequestHeaders, key: string, value: string): void {
  if (typeof (headers as AxiosHeaders).set === 'function') {
    (headers as AxiosHeaders).set(key, value);
  } else {
    (headers as AxiosRequestHeaders)[key] = value;
  }
}

// token store
export const store = useAccessTokenStore.getState;

// error format
export const toHttpError = (e: unknown): HttpError => {
  const err = e as AxiosError<APIErrorResponse>;

  const status = err.response?.status;
  const reason = err.response?.data?.reason;
  const fallbackMessage = err.message ?? 'Unknown error has occurred.';

  const message =
    status && reason ? `${status}: ${reason}` : status ? `${status}: ${fallbackMessage}` : fallbackMessage;

  return new HttpError(message, status);
};
