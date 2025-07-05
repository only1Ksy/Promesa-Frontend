'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageParam = Number(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam - 1); // 인덱스 0부터 시작

  const totalPage = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const visibleReviews = reviews.slice(currentPage * REVIEWS_PER_PAGE, (currentPage + 1) * REVIEWS_PER_PAGE);

  const listTopRef = useRef<HTMLDivElement>(null);

  // 뒤로가기/앞으로가기 page 동기화
  useEffect(() => {
    const pageFromParams = Number(searchParams.get('page')) || 1;
    setCurrentPage(pageFromParams - 1);
  }, [searchParams]);

  // 페이지 이동 시 상단으로 스크롤
  const onPageChangeFunction = (page: number) => {
    const target = listTopRef.current;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 스크롤 애니메이션이 완료된 후 페이지 변경
      setTimeout(() => {
        setCurrentPage(page);
        router.push(`?page=${page + 1}`);
      }, 400);
    } else {
      setCurrentPage(page);
      router.push(`?page=${page + 1}`);
    }
  };

  return (
    <div ref={listTopRef} className="relative flex w-full flex-col items-center">
      {currentPage === 0 && (
        <div className="flex w-full flex-col items-center gap-5">
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

      <div className="mb-10 flex min-h-191.5 w-full flex-col gap-5">
        {visibleReviews.map((review, i) => (
          <div key={i} className="flex flex-col items-center gap-5">
            <ReviewCard {...review} />
            {i !== visibleReviews.length - 1 && <div className="border-deep-green h-0 w-90.5 border-b" />}
          </div>
        ))}
      </div>

      {totalPage > 1 && (
        <ReviewPagination currentPage={currentPage} totalPage={totalPage} onPageChange={onPageChangeFunction} />
      )}
    </div>
  );
}
