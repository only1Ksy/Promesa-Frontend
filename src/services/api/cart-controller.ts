import { CartRequest, CartResponse, CartSchema } from '@/types/cart-controller';

import { axiosInstance } from './axios/instance';
import { withErrorBoundary } from './axios/instance';

/** 사용자의 장바구니 아이템 목록을 조회하는 함수 */
export const fetchCarts = () =>
  withErrorBoundary<[], CartResponse>(async () => {
    const res = await axiosInstance.get(`/carts`);
    return res.data.data;
  });

/** itemId, quantity를 전달하면 아이템을 장바구니에 추가하는 함수 */
export const postCarts = async (cartData: CartRequest): Promise<CartResponse> => {
  const res = await axiosInstance.post('/carts', cartData);
  return res.data.data;
};
