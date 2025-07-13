import type { PresignedUrlResponse, ReviewListResponse } from '@/types/review-controller';

import { withErrorBoundary } from './axios/instance';
import { axiosInstance } from './axios/instance';

/** itemId, page, size를 넣으면 해당 아이템, 해당 페이지의 리뷰 리스트를 반환하는 함수*/
export const fetchItemReviews = (itemId: number, page: number = 0, size: number = 10) =>
  withErrorBoundary<[number, number, number], ReviewListResponse>(
    async (itemId, page, size) => {
      const res = await axiosInstance.get(`/items/${itemId}/reviews`, {
        params: { page, size },
      });
      return res.data.data;
    },
    itemId,
    page,
    size,
  );

/** itemId와 fileNames를 전달하면 presigned URL들을 반환하는 함수 */
export const PostReviewImages = (imageType: string = 'REVIEW', referenceId: number, fileNames: string[]) =>
  withErrorBoundary<[string, number, string[]], PresignedUrlResponse>(
    async (imageType, referenceId, fileNames) => {
      const res = await axiosInstance.post('/review-images/presigned-url', {
        imageType,
        referenceId,
        fileNames,
      });

      return res.data.data;
    },
    imageType,
    referenceId,
    fileNames,
  );

/** itemId, memberId, content, rating, imageKeys를 전달하면 리뷰를 업로드하는 함수 */
// imageKey는 파일명
export const PostReview = (itemId: number, memberId: number, content: string, rating: number, imageKeys: string[]) =>
  withErrorBoundary<[number, number, string, number, string[]], PresignedUrlResponse>(
    async (itemId, memberId, content, rating, imageKeys) => {
      const res = await axiosInstance.post(`/items/${itemId}/reviews`, {
        itemId,
        memberId,
        content,
        rating,
        imageKeys,
      });

      return res.data.data;
    },
    itemId,
    memberId,
    content,
    rating,
    imageKeys,
  );
