'use client';

import { useState } from 'react';

import { Review } from '@/types/review.dto';

import ReviewCard from '../../common/review/review-card';
import ReviewPagination from './review-pagination';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const REVIEWS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPage = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const visibleReviews = reviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE);

  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-10 flex w-full flex-col gap-5">
        {visibleReviews.map((review, i) => (
          <div key={i} className="flex w-full flex-col items-center gap-5">
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
