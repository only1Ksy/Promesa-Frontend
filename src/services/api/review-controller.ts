import type { ReviewListResponse } from '@/types/review.dto';

import { withErrorBoundary } from './axios/instance';
import { axiosInstance } from './axios/instance';

/** itemId, page, size를 넣으면 해당 아이템, 해당 페이지의 리뷰 리스트를 반환하는 함수*/
export const fetchItemReviews = (itemId: number, page: number = 0, size: number = 10) =>
  withErrorBoundary<[number, number, number], ReviewListResponse>(
    async (itemId, page, size) => {
      const res = await axiosInstance.get(`/items/${itemId}/reviews`, {
        params: {
          page,
          size,
        },
      });
      return res.data;
    },
    itemId,
    page,
    size,
  );
