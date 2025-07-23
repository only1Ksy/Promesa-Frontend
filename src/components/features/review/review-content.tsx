'use client';

import { useQuery } from '@tanstack/react-query';

import ReviewImageGrid from '@/components/features/review/review-image-grid';
import ReviewList from '@/components/features/review/review-list';
import DividerIcon from '@/public/icons/item/divider.svg';
import ReviewStarIcon from '@/public/icons/item/review-star.svg';
import { fetchItemDetail } from '@/services/api/item-controller';
import type { ReviewListResponse } from '@/types/review-controller';

interface ReviewContentProps {
  reviews: ReviewListResponse;
  itemId: number;
  mode?: string | null;
  onPageChange: (page: number) => void;
}

export default function ReviewContent({ reviews, itemId, mode, onPageChange }: ReviewContentProps) {
  const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res,
  });

  if (!item) return null;

  const { content } = reviews;

  const averageRating = item.averageRating;

  return (
    <div className="relative flex w-full flex-col items-center pt-3" style={{ minHeight: 'calc(100vh - 46px)' }}>
      {mode === 'imageOnly' ? (
        <ReviewImageGrid imageUrls={content.flatMap((r) => r.reviewImages ?? [])} />
      ) : (
        <div className="flex h-full w-full flex-col items-center">
          <div className="flex w-full items-end justify-between px-5">
            <div className="flex items-center gap-2">
              <span className="text-subhead font-medium text-black">리뷰 ({item.reviewCount})</span>
              <div className="flex items-center gap-1">
                <ReviewStarIcon className="text-orange h-4 w-4" />
                <div className="text-grey-6 text-body-02 font-medium">
                  {averageRating} ({item.reviewCount})
                </div>
              </div>
            </div>
            <div className="text-grey-6 text-caption-01 cursor-pointer font-medium">리뷰쓰기</div>
          </div>
          <div className="pt-2 pb-3">
            <DividerIcon />
          </div>
          <div className="mb-4.5 flex w-full flex-col items-center gap-5">
            <ReviewList reviews={reviews} itemId={itemId} onPageChange={onPageChange} />
          </div>
        </div>
      )}
    </div>
  );
}
