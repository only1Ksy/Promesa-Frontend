import { AdminDelivery } from '@/types/admin/admin-delivery-controller';

import { axiosInstance, withErrorBoundary } from '../axios/instance';

/**
 * 배송 내역 수정 API
 * @param deliveryId 수정할 배송 ID (path param)
 * @param payload 수정할 배송 정보 (AdminDelivery)
 */
export const editDelivery = (deliveryId: number, payload: AdminDelivery) =>
  withErrorBoundary<[number, AdminDelivery], AdminDelivery>(
    async (deliveryId, payload) => {
      const res = await axiosInstance.put(`/admin/deliveries/${deliveryId}`, payload);
      return res.data.data;
    },
    deliveryId,
    payload,
  );

/**
 * 특정 주문의 배송 내역 조회
 * @param orderId 주문 ID
 * @returns AdminDelivery (배송 정보)
 */
export const fetchDeliveryByOrderId = (orderId: number) =>
  withErrorBoundary<[number], AdminDelivery>(async (orderId) => {
    const res = await axiosInstance.get(`/admin/orders/${orderId}/deliveries`);
    return res.data.data;
  }, orderId);
