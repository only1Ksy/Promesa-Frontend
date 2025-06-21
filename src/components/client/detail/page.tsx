'use client';

import Image from 'next/image';
import ProductInformation from '@/components/features/detail/product-information';
import DetailNavBar from '@/components/features/detail/detail-nav-bar';
import ProductDetail from '@/components/features/detail/product-detail';
import ProductNotice from '@/components/features/detail/product-notice';
import ReviewCard from '@/components/features/detail/review-card';
import BottomFixedBar from '@/components/features/detail/bottom-fixed-bar';
import Divider from '@/public/icons/item/divider.svg';
import ReviewStar from '@/public/icons/item/review-star.svg';
import type { Item } from '@/types/item.dto';
import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { fetchItemDetail } from '@/services/api/item';
import { useQuery } from '@tanstack/react-query';
import { useRef, useEffect, useState } from 'react';

interface ClientDetailPageProps {
  itemId: Item['itemId'];
  itemDetailState: DehydratedState;
}

export default function ClientDetailPage({ itemId, itemDetailState }: ClientDetailPageProps) {
  const { data: item } = useQuery({
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

  // 스크롤 핸들러
  const scrollTo = (section: 'product' | 'notice' | 'review') => {
    const target =
      section === 'product' ? productRef.current : section === 'notice' ? noticeRef.current : reviewRef.current;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(section);
    }
  };

  // 현재 보이는 섹션 감지 (IntersectionObserver)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-100px 0px -70% 0px', // 상단에 닿으면 바로 active 되지 않도록 조정
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as 'product' | 'notice' | 'review';
          setActiveTab(id);
        }
      });
    }, options);

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
      if (product) observer.unobserve(product);
      if (notice) observer.unobserve(notice);
      if (review) observer.unobserve(review);
    };
  }, []);

  if (!item) return null;

  return (
    <HydrationBoundary state={itemDetailState}>
      {/* 메인 이미지 */}
      <div className="bg-green mb-5 flex h-96 w-full flex-col items-start justify-center gap-[10px]">
        <Image alt="product detail imageß" src={item.thumbnailUrl} />
      </div>
      <div className="flex flex-col items-start gap-10 self-stretch pb-29.5">
        {/* 상단 상품 정보 */}
        <div className="flex h-109.5 w-full flex-col items-start gap-5">
          <ProductInformation onSelect={scrollTo} itemId={itemId} />
        </div>
        {/* 하단 상세 페이지 */}
        <div className="w-full">
          {/* 이동 바 */}
          <div className="sticky top-[46px] z-40">
            {/* scrollTo 함수 및 activeTab 전달 */}
            <DetailNavBar onSelect={scrollTo} active={activeTab} />
          </div>
          {/* 상품 정보 */}
          <div ref={productRef} className="flex w-full flex-col items-start">
            <ProductDetail itemId={itemId} />
          </div>
          {/* 안내사항 */}
          <div
            ref={noticeRef}
            className="text-grey-6 text-caption-01 mb-10 flex flex-col items-start gap-3 self-stretch px-5 py-10 font-medium"
          >
            <ProductNotice />
          </div>
          {/* 리뷰 */}
          <div ref={reviewRef} className="flex flex-col items-center">
            {/* 리뷰 상단바 */}
            <div className="flex w-full items-end justify-between px-5">
              <div className="flex items-center gap-2">
                <span className="text-subhead font-medium text-black">리뷰 (4) </span>
                <div className="flex items-center gap-1">
                  <ReviewStar className="h-4 w-4" />
                  <div className="text-grey-6 text-body-02 font-medium">4 (1)</div>
                </div>
              </div>
              <div className="text-grey-6 text-caption-01 cursor-pointer font-medium">리뷰쓰기</div>
            </div>
            <div className="pt-2 pb-3">
              <Divider />
            </div>
            {/* 리뷰 나열 */}
            <div className="flex w-full flex-col items-center gap-5">
              <ReviewCard />
            </div>
          </div>
        </div>
      </div>
      {/* 하단 고정 바 */}
      <div className="border-green bg-pale-green fixed bottom-0 left-1/2 flex w-[402px] -translate-x-1/2 items-center justify-between self-stretch border-t px-5 py-3 shadow-md">
        <BottomFixedBar itemId={itemId} />
      </div>
    </HydrationBoundary>
  );
}
