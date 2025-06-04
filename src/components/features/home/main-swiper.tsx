'use client';

import 'swiper/css';

import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const items = ['item 0', 'item 1', 'item 2', 'item 3', 'item 4'];

export default function MainSwiper() {
  const [active, setActive] = useState(0);

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
          <SwiperSlide key={`main-swiper-${idx}`} className={`!h-60 !w-60`}>
            <div
              className={`bg-green text-headline-01 flex w-full items-center justify-center ${isActive ? 'h-60' : 'my-10.75 h-38.5 opacity-50'}`}
            >
              {item}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
