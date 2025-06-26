'use client';

import { useEffect, useRef, useState } from 'react';
import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import BottomFixedBar from '@/components/features/detail/bottom-fixed-bar';
import BottomFixedBarPortal from '@/components/features/detail/bottom-fixed-bar-portal';
import DetailNavBar from '@/components/features/detail/detail-nav-bar';
import ProductDetail from '@/components/features/detail/product-detail';
import ProductInformation from '@/components/features/detail/product-information';
import ProductNotice from '@/components/features/detail/product-notice';
import ReviewCard from '@/components/features/detail/review-card';
import DividerIcon from '@/public/icons/item/divider.svg';
import ReviewStarIcon from '@/public/icons/item/review-star.svg';
import { fetchItemDetail } from '@/services/api/item';
import type { Item } from '@/types/item.dto';

interface ClientDetailPageProps {
  itemId: Item['itemId'];
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
  const [isScrolling, setIsScrolling] = useState(false); // 프로그래매틱 스크롤 상태

  // 스크롤 핸들러
  const scrollTo = (section: 'product' | 'notice' | 'review') => {
    setIsScrolling(true); // 수동 스크롤 설정
    setActiveTab(section); // 즉시 탭 변경

    const target =
      section === 'product' ? productRef.current : section === 'notice' ? noticeRef.current : reviewRef.current;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 스크롤 상태 해제
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  // 현재 보이는 섹션 감지
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px -50% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      // 프로그래매틱 스크롤 중에는 observer 무시
      if (isScrolling) return;

      // 가장 많이 보이는 섹션 찾기
      let maxIntersectionRatio = 0;
      let mostVisibleSection: 'product' | 'notice' | 'review' | null = null;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id as 'product' | 'notice' | 'review';
        }
      });

      if (mostVisibleSection) {
        setActiveTab(mostVisibleSection);
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
  }, [isScrolling]); // isScrolling 의존성

  if (!item) return null;
  if (isLoading) return null;

  return (
    <HydrationBoundary state={itemDetailState}>
      {/* 메인 이미지 */}
      <div className="bg-green mb-5 flex h-96 w-full flex-col items-start justify-center gap-2.5">
        <Image alt="product detail image" src={item.thumbnailUrl} />
      </div>
      <div className="flex flex-col items-start gap-10 self-stretch pb-29.5">
        {/* 상단 상품 정보 */}
        <div className="flex w-full flex-col items-start gap-5">
          <ProductInformation onSelect={scrollTo} itemId={itemId} />
        </div>
        {/* 하단 상세 페이지 */}
        <div className="w-full">
          {/* 이동 바 */}
          <div className="sticky top-11.5 z-40">
            <DetailNavBar onSelect={scrollTo} active={activeTab} />
          </div>
          {/* 상품 정보 */}
          <div ref={productRef} className="flex min-h-100 w-full scroll-mt-24 flex-col items-start">
            <ProductDetail itemId={itemId} />
          </div>
          {/* 안내사항 */}
          <div
            ref={noticeRef}
            className="text-grey-6 text-caption-01 mb-10 flex min-h-100 scroll-mt-24 flex-col items-start gap-3 self-stretch px-5 py-10 font-medium"
          >
            <ProductNotice />
          </div>
          {/* 리뷰 */}
          <div ref={reviewRef} className="flex min-h-100 scroll-mt-26 flex-col items-center">
            {/* 리뷰 상단바 */}
            <div className="flex w-full items-end justify-between px-5">
              <div className="flex items-center gap-2">
                <span className="text-subhead font-medium text-black">리뷰 (4) </span>
                <div className="flex items-center gap-1">
                  <ReviewStarIcon className="h-4 w-4" />
                  <div className="text-grey-6 text-body-02 font-medium">4 (1)</div>
                </div>
              </div>
              <div className="text-grey-6 text-caption-01 cursor-pointer font-medium">리뷰쓰기</div>
            </div>
            <div className="pt-2 pb-3">
              <DividerIcon />
            </div>
            {/* 리뷰 나열 */}
            <div className="flex w-full flex-col items-center gap-5">
              <ReviewCard />
            </div>
          </div>
        </div>
      </div>
      {/* 하단 고정 바 */}
      <BottomFixedBarPortal>
        <BottomFixedBar itemId={itemId} />
      </BottomFixedBarPortal>
    </HydrationBoundary>
  );
}
