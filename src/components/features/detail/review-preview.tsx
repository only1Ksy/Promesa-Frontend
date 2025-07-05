import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ReviewCard from '@/components/common/review/review-card';
import { fetchItemDetail } from '@/services/api/item';
import { Review } from '@/types/review.dto';

interface ReviewPreviewProps {
  reviews: Review[];
  itemId: number;
}

export default function ReviewPreview({ reviews, itemId }: ReviewPreviewProps) {
  const router = useRouter();

  const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res.data,
  });

  if (!item) return null;

  const visibleReviews = reviews.slice(0, 2);

  const showAll = () => {
    sessionStorage.setItem('scrollToReview', 'true');
    sessionStorage.setItem('prevPath', window.location.pathname);

    const target = document.body;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        router.push(`/review/${itemId}`);
      }, 400);
    } else {
      router.push(`/review/${itemId}`);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="mb-10 flex w-full flex-col gap-5">
        {visibleReviews.map((review, i) => (
          <div key={i} className="flex w-full flex-col items-center gap-5">
            <ReviewCard {...review} />
            {i !== visibleReviews.length - 1 && <div className="border-deep-green h-0 w-90.5 border-b" />}
          </div>
        ))}
      </div>

      <button
        onClick={showAll}
        className="border-grey-9 text-body-02 text-grey-9 flex h-11 w-80.5 cursor-pointer items-center justify-center border font-bold"
      >
        전체 리뷰 보기
      </button>

      {/* 그라데이션 덮개 */}
      <div
        className="pointer-events-none absolute bottom-15 left-0 z-10 h-13.5 w-full"
        style={{
          background: 'linear-gradient(180deg, rgba(238, 239, 233, 0.00) -50%, #EEEFE9 100%)',
        }}
      />
    </div>
  );
}
