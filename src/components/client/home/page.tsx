'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import BrandStory from '@/components/features/home/brand-story';
import ExhibitionSwiper from '@/components/features/home/exhibition-swiper';
import HomeBackground from '@/components/features/home/home-background';
import ShopSwiper from '@/components/features/home/shop-swiper';
import LinkIcon from '@/public/icons/common/link.svg';

interface ClientHomePageProps {
  dehydratedState: DehydratedState;
}

export default function ClientHomePage({ dehydratedState }: ClientHomePageProps) {
  const MainSwiper = dynamic(() => import('@/components/features/home/main-swiper'), { ssr: false });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex flex-col">
        {/* 상단 배너 */}
        <HomeBackground />

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
              <Link href="/shop?sort=wishCount,desc">
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
