// src/components/common/review/review-card.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import ReviewStar from '@/public/icons/item/review-star.svg';
import { Review } from '@/types/review.dto';

export default function ReviewCard({ nickname, rating, date, description, images }: Review) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const updateOverflow = () => {
      if (!isExpanded) {
        const isClamped = el.scrollHeight > el.clientHeight + 2;
        setIsOverflowing(isClamped);
      }
    };

    const observer = new ResizeObserver(updateOverflow);
    observer.observe(el);
    updateOverflow();

    return () => observer.disconnect();
  }, [description, isExpanded]);

  return (
    <div className="flex w-full flex-col items-start gap-4 px-6">
      {/* 닉네임, 별점, 날짜 */}
      <div className="flex items-start justify-between self-stretch">
        <div className="flex w-53 items-start gap-2">
          <span className="text-grey-9 text-body-02 font-medium">{nickname}</span>
          <div className="flex items-center self-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <ReviewStar key={i} className={`h-3 w-3.25 ${i < rating ? 'text-orange' : 'text-deep-green'}`} />
            ))}
            <span className="text-grey-6 text-caption-01 self-center pl-1 font-medium">{rating}</span>
          </div>
        </div>
        <span className="text-caption-01 text-grey-5 font-medium">{date.replace(/-/g, '.')}</span>
      </div>

      {/* 사진, 코멘트 */}
      <div className="flex flex-col items-start gap-2 self-stretch">
        {images.length > 0 && (
          <div className="flex gap-2">
            {images.map((src, i) => (
              <div key={i} className="bg-green h-29 w-[115px] overflow-hidden rounded">
                <Image alt={`review image ${i + 1}`} src={src} width={115} height={116} className="object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* 텍스트 + gradient */}
        <div className="relative w-full">
          <div
            ref={textRef}
            className={`text-grey-9 text-body-02 font-medium ${
              isExpanded ? '' : 'line-clamp-2 max-h-10.5 overflow-hidden text-ellipsis'
            }`}
          >
            {description}
          </div>

          {/* 텍스트 가림막 레이어 */}
          {!isExpanded && isOverflowing && (
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-[42px] w-full"
              style={{
                background: 'linear-gradient(180deg, rgba(238, 239, 233, 0.00) -29.76%, #EEEFE9 100%)',
              }}
            />
          )}
        </div>

        {/* 더보기 버튼 */}
        {isOverflowing && (
          <button
            className="text-caption-01 text-grey-8 z-10 cursor-pointer self-end font-bold"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </div>
  );
}
