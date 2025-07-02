'use client';

import { DehydratedState } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import ReviewImageGrid from '@/components/features/review/review-image-grid';
import ReviewList from '@/components/features/review/review-list';
import DividerIcon from '@/public/icons/item/divider.svg';
import ReviewStarIcon from '@/public/icons/item/review-star.svg';
import { fetchItemReviews } from '@/services/api/review-controller';

interface ClientReviewPageProps {
  itemId: number;
  itemReviewState: DehydratedState;
}

export default function ClientReviewPage({ itemId, itemReviewState }: ClientReviewPageProps) {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['itemReview'],
    queryFn: () => fetchItemReviews(),
    select: (res) => res.data,
  });

  if (!reviews || !itemId || isLoading) return null;

  return (
    <HydrationBoundary state={itemReviewState}>
      <div className="flex min-h-100 flex-col items-center">
        <div
          className="w-full px-5 py-2"
          style={{
            background: 'linear-gradient(to bottom, #E1E1D7 0%, rgba(18, 71, 52, 0.05) 2px, transparent 10px)',
          }}
        />
        {mode === 'imageOnly' ? (
          <ReviewImageGrid imageUrls={reviews.map((r) => r.images || []).flat()} />
        ) : (
          <div className="flex min-h-100 flex-col items-center">
            <div className="flex w-full items-end justify-between px-5">
              <div className="flex items-center gap-2">
                <span className="text-subhead font-medium text-black">리뷰 ({reviews.length})</span>
                <div className="flex items-center gap-1">
                  <ReviewStarIcon className="text-orange h-4 w-4" />
                  <div className="text-grey-6 text-body-02 font-medium">4 (1)</div>
                </div>
              </div>
              <div className="text-grey-6 text-caption-01 cursor-pointer font-medium">리뷰쓰기</div>
            </div>
            <div className="pt-2 pb-3">
              <DividerIcon />
            </div>
            <div className="mb-4.5 flex w-full flex-col items-center gap-5">
              <ReviewList reviews={reviews} itemId={itemId} />
            </div>
          </div>
        )}
      </div>
    </HydrationBoundary>
  );
}
