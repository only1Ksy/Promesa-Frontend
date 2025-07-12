import type { CategoryResponseSchema } from '@/types/category-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchParentCategories = () =>
  withErrorBoundary<[], CategoryResponseSchema[]>(async () => {
    const res = await axiosInstance.get('/categories/parent');
    return [{ id: 0, name: 'ALL' }, ...res.data.data];
  });

export const fetchChildCategories = (parentId: number) =>
  withErrorBoundary<[number], CategoryResponseSchema[]>(async (parentId: number) => {
    const res = await axiosInstance.get(`/categories/${parentId}`);
    return res.data.data;
  }, parentId);
