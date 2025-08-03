import { AdminItemRequest } from '@/types/admin/admin-item-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

/**
 * 작품 정보를 수정하는 함수
 * @param itemId 수정할 item의 ID (URL path param)
 * @param payload 수정할 데이터 (AdminItemRequest)
 */
export const editItemDetail = (itemId: number, payload: AdminItemRequest) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.put(`/admin/items/${itemId}`, payload);
    return res.data.data;
  });

/**
 * 작품을 등록하는 함수
 * @param payload 등록할 데이터 (AdminItemRequest)
 */
export const postNewItem = (payload: AdminItemRequest) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.post('/admin/items', payload);
    return res.data.data;
  });
