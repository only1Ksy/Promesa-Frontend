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

export default function ClientDetailPage() {
  return (
    <div>
      {/* 메인 이미지 */}
      <div className="bg-green mb-5 flex h-96 w-full flex-col items-start justify-center gap-[10px]">
        <Image alt="product detail imageß" src={''} />
      </div>
      <div className="flex flex-col items-start gap-10 self-stretch pb-29.5">
        {/* 상단 상품 정보 */}
        <div className="flex h-109.5 w-full flex-col items-start gap-5">
          <ProductInformation />
        </div>
        {/* 하단 상세 페이지 */}
        <div className="w-full">
          {/* 이동 바 */}
          <div className="sticky top-[46px] z-40">
            <DetailNavBar />
          </div>
          {/* 상품 정보 */}
          <div className="flex w-full flex-col items-start">
            <ProductDetail />
          </div>
          {/* 안내사항 */}
          <div className="text-grey-6 text-caption-01 mb-10 flex flex-col items-start gap-3 self-stretch px-5 py-10 font-medium">
            <ProductNotice />
          </div>
          {/* 리뷰 */}
          <div className="flex flex-col items-center">
            {/* 리뷰 상단바 */}
            <div className="flex w-full items-end justify-between px-5">
              <div className="flex items-center gap-2">
                <span className="text-subhead font-medium text-black">리뷰 (4) </span>
                <div className="flex items-center gap-1">
                  <ReviewStar />
                  <div className="text-grey-6 text-body-02 font-medium">3.2...</div>
                </div>
              </div>
              <div className="text-grey-6 text-caption-01 font-medium">리뷰쓰기</div>
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
      <div className="border-green bg-pale-green fixed bottom-0 left-1/2 z-50 flex w-[402px] -translate-x-1/2 items-center justify-between self-stretch border-t px-5 py-3 shadow-md">
        <BottomFixedBar />
      </div>
    </div>
  );
}
