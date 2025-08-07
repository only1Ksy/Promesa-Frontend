'use client';

import dynamic from 'next/dynamic';

import BrandStory from '@/components/features/home/brand-story';
import ExhibitionSwiper from '@/components/features/home/exhibition-swiper';
import HomeBackground from '@/components/features/home/home-background';
import MainSwiperSkeleton from '@/components/features/home/main-swiper-skeleton';
import ShopSwiper from '@/components/features/home/shop-swiper';

export default function ClientHomePage() {
  const MainSwiper = dynamic(() => import('@/components/features/home/main-swiper'), {
    ssr: false,
    loading: () => <MainSwiperSkeleton />,
  });

  return (
    <div className="flex flex-col">
      {/* 상단 배너 */}
      <HomeBackground />

      <div className="bg-pale-green relative z-5 mt-114 flex flex-col">
        {/* 브랜드 정보 */}
        <MainSwiper />

        {/* 소개 */}
        <BrandStory />

        {/* 기획전 */}
        <ExhibitionSwiper title="PROMESA 기획전" page="HOME" />

        {/* 인기순 정렬 */}
        <ShopSwiper />
      </div>
    </div>
  );
}
