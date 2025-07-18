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
export const PostReviewImages = (
  imageType: string = 'MEMBER',
  subType: string = 'REVIEW',
  subReferenceId: number,
  fileNames: string[],
) =>
  withErrorBoundary<[string, string, number, string[]], PresignedUrlResponse>(
    async (imageType, subType, subReferenceId, fileNames) => {
      const res = await axiosInstance.post('/review-images/presigned-url', {
        imageType,
        subType,
        subReferenceId,
        fileNames,
      });

      return res.data.data;
    },
    imageType,
    subType,
    subReferenceId,
    fileNames,
  );

/** itemId, memberId, content, rating, imageKeys를 전달하면 리뷰를 업로드하는 함수 */
export const PostReview = (itemId: number, content: string, rating: number, imageKeys: string[]) =>
  withErrorBoundary<[number, string, number, string[]], PresignedUrlResponse>(
    async (itemId, content, rating, imageKeys) => {
      const res = await axiosInstance.post(`/items/${itemId}/reviews`, {
        content,
        rating,
        imageKeys,
      });

      return res.data.data;
    },
    itemId,
    content,
    rating,
    imageKeys,
  );
