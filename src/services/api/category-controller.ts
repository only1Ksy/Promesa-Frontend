import type { CategoryResponseSchema } from '@/types/category-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchParentCategories = () =>
  withErrorBoundary<[], CategoryResponseSchema[]>(async () => {
    const res = await axiosInstance.get('/categories/parent');
    return [{ id: 0, name: 'ALL' }, ...res.data.data];
  });
