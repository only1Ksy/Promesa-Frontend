'use client';

import { useState } from 'react';

import ReviewImageOnly from '@/components/common/review/review-image-only';
import { Review } from '@/types/review.dto';

import ReviewCard from '../../common/review/review-card';
import ReviewPagination from './review-pagination';

interface ReviewListProps {
  reviews: Review[];
  itemId: number;
}

export default function ReviewList({ reviews, itemId }: ReviewListProps) {
  const REVIEWS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPage = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const visibleReviews = reviews.slice(currentPage * REVIEWS_PER_PAGE, (currentPage + 1) * REVIEWS_PER_PAGE);

  return (
    <div className="relative flex flex-col items-center">
      {currentPage === 0 && (
        <div className="flex flex-col items-center gap-5">
          <ReviewImageOnly
            imageUrls={[
              '/images/review1.jpg',
              '/images/review2.jpg',
              '/images/review3.jpg',
              '/images/review4.jpg',
              '/images/review5.jpg',
            ]}
            itemId={itemId}
          />
        </div>
      )}

      <div className="mb-10 flex w-full flex-col gap-5">
        {visibleReviews.map((review, i) => (
          <div key={i} className="flex flex-col items-center gap-5">
            <ReviewCard {...review} />
            {i !== visibleReviews.length - 1 && <div className="border-deep-green h-0 w-90.5 border-b" />}
          </div>
        ))}
      </div>

      {totalPage > 1 && (
        <ReviewPagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
