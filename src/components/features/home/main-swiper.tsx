'use client';

import 'swiper/css';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fetchBrandInfo } from '@/services/api/home-controller';

export default function MainSwiper() {
  const [active, setActive] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['brandInfo'],
    queryFn: fetchBrandInfo,
  });

  if (!data) return null;

  if (isLoading) {
    return (
      <div className="my-12.5 flex w-full gap-15">
        <div className="bg-green my-10.75 h-38.5 w-5.25" />
        <div className="bg-green h-60 w-60" />
        <div className="bg-green my-10.75 h-38.5 w-5.25" />
      </div>
    );
  }

  const baseImageUrls = [data.leftImageUrl, data.mainImageUrl, data.rightImageUrl];
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
                  'transform transition-all duration-500 ease-in-out will-change-transform',
                  isActive ? 'scale-100 opacity-100' : 'scale-y-65 opacity-50',
                )}
              >
                <Image src={url} alt={`brand main image ${idx}`} fill priority />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
