'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';

import MyReviewAvailable from '@/components/features/my/review/my-review-available';
import MyReviewEditModal from '@/components/features/my/review/my-review-edit-modal';
import MyReviewToggle from '@/components/features/my/review/my-review-toggle';
import MyReviewWritten from '@/components/features/my/review/my-review-written';
import { fetchMyEligibleReviews, fetchMyWrittenReviews } from '@/services/api/review-controller';

interface ClientMyReviewPageProps {
  myReviewsState: DehydratedState;
}

export default function ClientMyReviewPage({ myReviewsState }: ClientMyReviewPageProps) {
  const [activeTab, setActiveTab] = useState<'available' | 'written'>('available');

  const { data: writtenReviews, isLoading } = useQuery({
    queryKey: ['writtenReviews'],
    queryFn: () => fetchMyWrittenReviews(),
    select: (res) => res,
  });

  const { data: eligibleReviews, isLoading: isEligibleReviewLoading } = useQuery({
    queryKey: ['eligibleReviews'],
    queryFn: () => fetchMyEligibleReviews(),
    select: (res) => res,
  });

  if (!writtenReviews || !eligibleReviews || isLoading || isEligibleReviewLoading) return null;

  const isWrittenReviewsEmpty = writtenReviews.length === 0;
  const isEligibleReviewsEmpty = eligibleReviews.length === 0;

  return (
    <HydrationBoundary state={myReviewsState}>
      <div style={{ minHeight: 'calc(100vh - 46px)' }}>
        <div className="sticky top-11.5 z-40">
          <MyReviewToggle onSelect={setActiveTab} active={activeTab} />
        </div>
        <div className="py-8.75">
          {activeTab === 'available' ? (
            isEligibleReviewsEmpty ? (
              <p className="text-grey-6 text-body-01 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                작성 가능한 리뷰가 없어요
              </p>
            ) : (
              <MyReviewAvailable eligibleReviews={eligibleReviews} />
            )
          ) : isWrittenReviewsEmpty ? (
            <p className="text-grey-6 text-body-01 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              작성한 리뷰가 없어요
            </p>
          ) : (
            <MyReviewWritten writtenReviews={writtenReviews} />
          )}
        </div>
      </div>
      <MyReviewEditModal reviews={writtenReviews} />
    </HydrationBoundary>
  );
}
