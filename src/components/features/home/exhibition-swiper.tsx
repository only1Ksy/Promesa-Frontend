'use client';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useExhibitionsQuery } from '@/hooks/query/use-exhibitions-query';

export default function ExhibitionSwiper() {
  const { data: items = [], isLoading } = useExhibitionsQuery();

  if (isLoading) {
    return (
      <div className="flex w-full gap-2">
        <div className="bg-green h-77 w-68" />
        <div className="bg-green h-77 w-25.5" />
      </div>
    );
  }

  return (
    <Swiper slidesPerView="auto" spaceBetween={8}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <SwiperSlide key={`exhibition-swiper-${idx}`} className={`!w-68 ${isLast ? 'mr-5' : ''}`}>
            <div className="bg-green relative flex h-77 w-full items-end overflow-hidden p-7">
              <div className="pointer-events-none absolute top-7/10 left-0 z-0 h-3/10 w-full bg-gradient-to-b from-black/0 to-black" />
              <div className="z-10">
                <p className="text-subhead text-grey-1 font-bold">{item.exhibitionTitle}</p>
                <p className="text-caption-01 text-grey-2 font-medium">{item.exhibitionDescription}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
