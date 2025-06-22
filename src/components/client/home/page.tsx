'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import Link from 'next/link';

import BrandStory from '@/components/features/home/brand-story';
import ExhibitionSwiper from '@/components/features/home/exhibition-swiper';
import MainSwiper from '@/components/features/home/main-swiper';
import ShopSwiper from '@/components/features/home/shop-swiper';
import LinkIcon from '@/public/icons/common/link.svg';
import PromesaMainSymbolIcon from '@/public/icons/logo/main-symbol.svg';
import PromesaTextLargeIcon from '@/public/icons/logo/text-lg.svg';

interface ClientHomePageProps {
  dehydratedState: DehydratedState;
}

export default function ClientHomePage({ dehydratedState }: ClientHomePageProps) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        {/* 상단 배너 */}
        <div
          id="no-z-index"
          className="fixed-component top-11.5 flex h-112.5 flex-col items-center justify-center gap-15 bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/images/home-background.png')" }}
        >
          <div className="flex flex-col gap-3">
            <PromesaMainSymbolIcon className="text-grey-1" />
            <PromesaTextLargeIcon className="text-grey-1" />
          </div>
          <Link href="/shop">
            <div className="text-body-02 font-regular text-grey-1 border-grey-1 hover:bg-grey-1 hover:text-grey-6 flex h-8 w-35 items-center justify-center rounded-[10rem] border-[1.2px] backdrop-blur-[2.35px] transition duration-200">
              <p>둘러보기</p>
            </div>
          </Link>
        </div>

        <div className="bg-pale-green relative z-5 mt-112.5 flex flex-col">
          {/* 브랜드 정보 */}
          <MainSwiper />

          {/* 소개 */}
          <BrandStory />

          {/* 기획전 */}
          <div className="mb-20 flex flex-col gap-3">
            <div className="mx-5 flex items-center justify-between">
              <p className="text-subhead font-medium text-black">PROMESA 기획전</p>
              <Link href="/exhibitions">
                <div className="flex items-center gap-2">
                  <p className="text-caption-01 text-grey-6 font-medium">목록 보기</p>
                  <LinkIcon className="text-grey-6" />
                </div>
              </Link>
            </div>
            <ExhibitionSwiper />
          </div>

          {/* 인기순 정렬 */}
          <div className="mb-14 flex flex-col gap-3">
            <div className="mx-5 flex items-center justify-between">
              <p className="text-subhead font-medium text-black">Now Popular</p>
              <Link href="/shop?sort=wishCount,DESC">
                <div className="flex items-center gap-2">
                  <p className="text-caption-01 text-grey-6 font-medium">목록 보기</p>
                  <LinkIcon className="text-grey-6" />
                </div>
              </Link>
            </div>
            <ShopSwiper />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
