import { CartRequest, CartResponse, CartSchema } from '@/types/cart-controller';

import { axiosInstance } from './axios/instance';
import { withErrorBoundary } from './axios/instance';

/** 사용자의 장바구니 아이템 목록을 조회하는 함수 */
export const fetchCarts = () =>
  withErrorBoundary<[], CartResponse>(async () => {
    const res = await axiosInstance.get(`/carts`);
    return res.data.data;
  });

/** itemId, quantity를 전달하면 아이템을 장바구니에 추가, 수량을 증가시키는 함수 */
export const postCarts = (cartsData: CartRequest) =>
  withErrorBoundary<[CartRequest], CartSchema>(async (cartsData) => {
    const res = await axiosInstance.post('/carts', cartsData);
    return res.data.data;
  }, cartsData);

/** itemId, quantity를 전달하면 아이템 수량을 전달한 quantity로 수정하는 함수 */
export const patchCarts = (cartsData: CartRequest) =>
  withErrorBoundary<[CartRequest], CartSchema>(async (cartsData) => {
    const res = await axiosInstance.patch('/carts', cartsData);
    return res.data.data;
  }, cartsData);

/** itemId를 전달하면 아이템을 장바구니에서 삭제하는 함수 */
export const deleteCarts = (itemId: number) =>
  withErrorBoundary<[number], CartSchema>(async (itemId) => {
    const res = await axiosInstance.delete(`/carts/${itemId}`);
    return res.data.data;
  }, itemId);
