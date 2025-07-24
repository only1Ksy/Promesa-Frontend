import MyReviewCard from './my-review-card';
import MyReviewProductCard from './my-review-product-card';

export default function MyReviewWritten() {
  const REVIEW_TEMP = [
    {
      url: '/src/review',
      artistName: '김영은',
      title: '빈티지 블랙 높은 잔 세트',
      itemCount: 5,
      date: '2025.05.25',
      rate: 4,
      reviewText:
        '디자인도 흔하지 않고, 너무 귀여워요. 근데 사이즈가 너무 커서 핸드폰에 달면 좀 불편하긴 합니다. 그래도 예뻐서 만족해요. 굿굿!! 디자인도 흔하지 않고, 너무 귀여워요. 근데 사이즈가 너무 커서 핸드폰에 달면 좀 불편하긴 합니다. 그래도 예뻐서 만족해요 ',
      reviewImages: ['/src/review1', '/src/review2', 'src/review3'],
    },
    {
      url: '/src/review',
      artistName: '김영은',
      title: '빈티지 블랙 높은 잔 세트',
      itemCount: 5,
      date: '2025.05.25',
      rate: 4,
      reviewText:
        '디자인도 흔하지 않고, 너무 귀여워요. 근데 사이즈가 너무 커서 핸드폰에 달면 좀 불편하긴 합니다. 그래도 예뻐서 만족해요. 굿굿!! 디자인도 흔하지 않고, 너무 귀여워요. 근데 사이즈가 너무 커서 핸드폰에 달면 좀 불편하긴 합니다. 그래도 예뻐서 만족해요 ',
      reviewImages: [],
    },
  ];

  const editReview = () => {};

  const deleteReview = () => {};

  return (
    <>
      <div className="flex w-full flex-col gap-8.75">
        {REVIEW_TEMP.map((review, index) => (
          <>
            <div className="flex flex-col gap-5 px-5">
              <div key={index} className="flex flex-col items-center justify-center gap-6.5">
                <MyReviewProductCard
                  url={review.url}
                  artistName={review.artistName}
                  title={review.title}
                  itemCount={review.itemCount}
                  date={review.date}
                />
                <MyReviewCard rating={review.rate} content={review.reviewText} reviewImages={review.reviewImages} />
              </div>
              <div className="text-grey-9 text-body-02 flex items-center gap-1.5 font-medium">
                <button
                  onClick={editReview}
                  className="flex h-8.75 w-24.25 cursor-pointer items-center justify-center rounded-xs border"
                >
                  수정
                </button>
                <button
                  onClick={deleteReview}
                  className="flex h-8.75 w-24.25 cursor-pointer items-center justify-center rounded-xs border"
                >
                  삭제
                </button>
              </div>
            </div>
            {index !== REVIEW_TEMP.length - 1 && <div className="bg-green h-[1px] w-full" />}
          </>
        ))}
      </div>
    </>
  );
}
