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
          const isLeft = idx === (active - 1 + imageUrls.length) % imageUrls.length;
          const isRight = idx === (active + 1) % imageUrls.length;

          return (
            <SwiperSlide key={idx} className="!w-60">
              <div className="flex h-60 w-full items-center justify-center">
                <div
                  className={clsx(
                    'bg-green relative h-60 w-60 transition-transform duration-600 ease-out will-change-transform',
                    isActive && 'scale-100 opacity-100',
                    isLeft && !isActive && 'origin-right scale-65 opacity-50',
                    isRight && !isActive && 'origin-left scale-65 opacity-50',
                  )}
                >
                  <ImageWithLoading
                    src={url}
                    alt={`프로메사 홈 페이지의 ${Math.floor(idx / 3) + 1}번째 메인 이미지.`}
                    fill
                    priority
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
