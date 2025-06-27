import type { BrandInfoSchema } from '@/types/home-controller';

import { axiosInstance, withErrorBoundary } from './axios';

export const fetchBrandInfo = () =>
  withErrorBoundary<[], BrandInfoSchema>(async () => {
    const res = await axiosInstance.get('/brand-info');
    return res.data.data;
  });
