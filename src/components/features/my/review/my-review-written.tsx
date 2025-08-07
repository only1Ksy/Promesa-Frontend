import { useRouter } from 'next/navigation';

import { useToast } from '@/components/common/alert/toast-provider';
import useAlert from '@/hooks/use-alert';
import { useReviewMutations } from '@/hooks/use-review-edit-delete';
import { WrittenReviewsResponse } from '@/types/review-controller';

import MyReviewCard from './my-review-card';
import MyReviewProductCard from './my-review-product-card';

interface MyReviewAvailableProps {
  writtenReviews: WrittenReviewsResponse;
}

export default function MyReviewWritten({ writtenReviews }: MyReviewAvailableProps) {
  const router = useRouter();

  const alertModal = useAlert();
  const { showToast } = useToast();
  const { deleteReview } = useReviewMutations();

  const editReview = (reviewId: number) => {
    router.push(`review?editId=${reviewId}`);
  };

  const handleDelete = (itemId: number, reviewId: number) => {
    alertModal({
      message: '정말 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
      onConfirm: async () => {
        deleteReview.mutate(
          { itemId, reviewId },
          {
            onSuccess: () => {
              showToast('리뷰를 삭제했습니다.');
            },
            onError: () => {
              alertModal({ message: '삭제 중 오류가 발생했습니다. 다시 시도해주세요.' });
            },
          },
        );
      },
    });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-8.75">
        {writtenReviews.map((review, index) => (
          <div key={review.reviewResponse.reviewId} className="flex flex-col gap-5 px-5">
            <div className="flex flex-col items-center justify-center gap-6.5">
              <MyReviewProductCard
                url={review.orderItemSummary.itemThumbnail}
                artistName={review.orderItemSummary.artistName}
                title={review.orderItemSummary.itemName}
                itemCount={review.orderItemSummary.quantity}
                date={review.orderItemSummary.orderDate}
                itemId={review.orderItemSummary.itemId}
              />
              <MyReviewCard
                rating={review.reviewResponse.rating}
                content={review.reviewResponse.content}
                reviewImages={review.reviewResponse.reviewImages.map((img) => img.url)}
              />
            </div>
            <div className="text-grey-9 text-body-02 flex items-center gap-1.5 font-medium">
              <button
                onClick={() => editReview(review.reviewResponse.reviewId)}
                className="flex h-8.75 w-24.25 cursor-pointer items-center justify-center rounded-xs border"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(review.orderItemSummary.itemId, review.reviewResponse.reviewId)}
                className="flex h-8.75 w-24.25 cursor-pointer items-center justify-center rounded-xs border"
              >
                삭제
              </button>
            </div>
            {index !== writtenReviews.length - 1 && <div className="bg-green h-[1px] w-full" />}
          </div>
        ))}
      </div>
    </>
  );
}
