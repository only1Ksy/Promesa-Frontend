'use client';

import 'swiper/css';

import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const items = ['item 0', 'item 1', 'item 2', 'item 3', 'item 4'];

export default function MainSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView="auto"
      centeredSlides
      loop
      spaceBetween={60}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
      className="h-60"
    >
      {items.map((item, idx) => {
        const isActive = idx === activeIndex;
        const sizeClass = isActive ? 'w-60 h-60' : 'w-38.5 h-38.5 opacity-50';

        return (
          <SwiperSlide key={`main-swiper-${idx}`} className="flex !w-60 items-center justify-center">
            <div
              className={`text-headline-01 bg-green flex items-center justify-center transition-all duration-300 ease-out ${sizeClass}`}
            >
              {item}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
