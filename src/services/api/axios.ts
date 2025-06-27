import type { AxiosError } from 'axios';
import axios from 'axios';

import type { APIErrorResponse } from '@/types/axios.dto';

const isServer = typeof window === 'undefined';

export const axiosInstance = axios.create({
  baseURL: isServer ? process.env.API_BASE_URL : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// template
export async function withErrorBoundary<Args extends unknown[], Return>(
  fn: (...args: Args) => Promise<Return>,
  ...args: Args
): Promise<Return> {
  try {
    return await fn(...args);
  } catch (error) {
    const err = error as AxiosError<APIErrorResponse>;
    const message = err.response?.data?.reason ?? err.message ?? 'Unknown error has occurred.';
    throw new Error(message);
  }
}
