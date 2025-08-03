import { AdminOrderItemRequest, AdminOrderRequest, AdminOrderResponse } from '@/types/admin/admin-order-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

/**
 * 주문 상태 변경
 * PATCH /admin/orders/{orderId}
 *
 * @param orderId - 주문 ID (path param)
 * @param payload - 주문 상태 (AdminOrderRequest)
 * @returns 응답 메시지
 */
export const updateOrderStatus = (orderId: number, payload: AdminOrderRequest) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.patch(`/admin/orders/${orderId}`, payload);
    return res.data;
  });

/**
 * 주문 아이템 상태 변경
 * PATCH /admin/order-items/{orderItemId}
 *
 * @param orderItemId - 주문 아이템 ID (path param)
 * @param payload - 아이템 상태 (AdminOrderItemRequest)
 * @returns 응답 메시지
 */
export const updateOrderItemStatus = (orderItemId: number, payload: AdminOrderItemRequest) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.patch(`/admin/order-items/${orderItemId}`, payload);
    return res.data;
  });

/**
 * 주문 및 주문 아이템 목록 조회
 * GET /admin/orders
 *
 * @param params - 주문 상태(orderStatus) 또는 아이템 상태(itemStatus) 필터 (옵션)
 * @returns 주문 목록 (AdminOrderResponse)
 */
export const fetchAdminOrders = (params?: { orderStatus?: string; itemStatus?: string }) =>
  withErrorBoundary(async () => {
    const res = await axiosInstance.get<AdminOrderResponse>('/admin/orders', {
      params,
    });
    return res.data;
  });
