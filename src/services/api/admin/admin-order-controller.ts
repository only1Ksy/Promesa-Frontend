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
  withErrorBoundary<[number, AdminOrderRequest], string>(
    async (orderId, payload) => {
      const res = await axiosInstance.patch(`/admin/orders/${orderId}`, payload);
      return res.data.data;
    },
    orderId,
    payload,
  );

/**
 * 주문 아이템 상태 변경
 * PATCH /admin/order-items/{orderItemId}
 *
 * @param orderItemId - 주문 아이템 ID (path param)
 * @param payload - 아이템 상태 (AdminOrderItemRequest)
 * @returns 응답 메시지
 */
export const updateOrderItemStatus = (orderItemId: number, payload: AdminOrderItemRequest) =>
  withErrorBoundary<[number, AdminOrderItemRequest], string>(
    async (orderItemId, payload) => {
      const res = await axiosInstance.patch(`/admin/order-items/${orderItemId}`, payload);
      return res.data.data;
    },
    orderItemId,
    payload,
  );

/**
 * 주문 및 주문 아이템 목록 조회
 * GET /admin/orders
 *
 * @param params - 주문 상태(orderStatus) 또는 아이템 상태(itemStatus) 필터 (옵션)
 * @returns 주문 목록 (AdminOrderResponse)
 */
export const fetchAdminOrders = (params?: { orderStatus?: string; itemStatus?: string }) =>
  withErrorBoundary<[{ orderStatus?: string; itemStatus?: string }?], AdminOrderResponse>(async (params) => {
    const res = await axiosInstance.get('/admin/orders', {
      params,
    });
    return res.data.data;
  }, params);
