'use client';

import { useEffect, useRef, useState } from 'react';
import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import ReviewImageOnly from '@/components/common/review/review-image-only';
import BottomFixedBar from '@/components/features/detail/bottom-fixed-bar';
import BottomFixedBarPortal from '@/components/features/detail/bottom-fixed-bar-portal';
import DetailNavBar from '@/components/features/detail/detail-nav-bar';
import DetailSwiper from '@/components/features/detail/detail-swiper';
import ProductDetail from '@/components/features/detail/product-detail';
import ProductInformation from '@/components/features/detail/product-information';
import ProductNotice from '@/components/features/detail/product-notice';
import ReviewPreview from '@/components/features/detail/review-preview';
import { REVIEW_LIST } from '@/lib/constants/temp-review-list';
import DividerIcon from '@/public/icons/item/divider.svg';
import ReviewStarIcon from '@/public/icons/item/review-star.svg';
import { fetchItemDetail } from '@/services/api/item';

interface ClientDetailPageProps {
  itemId: number;
  itemDetailState: DehydratedState;
}

export default function ClientDetailPage({ itemId, itemDetailState }: ClientDetailPageProps) {
  const { data: item, isLoading } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res.data,
  });

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
    setActiveTab(section);

    const target =
      section === 'product' ? productRef.current : section === 'notice' ? noticeRef.current : reviewRef.current;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  // IntersectionObserver 설정
  useEffect(() => {
    // 지연 후 observer 시작
    const timer = setTimeout(() => {
      const options = {
        root: null,
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        if (isScrolling) return;

        // 현재 뷰포트에서 가장 많이 보이는 섹션만 선택
        const bestEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (bestEntry) {
          const newActiveTab = bestEntry.target.id as 'product' | 'notice' | 'review';
          setActiveTab(newActiveTab);
        }
      }, options);

      // ref에 id 설정 및 observer 등록
      const product = productRef.current;
      const notice = noticeRef.current;
      const review = reviewRef.current;

      if (product) {
        product.setAttribute('id', 'product');
        observer.observe(product);
      }
      if (notice) {
        notice.setAttribute('id', 'notice');
        observer.observe(notice);
      }
      if (review) {
        review.setAttribute('id', 'review');
        observer.observe(review);
      }

      return () => {
        observer.disconnect();
      };
    }, 200); // 200ms 지연

    return () => clearTimeout(timer);
  }, [isScrolling]);

  if (!item || isLoading) return null;

  // 이미지 배열 생성 (API 응답에 따라 추후 수정)
  const images = [
    // item.thumbnailUrl,
    '/src/item/image.url',
    '/src/item/image1.url',
  ].filter(Boolean);

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

          <div ref={reviewRef} className="flex min-h-100 scroll-mt-26 flex-col items-center">
            <div className="flex w-full items-end justify-between px-5">
              <div className="flex items-center gap-2">
                <span className="text-subhead font-medium text-black">리뷰 (4) </span>
                <div className="flex items-center gap-1">
                  <ReviewStarIcon className="text-orange h-4 w-4" />
                  <div className="text-grey-6 text-body-02 font-medium">4 (1)</div>
                </div>
              </div>
              <div className="text-grey-6 text-caption-01 cursor-pointer font-medium">리뷰쓰기</div>
            </div>
            <div className="pt-2 pb-3">
              <DividerIcon />
            </div>
            <div className="flex w-full flex-col items-center gap-5">
              <ReviewImageOnly
                imageUrls={[
                  '/images/review1.jpg',
                  '/images/review2.jpg',
                  '/images/review3.jpg',
                  '/images/review4.jpg',
                  '/images/review5.jpg',
                ]}
                itemId={itemId}
              />
            </div>
            <div className="flex w-full flex-col items-center gap-5">
              <ReviewPreview reviews={REVIEW_LIST} itemId={itemId} />
            </div>
          </div>
        </div>
      </div>

      <BottomFixedBarPortal>
        <BottomFixedBar itemId={itemId} />
      </BottomFixedBarPortal>
    </HydrationBoundary>
  );
}
