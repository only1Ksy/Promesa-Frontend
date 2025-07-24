// src/components/common/review/review-card.tsx
'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import ImageZoomModal from '@/components/common/review/image-zoom-modal';
import Expandable from '@/components/common/utilities/expandable';
import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { useImageZoomModal } from '@/hooks/use-image-zoom-modal';
import DropdownIcon from '@/public/icons/item/drop-down.svg';
import ReviewStarIcon from '@/public/icons/item/review-star.svg';

interface MyReviewCardProps {
  rating: number;
  content: string;
  reviewImages: string[];
}

export default function MyReviewCard({ rating, content, reviewImages }: MyReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const collapsedHeightPx = 42; // 10.5 * 4 (spacing rem -> px 기준으로)
    setShowToggle(el.scrollHeight > collapsedHeightPx);
  }, [content]);

  const { imageSrc, openModal, closeModal, isOpen } = useImageZoomModal();

  return (
    <>
      {isOpen && imageSrc && <ImageZoomModal src={imageSrc} onClose={closeModal} />}
      <div className="flex w-full flex-col items-start gap-3">
        {/* 별점 */}
        <div className="flex items-start justify-between self-stretch">
          <div className="flex w-53 items-start gap-2">
            <div className="flex items-center self-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <ReviewStarIcon key={i} className={`h-3 w-3.25 ${i < rating ? 'text-orange' : 'text-deep-green'}`} />
              ))}
              <span className="text-grey-6 text-caption-01 self-center pl-1 font-medium">{rating}</span>
            </div>
          </div>
        </div>

        {/* 사진, 코멘트 */}
        <div className="flex flex-col items-start gap-5 self-stretch">
          {/* 텍스트 + gradient */}
          <div className="flex flex-col gap-1">
            <div className="relative w-full">
              <Expandable
                flag={isExpanded}
                collapsedMaxHeight={10.5}
                durationTime={300}
                className="text-grey-9 text-body-02 font-medium"
              >
                <div ref={textRef}>{content}</div>
              </Expandable>

              {!isExpanded && showToggle && (
                <div
                  className="pointer-events-none absolute bottom-0 left-0 h-10.5 w-full"
                  style={{
                    background: 'linear-gradient(180deg, rgba(238, 239, 233, 0.00) -29.76%, #EEEFE9 100%)',
                  }}
                />
              )}
            </div>
            {/* 더보기 버튼 */}
            {showToggle && !isExpanded && (
              <button
                className="text-caption-01 text-grey-8 z-10 flex cursor-pointer items-center font-bold"
                onClick={() => setIsExpanded(true)}
              >
                <span className="inline-flex items-center gap-1">
                  더보기
                  <DropdownIcon className="stroke-grey-8 stroke-[1.4px]" />
                </span>
              </button>
            )}
          </div>
          <div className="flex flex-col">
            {reviewImages.length > 0 && (
              <div className="flex gap-2">
                {reviewImages.map((src, i) => (
                  <div key={i} className="bg-green h-29 w-28.75 overflow-hidden">
                    <button onClick={() => openModal(src)} className="h-full w-full cursor-pointer">
                      <ImageWithEffect
                        alt={`review image ${i + 1}`}
                        src={src}
                        width={115}
                        height={116}
                        className="object-cover"
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
