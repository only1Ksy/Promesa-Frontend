import type { BrandInfoResponseSchema, SearchResponseSchema } from '@/types/home-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchSearch = (keyword: string) =>
  withErrorBoundary<[string], SearchResponseSchema>(async (keyword) => {
    const res = await axiosInstance.get(`/search?keyword=${keyword}`);
    return res.data.data;
  }, keyword);

export const fetchBrandInfo = () =>
  withErrorBoundary<[], BrandInfoResponseSchema>(async () => {
    const res = await axiosInstance.get('/brand-info');
    return res.data.data;
  });
