// components/review/review-list.tsx
'use client';

import { useState } from 'react';

import { Review } from '@/types/review.dto';

import ReviewCard from './review-card';
import ReviewPagination from './review-pagination';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const REVIEWS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const sliced = reviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE);

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex w-full flex-col gap-10">
        {sliced.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>
      <ReviewPagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
    </div>
  );
}
