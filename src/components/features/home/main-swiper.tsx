'use client';

import 'swiper/css';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import { fetchBrandInfo } from '@/services/api/home-controller';

export default function MainSwiper() {
  const [active, setActive] = useState(1);

  const { data } = useSuspenseQuery({
    queryKey: ['brandInfo'],
    queryFn: fetchBrandInfo,
  });

  const { leftImageUrl, mainImageUrl, rightImageUrl } = data;

  const baseImageUrls = [leftImageUrl, mainImageUrl, rightImageUrl]; // start from index 1
  const imageUrls = [...baseImageUrls, ...baseImageUrls];

  return (
    <div className="my-12.5">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        centeredSlides
        loop
        spaceBetween={60}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={(s) => setActive(s.realIndex)}
        onSwiper={(s) => setActive(s.realIndex)}
      >
        {imageUrls.map((url, idx) => {
          const isActive = idx === active;

          return (
            <SwiperSlide key={idx} className="!w-60">
              <div
                className={clsx(
                  'bg-green text-headline-01 relative flex h-60 w-full items-center justify-center',
                  'transform transition-all duration-500 will-change-transform',
                  isActive ? 'scale-100 opacity-100' : 'scale-y-65 opacity-50',
                )}
              >
                <ImageWithLoading src={url} alt={`프로메사 홈 페이지의 ${idx}번째 메인 이미지.`} fill priority />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
