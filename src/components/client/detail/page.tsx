'use client';

import { useEffect, useRef, useState } from 'react';
import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import ReviewImageOnly from '@/components/common/review/review-image-only';
import BottomFixedBarPortal from '@/components/common/utilities/bottom-fixed-bar-portal';
import BottomFixedBar from '@/components/features/detail/bottom-fixed-bar';
import DetailNavBar from '@/components/features/detail/detail-nav-bar';
import DetailSwiper from '@/components/features/detail/detail-swiper';
import ProductDetail from '@/components/features/detail/product-detail';
import ProductInformation from '@/components/features/detail/product-information';
import ProductNotice from '@/components/features/detail/product-notice';
import ReviewPreview from '@/components/features/detail/review-preview';
import DividerIcon from '@/public/icons/item/divider.svg';
import ReviewStarIcon from '@/public/icons/item/review-star.svg';
import { fetchItemDetail } from '@/services/api/item-controller';
import { fetchItemReviews } from '@/services/api/review-controller';

interface ClientDetailPageProps {
  itemId: number;
  itemDetailState: DehydratedState;
}

export default function ClientDetailPage({ itemId, itemDetailState }: ClientDetailPageProps) {
  const { data: item, isLoading } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res,
  });

  const { data: reviewResponse, isLoading: isReviewLoading } = useQuery({
    queryKey: ['reviewList', itemId],
    queryFn: () => fetchItemReviews(itemId),
    select: (res) => res.content,
  });

  // 라우터
  const router = useRouter();

  // 스크롤 이동을 위한 ref들
  const productRef = useRef<HTMLDivElement>(null);
  const noticeRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  // 현재 섹션 상태
  const [activeTab, setActiveTab] = useState<'product' | 'notice' | 'review'>('product');
  const [isScrolling, setIsScrolling] = useState(false);

  // 스크롤 핸들러
  const scrollTo = (section: 'product' | 'notice' | 'review') => {
    setIsScrolling(true);

    const target =
      section === 'product' ? productRef.current : section === 'notice' ? noticeRef.current : reviewRef.current;

    if (target) {
      const handleScrollEnd = () => {
        setActiveTab(section);
        setIsScrolling(false);
        window.removeEventListener('scrollend', handleScrollEnd);
      };

      // fallback: 일정 시간 뒤 스크롤 종료로 간주
      setTimeout(() => handleScrollEnd(), 700);

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // review page로 스크롤
  /* useEffect(() => {
    const shouldScrollToReview = sessionStorage.getItem('scrollToReview');
    console.log(shouldScrollToReview);
    if (shouldScrollToReview === 'true' && reviewRef.current) {
      setTimeout(() => {
        reviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTab('review');
      }, 200);
      sessionStorage.removeItem('scrollToReview');
    }
  }, []); */

  // IntersectionObserver 설정
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollY = window.scrollY + 200;
      const noticeTop = noticeRef.current?.offsetTop ?? 0;
      const reviewTop = reviewRef.current?.offsetTop ?? 0;

      if (scrollY >= reviewTop) {
        setActiveTab('review');
      } else if (scrollY >= noticeTop) {
        setActiveTab('notice');
      } else {
        setActiveTab('product');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  if (!item || isLoading || isReviewLoading || !reviewResponse) return null;

  // 이미지 배열 생성 (API 응답에 따라 추후 수정)
  const images = [
    // item.thumbnailUrl,
    '/src/item/image.url',
    '/src/item/image1.url',
  ].filter(Boolean);

  const openReviewModal = () => {
    router.push(`/detail/${itemId}/review?page=1`);
  };

  return (
    <HydrationBoundary state={itemDetailState}>
      <DetailSwiper images={images} alt="product detail image" />
      <div className="flex flex-col items-start gap-10 self-stretch pb-29.5">
        <ProductInformation onSelect={scrollTo} itemId={itemId} />
        <div className="w-full">
          <div className="sticky top-11.5 z-40">
            <DetailNavBar onSelect={scrollTo} active={activeTab} />
          </div>

          <div ref={productRef} className="scroll-mt-20">
            <ProductDetail itemId={itemId} />
          </div>

          <div ref={noticeRef} className="scroll-mt-20">
            <ProductNotice />
          </div>

          <div ref={reviewRef} className="mt-10 flex min-h-100 w-full scroll-mt-26 flex-col items-center">
            <div className="flex w-full items-end justify-between px-5">
              <div className="flex items-center gap-2">
                <span className="text-subhead font-medium text-black">리뷰 ({reviewResponse?.length ?? 0}) </span>
                <div className="flex items-center gap-1">
                  <ReviewStarIcon className="text-orange h-4 w-4" />
                  <div className="text-grey-6 text-body-02 font-medium">
                    {item.averageRating}({item.reviewCount})
                  </div>
                </div>
              </div>
              <div className="text-grey-6 text-caption-01 cursor-pointer font-medium">리뷰쓰기</div>
            </div>
            <div className="pt-2 pb-3">
              <DividerIcon />
            </div>
            <div className="flex w-full flex-col items-center gap-5">
              <ReviewImageOnly imageUrls={reviewResponse.flatMap((r) => r.reviewImages ?? [])} itemId={itemId} />
            </div>
            <div className="flex w-full flex-col items-center gap-5">
              <ReviewPreview reviews={reviewResponse ?? []} itemId={itemId} openReviewModal={openReviewModal} />
            </div>
          </div>
        </div>
      </div>

      <BottomFixedBarPortal>
        <BottomFixedBar itemId={itemId} wished={item.isWishlisted} />
      </BottomFixedBarPortal>
    </HydrationBoundary>
  );
}
