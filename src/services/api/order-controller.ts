import { AddressSchema } from '@/types/address-controller';
import { OrderRequestSchema, OrderResponseSchema, OrderSummary } from '@/types/order-controller';

import { withErrorBoundary } from './axios/instance';
import { axiosInstance } from './axios/instance';

/** 이름, 우편번호, 메인주소, 서브주소, 핸드폰번호를 전달하면 기본 배송지로 설정하는 함수 */
export const postDefaultAddress = (
  recipientName: string,
  zipCode: string,
  addressMain: string,
  addressDetails: string,
  recipientPhone: string,
) =>
  withErrorBoundary<[string, string, string, string, string], AddressSchema>(
    async (recipientName, zipCode, addressMain, addressDetails, recipientPhone) => {
      const res = await axiosInstance.post('/orders/address', {
        recipientName,
        zipCode,
        addressMain,
        addressDetails,
        recipientPhone,
      });

      return res.data.data;
    },
    recipientName,
    zipCode,
    addressMain,
    addressDetails,
    recipientPhone,
  );

/** OrderRequestSchema에 맞는 인자를 전달하면 주문하는 함수 */
export const postOrder = (orderData: OrderRequestSchema) =>
  withErrorBoundary<[OrderRequestSchema], OrderResponseSchema>(async (orderData) => {
    const res = await axiosInstance.post('/orders', orderData);
    return res.data.data;
  }, orderData);

/** orderId를 전달하면 주문내역 상세조회 결과를 반환하는 함수 */
export const fetchDetailedOrder = (orderId: number) =>
  withErrorBoundary<[number], OrderResponseSchema>(async (orderId) => {
    const res = await axiosInstance.get(`/orders/${orderId}`);
    return res.data.data;
  }, orderId);

/** 사용자의 주문 내역 목록을 조회하는 함수 */
export const fetchOrders = () =>
  withErrorBoundary<[], OrderSummary[]>(async () => {
    const res = await axiosInstance.get(`/orders`);
    return res.data.data;
  });
