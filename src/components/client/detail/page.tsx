'use client';

import Image from 'next/image';
import ProductInformation from '@/components/features/detail/product-information';
import DetailNavBar from '@/components/features/detail/detail-nav-bar';
import ProductDetail from '@/components/features/detail/product-detail';
import ProductNotice from '@/components/features/detail/product-notice';
import ReviewCard from '@/components/features/detail/review-card';
import Divider from '@/public/icons/item/divider.svg';

export default function ClientDetailPage() {
  return (
    <div>
      {/* 메인 이미지 */}
      <div className="bg-deep-green mb-5 flex h-96 w-full flex-col items-start justify-center gap-[10px]">
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
          <DetailNavBar />
          {/* 상품 정보 */}
          <div className="flex w-full flex-col items-start">
            <ProductDetail />
          </div>
          {/* 안내사항 */}
          <div className="mb-10 flex flex-col items-start gap-3 self-stretch px-5 py-10">
            <ProductNotice />
          </div>
          {/* 리뷰 */}
          <div className="flex flex-col items-center">
            {/* 리뷰 상단바 */}
            <div className="flex w-full items-end justify-between px-5">
              <div className="flex">
                <span>리뷰 (4) </span>
                <div>별점 3.2...</div>
              </div>
              <div>리뷰쓰기</div>
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
    </div>
  );
}
