import { useRouter } from 'next/navigation';

import { EligibleReviewItem } from '@/types/review-controller';

import MyReviewProductCard from './my-review-product-card';

interface MyReviewAvailableProps {
  eligibleReviews: EligibleReviewItem[];
}

export default function MyReviewAvailable({ eligibleReviews }: MyReviewAvailableProps) {
  const router = useRouter();

  const writeReviewClicked = (orderItemId: number, itemId: number) => {
    router.push(`review/write/${orderItemId}?id=${itemId}`);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-8.75">
        {eligibleReviews.map((review, index) => (
          <>
            <div key={index} className="flex flex-col items-center justify-center gap-6.5 px-5">
              <MyReviewProductCard
                url={review.itemThumbnail}
                artistName={review.artistName}
                title={review.itemName}
                itemCount={review.quantity}
                date={review.orderDate}
              />
              <button
                onClick={() => writeReviewClicked(review.orderItemId, review.itemId)}
                className="flex h-8.75 w-85.5 cursor-pointer items-center justify-center rounded-xs border"
              >
                리뷰 쓰기
              </button>
            </div>
            {index !== eligibleReviews.length - 1 && <div className="bg-green h-[1px] w-full" />}
          </>
        ))}
      </div>
    </>
  );
}
