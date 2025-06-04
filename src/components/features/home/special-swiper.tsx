'use client';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

const items = [
  { title: '작가 영은의 작업실에서', content: '핸드메이드 도자기 탐방' },
  { title: '작가 영은의 작업실에서', content: '핸드메이드 도자기 탐방' },
  { title: '작가 영은의 작업실에서', content: '핸드메이드 도자기 탐방' },
  { title: '작가 영은의 작업실에서', content: '핸드메이드 도자기 탐방' },
  { title: '작가 영은의 작업실에서', content: '핸드메이드 도자기 탐방' },
];

export default function SpecialSwiper() {
  return (
    <Swiper slidesPerView="auto" spaceBetween={8} centeredSlides={false}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <SwiperSlide key={`special-swiper-${idx}`} className={`!w-68 ${isLast ? 'pr-5' : ''}`}>
            <div className="bg-green relative flex h-77 w-full items-end overflow-hidden p-7">
              <div className="pointer-events-none absolute top-7/10 left-0 z-0 h-3/10 w-full bg-gradient-to-b from-black/0 to-black" />
              <div className="z-10">
                <p className="text-subhead text-grey-100 font-bold">{item['title']}</p>
                <p className="text-caption-01 text-grey-200 font-medium">{item['content']}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
