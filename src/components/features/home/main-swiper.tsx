'use client';

import 'swiper/css';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { fetchThumbnailItems } from '@/services/api/items';

export default function MainSwiper() {
  const [active, setActive] = useState(0);
  const { data: items, isLoading } = useQuery({
    queryKey: ['thumbnailItems'],
    queryFn: fetchThumbnailItems,
    select: (res) => res.data,
  });

  if (!items) notFound();

  if (isLoading) {
    return (
      <div className="my-12.5 flex w-full gap-15">
        <div className="bg-green my-10.75 h-38.5 w-5.25" />
        <div className="bg-green h-60 w-60" />
        <div className="bg-green my-10.75 h-38.5 w-5.25" />
      </div>
    );
  }

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
    </div>
  );
}
