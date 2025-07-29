import { useState } from 'react';

import { Review } from '@/types/review-controller';

import MyReviewCard from './my-review-card';
import MyReviewEditModal from './my-review-edit-modal';
import MyReviewProductCard from './my-review-product-card';

interface MyReviewAvailableProps {
  writtenReviews: Review[];
}

export default function MyReviewWritten({ writtenReviews }: MyReviewAvailableProps) {
  const [editingReview, setEditingReview] = useState<number | null>(null);

  const editReview = (reviewId: number) => {
    setEditingReview(reviewId);
  };

  const deleteReview = () => {};

  return (
    <>
      <div className="flex w-full flex-col gap-8.75">
        {writtenReviews.map((review, index) => (
          <>
            <div key={index} className="flex flex-col gap-5 px-5">
              <div className="flex flex-col items-center justify-center gap-6.5">
                <MyReviewProductCard
                  url={review.url}
                  artistName={review.artistName}
                  title={review.title}
                  itemCount={review.itemCount}
                  date={review.date}
                />
                <MyReviewCard rating={review.rating} content={review.content} reviewImages={review.reviewImages} />
              </div>
              <div className="text-grey-9 text-body-02 flex items-center gap-1.5 font-medium">
                <button
                  onClick={() => editReview(review.reviewId)}
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
            {index !== writtenReviews.length - 1 && <div className="bg-green h-[1px] w-full" />}
            {editingReview === review.reviewId && (
              <MyReviewEditModal
                itemId={review.itemId}
                reviewId={review.reviewId}
                initialRating={review.rating}
                initialContent={review.content}
                initialPreviews={review.reviewImages}
                setIsModalOpen={() => setEditingReview(null)}
              />
            )}
          </>
        ))}
      </div>
    </>
  );
}
