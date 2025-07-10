import type { ItemControllerServerParams, ItemPreviewSchema } from '@/types/item-controller';

import { axiosInstance, withErrorBoundary } from './axios/instance';

export const fetchNowPopularItems = () =>
  withErrorBoundary<[], ItemPreviewSchema[]>(async () => {
    const res = await axiosInstance.get('/categories/0/items?page=0&size=5');
    return res.data.data.content;
  });

export const fetchShopItems = (params: ItemControllerServerParams) =>
  withErrorBoundary<[ItemControllerServerParams], { content: ItemPreviewSchema[]; totalPages: number }>(
    async (params) => {
      const { categoryId, page, sort, size } = params;
      const res = await axiosInstance.get(`/categories/${categoryId}/items?page=${page}&size=${size}&sort=${sort}`);
      return {
        content: res.data.data.content,
        totalPages: res.data.data.totalPages,
      };
    },
    params,
  );
