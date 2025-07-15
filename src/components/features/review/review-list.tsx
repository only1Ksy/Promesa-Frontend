'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import ReviewImageOnly from '@/components/common/review/review-image-only';
import type { ReviewListResponse } from '@/types/review-controller';

import ReviewCard from '../../common/review/review-card';
import ReviewPagination from './review-pagination';

interface ReviewListProps {
  reviews: ReviewListResponse;
  itemId: number;
  onPageChange: (page: number) => void;
}

export default function ReviewList({ reviews, itemId, onPageChange }: ReviewListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const listTopRef = useRef<HTMLDivElement>(null);

  const { content, pageable, totalPages } = reviews;
  const currentPage = pageable.pageNumber;

  // 페이지 이동 시 스크롤 및 onPageChange 호출
  const onPageChangeFunction = (page: number) => {
    const target = listTopRef.current;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        onPageChange(page);
        router.push(`?page=${page + 1}`);
      }, 400);
    } else {
      onPageChange(page);
      router.push(`?page=${page + 1}`);
    }
  };

  useEffect(() => {
    const pageFromParams = Number(searchParams.get('page')) || 1;
    onPageChange(pageFromParams - 1); // 서버 데이터 요청
  }, [searchParams]);

  return (
    <div ref={listTopRef} className="relative flex w-full flex-col items-center">
      {currentPage === 0 && (
        <div className="flex w-full flex-col items-center gap-5">
          <ReviewImageOnly imageUrls={content.flatMap((r) => r.reviewImages ?? [])} itemId={itemId} />
        </div>
      )}

      <div className="mb-10 flex w-full flex-col gap-5">
        {content.map((review, i) => (
          <div key={review.reviewId ?? i} className="flex flex-col items-center gap-5">
            <ReviewCard {...review} />
            {i !== content.length - 1 && <div className="border-deep-green h-0 w-90.5 border-b" />}
          </div>
        ))}
      </div>

      <ReviewPagination currentPage={currentPage} totalPage={totalPages} onPageChange={onPageChangeFunction} />
    </div>
  );
}
