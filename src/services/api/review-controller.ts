import type { EligibleReviewItem, PresignedUrlResponse, Review, ReviewListResponse } from '@/types/review-controller';

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

/** imageKey를 전달하면 해당 이미지를 DB에서 삭제하는 함수 */
export const DeleteReviewImage = (key: string) =>
  withErrorBoundary<[string], string>(async (key) => {
    const res = await axiosInstance.delete('/review-images', {
      params: { key },
    });
    return res.data.data;
  }, key);

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

/** itemId, reviewId, {content, rating, imageKeys} 중 수정사항을 전달하면 반영하는 함수 */
export const PatchReview = (itemId: number, reviewId: number, content: string, rating: number, imageKeys: string[]) =>
  withErrorBoundary<[number, number, string, number, string[]], Review>(
    async (itemId, reviewId, content, rating, imageKeys) => {
      const res = await axiosInstance.patch(`/items/${itemId}/reviews/${reviewId}`, {
        content,
        rating,
        imageKeys,
      });

      return res.data.data;
    },
    itemId,
    reviewId,
    content,
    rating,
    imageKeys,
  );

/** itemId, reviewId를 전달하면 리뷰를 삭제하는 함수 */
export const DeleteReview = (itemId: number, reviewId: number) =>
  withErrorBoundary<[number, number], string>(
    async (itemId, reviewId) => {
      const res = await axiosInstance.delete(`/items/${itemId}/reviews/${reviewId}`);

      return res.data.data;
    },
    itemId,
    reviewId,
  );

/** 사용자의 작성한 리뷰 목록을 반환하는 함수 */
export const fetchMyWrittenReviews = () =>
  withErrorBoundary<[], Review[]>(async () => {
    const res = await axiosInstance.get(`/members/me/reviews`);
    return res.data.data;
  });

/** 사용자의 작성 가능한 리뷰 목록을 반환하는 함수 */
export const fetchMyEligibleReviews = () =>
  withErrorBoundary<[], EligibleReviewItem[]>(async () => {
    const res = await axiosInstance.get(`/members/me/reviews/eligible`);
    return res.data.data;
  });
