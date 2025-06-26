import Image from 'next/image';

import ReviewStar from '@/public/icons/item/review-star.svg';

export default function ReviewCard() {
  return (
    <div className="flex w-full flex-col items-start gap-4 px-6">
      {/* 닉네임, 별점, 날짜 */}
      <div className="flex items-start justify-between self-stretch">
        <div className="flex w-53 items-start gap-2">
          <span className="text-grey-9 text-body-02 font-medium">닉네임</span>
          {/* 별점 아이콘 반복 */}
          <div className="flex items-center self-center">
            {Array.from({ length: 5 }).map(
              (_, i) =>
                i < 4 ? (
                  <ReviewStar key={i} className="h-3 w-3.25" />
                ) : (
                  <ReviewStar key={i} className="h-3 w-3.25 opacity-30" />
                ), // or ReviewStarEmpty
            )}
            <span className="text-grey-6 text-caption-01 self-center pl-1 font-medium">4</span>
          </div>
        </div>
        <span className="text-caption-01 text-grey-5 font-medium">2025.06.20</span>
      </div>
      {/* 사진, 코멘트 */}
      <div className="flex flex-col items-start gap-5 self-stretch">
        <div className="bg-green h-29 w-[115px]">
          <Image alt="review image" src={''} />
        </div>
        <div className="text-grey-9 text-body-02 max-h-10.5 max-w-90.5 overflow-hidden font-medium overflow-ellipsis">
          너므기여워요너무귀여워용너므기여워요너무귀여워용너므기여워요너무귀여{' '}
        </div>
      </div>
    </div>
  );
}
