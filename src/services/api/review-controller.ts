import type { Review } from '@/types/review.dto';

import { withErrorBoundary } from './axios/instance';
import { axiosInstance } from './axios/instance';

/** itemId(number)를 넣으면 해당 아이템의 리뷰 리스트를 반환하는 함수*/
export const fetchItemReviews = (itemId: number) =>
  withErrorBoundary<[number], Review[]>(async (itemId: number) => {
    const res = await axiosInstance.get(`/items/${itemId}/reviews`);
    return res.data.data;
  }, itemId);
