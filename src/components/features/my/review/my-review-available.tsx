import { useRouter } from 'next/navigation';

import MyReviewProductCard from './my-review-product-card';

export default function MyReviewAvailable() {
  const router = useRouter();

  const REVIEW_TEMP = [
    {
      itemId: 1,
      url: '/src/review',
      artistName: '김영은',
      title: '빈티지 블랙 높은 잔 세트',
      itemCount: 5,
      date: '2025.05.25',
    },
    {
      itemId: 2,
      url: '/src/review',
      artistName: '김영은',
      title: '빈티지 블랙 높은 잔 세트',
      itemCount: 5,
      date: '2025.05.25',
    },
  ];

  const writeReviewClicked = (productId: number) => {
    router.push(`review/write/${productId}`);
  };

  return (
    <>
      <div className="flex w-full flex-col gap-8.75">
        {REVIEW_TEMP.map((review, index) => (
          <>
            <div key={index} className="flex flex-col items-center justify-center gap-6.5 px-5">
              <MyReviewProductCard
                url={review.url}
                artistName={review.artistName}
                title={review.title}
                itemCount={review.itemCount}
                date={review.date}
              />
              <button
                onClick={() => writeReviewClicked(review.itemId)}
                className="flex h-8.75 w-85.5 cursor-pointer items-center justify-center rounded-xs border"
              >
                리뷰 쓰기
              </button>
            </div>
            {index !== REVIEW_TEMP.length - 1 && <div className="bg-green h-[1px] w-full" />}
          </>
        ))}
      </div>
    </>
  );
}
