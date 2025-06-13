'use client';

import 'swiper/css';

import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useThumbnailItemsQuery } from '@/hooks/query/use-thumbnail-items-query';

export default function MainSwiper() {
  const [active, setActive] = useState(0);
  const { data: items = [], isLoading } = useThumbnailItemsQuery();

  if (isLoading) {
    return (
      <div className="flex w-full gap-15">
        <div className="bg-green my-10.75 h-38.5 w-5.25" />
        <div className="bg-green h-60 w-60" />
        <div className="bg-green my-10.75 h-38.5 w-5.25" />
      </div>
    );
  }

  return (
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
      {items.map((item, idx) => {
        const isActive = idx === active;

        return (
          <SwiperSlide key={`main-swiper-${idx}`} className="!w-60">
            <div
              className={`bg-green text-headline-01 flex w-full items-center justify-center ${isActive ? 'h-60' : 'my-10.75 h-38.5 opacity-50'}`}
            >
              {item.itemName}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
