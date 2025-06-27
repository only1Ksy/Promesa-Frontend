import { useEffect, useState } from 'react';

import { Review } from '@/types/review.dto';

import ReviewCard from './review-card';
import ReviewPagination from './review-pagination';

interface ReviewListProps {
  reviews: Review[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  const REVIEWS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (!showAll) setCurrentPage(1);
  }, [showAll]);

  const totalPage = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const visibleReviews = showAll
    ? reviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE)
    : reviews.slice(0, 2);

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

      {showAll && totalPage > 1 && (
        <ReviewPagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
      )}

      <button
        onClick={() => setShowAll((prev) => !prev)}
        className="border-grey-9 text-body-02 text-grey-9 flex h-11 w-80.5 cursor-pointer items-center justify-center border font-bold"
      >
        {showAll ? '접기' : '전체 리뷰 보기'}
      </button>

      {/* 그라데이션 덮개 */}
      {!showAll && (
        <div
          className="pointer-events-none absolute bottom-15 left-0 z-10 h-13.5 w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(238, 239, 233, 0.00) -50%, #EEEFE9 100%)',
          }}
        />
      )}
    </div>
  );
}
