import type { AxiosError, AxiosHeaders, AxiosRequestHeaders } from 'axios';

import { useAccessTokenStore } from '@/lib/store/use-access-token-store';
import type { APIErrorResponse } from '@/types/axios.dto';

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
export const toErrorObject = (e: unknown): { message: string; status?: number } => {
  const err = e as AxiosError<APIErrorResponse>;

  const status = err.response?.status;
  const reason = err.response?.data?.reason;
  const fallbackMessage = err.message ?? 'Unknown error has occurred.';

  if (status && reason) {
    return { status, message: `${status}: ${reason}` };
  } else if (status) {
    return { status, message: `${status}: ${fallbackMessage}` };
  } else {
    return { message: fallbackMessage };
  }
};
