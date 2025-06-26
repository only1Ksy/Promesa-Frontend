// components/review/review-card.tsx
import Image from 'next/image';

import ReviewStar from '@/public/icons/item/review-star.svg';
import { Review } from '@/types/review.dto';

export default function ReviewCard({ nickname, rating, date, description, images }: Review) {
  return (
    <div className="flex w-full flex-col items-start gap-4 px-6">
      {/* 닉네임, 별점, 날짜 */}
      <div className="flex items-start justify-between self-stretch">
        <div className="flex w-53 items-start gap-2">
          <span className="text-grey-9 text-body-02 font-medium">{nickname}</span>
          <div className="flex items-center self-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <ReviewStar key={i} className={`h-3 w-3.25 ${i < rating ? '' : 'opacity-30'}`} />
            ))}
            <span className="text-grey-6 text-caption-01 self-center pl-1 font-medium">{rating}</span>
          </div>
        </div>
        <span className="text-caption-01 text-grey-5 font-medium">{date.replace(/-/g, '.')}</span>
      </div>

      {/* 사진, 코멘트 */}
      <div className="flex flex-col items-start gap-5 self-stretch">
        {images.length > 0 && (
          <div className="flex gap-2">
            {images.map((src, i) => (
              <div key={i} className="bg-green h-29 w-[115px] overflow-hidden rounded">
                <Image alt={`review image ${i + 1}`} src={src} width={115} height={116} className="object-cover" />
              </div>
            ))}
          </div>
        )}
        <div className="text-grey-9 text-body-02 line-clamp-3 max-w-90.5 overflow-hidden font-medium text-ellipsis">
          {description}
        </div>
      </div>
    </div>
  );
}
