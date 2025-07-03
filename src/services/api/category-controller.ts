import type { CategorySchema } from '@/types/category-controller';

import { axiosInstance, withErrorBoundary } from './axios';

export const fetchParentCategories = () =>
  withErrorBoundary<[], CategorySchema[]>(async () => {
    const res = await axiosInstance.get('/categories/parent');
    return res.data.data;
  });

export const fetchChildCategories = (parentId: number) =>
  withErrorBoundary<[number], CategorySchema[]>(async (parentId: number) => {
    const res = await axiosInstance.get(`/categories/${parentId}`);
    return res.data.data;
  }, parentId);
