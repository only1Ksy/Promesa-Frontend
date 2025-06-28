'use client';

import { DehydratedState } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import ReviewList from '@/components/features/review/review-list';
import { fetchItemReviews } from '@/services/api/review-controller';

interface ClientReviewPageProps {
  itemId: number;
  itemReviewState: DehydratedState;
}

export default function ClientReviewPage({ itemId, itemReviewState }: ClientReviewPageProps) {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['itemReview'],
    queryFn: () => fetchItemReviews(),
    select: (res) => res.data,
  });
  /*
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['itemReview', itemId],
    queryFn: () => fetchItemReviews(),
    select: (res) => res.data,
  }); */

  if (!reviews || !itemId || isLoading) return null;

  return (
    <HydrationBoundary state={itemReviewState}>
      <div>
        <ReviewList reviews={reviews} />
      </div>
    </HydrationBoundary>
  );
}
