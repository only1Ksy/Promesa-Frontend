'use client';

import type { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import BrandStory from '@/components/features/home/brand-story';
import ExhibitionSwiper from '@/components/features/home/exhibition-swiper';
import HomeBackground from '@/components/features/home/home-background';
import MainSwiperSkeleton from '@/components/features/home/main-swiper-skeleton';
import ShopSwiper from '@/components/features/home/shop-swiper';

interface ClientHomePageProps {
  dehydratedState: DehydratedState;
}

export default function ClientHomePage({ dehydratedState }: ClientHomePageProps) {
  const MainSwiper = dynamic(() => import('@/components/features/home/main-swiper'), {
    ssr: false,
    loading: () => <MainSwiperSkeleton />,
  });

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
          <ExhibitionSwiper title="PROMESA 기획전" />

          {/* 인기순 정렬 */}
          <ShopSwiper />
        </div>
      </div>
    </HydrationBoundary>
  );
}
