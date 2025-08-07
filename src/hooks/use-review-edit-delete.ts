'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { DeleteReview, PatchReview, PostReview } from '@/services/api/review-controller';
import { HttpError } from '@/types/axios.dto';
import { Review } from '@/types/review-controller';

interface PostReviewArgs {
  itemId: number;
  orderItemId: number;
  content: string;
  rating: number;
  imageKeys: string[];
}

interface PatchReviewArgs {
  itemId: number;
  reviewId: number;
  content: string;
  rating: number;
  imageKeys: string[];
}

interface DeleteReviewArgs {
  itemId: number;
  reviewId: number;
}

export const useReviewMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const invalidateReviews = () => {
    queryClient.invalidateQueries({ queryKey: ['writtenReviews'] });
    queryClient.invalidateQueries({ queryKey: ['eligibleReviews'] });
  };

  const postReview = useMutation<Review, Error, PostReviewArgs>({
    mutationFn: async ({ itemId, orderItemId, content, rating, imageKeys }) => {
      return await PostReview(itemId, orderItemId, content, rating, imageKeys);
    },
    onSuccess: invalidateReviews,
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });

  const patchReview = useMutation<Review, Error, PatchReviewArgs>({
    mutationFn: async ({ itemId, reviewId, content, rating, imageKeys }) => {
      return await PatchReview(itemId, reviewId, content, rating, imageKeys);
    },
    onSuccess: invalidateReviews,
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });

  const deleteReview = useMutation<void, Error, DeleteReviewArgs>({
    mutationFn: async ({ itemId, reviewId }) => {
      await DeleteReview(itemId, reviewId);
    },
    onSuccess: invalidateReviews,
    onError: (error) => {
      if (error instanceof HttpError && error.status === 401) {
        router.push(`/login?afterLogin=${encodeURIComponent(pathname)}`);
      }
    },
  });

  return {
    postReview,
    patchReview,
    deleteReview,
  };
};
