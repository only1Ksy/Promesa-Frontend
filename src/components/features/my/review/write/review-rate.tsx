'use client';

import ReviewStarIcon from '@/public/icons/item/review-star.svg';

interface ReviewRateProps {
  rating: number;
  hovered: number | null;
  setRating: (value: number) => void;
  setHovered: (value: number | null) => void;
}

export default function ReviewRate({ rating, hovered, setRating, setHovered }: ReviewRateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-1">
        <span className="text-subhead font-bold">상품은 어떠셨나요?</span>
        <span className="text-body-02 font-regular">별점을 눌러 평가해주세요</span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((val) => (
          <ReviewStarIcon
            width={29}
            height={29}
            key={val}
            className={`cursor-pointer select-none ${(hovered ?? rating) >= val ? 'text-orange' : 'text-deep-green'}`}
            onMouseEnter={() => setHovered(val)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setRating(val)}
          />
        ))}
      </div>
    </div>
  );
}
