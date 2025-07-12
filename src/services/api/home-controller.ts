import type { BrandInfoResponseSchema } from '@/types/home-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchBrandInfo = () =>
  withErrorBoundary<[], BrandInfoResponseSchema>(async () => {
    const res = await axiosInstance.get('/brand-info');
    return res.data.data;
  });
