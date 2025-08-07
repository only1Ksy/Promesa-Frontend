'use client';

import 'swiper/css';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import { fetchExhibitions } from '@/services/api/exhibition-controller';

export default function HomeExhibitionsBackground() {
  const { data } = useSuspenseQuery({
    queryKey: ['exhibitionList', 'ONGOING'],
    queryFn: () => fetchExhibitions('ONGOING'),
  });

  const [active, setActive] = useState(0);

  const imageUrls = data.map((item) => item.summary.thumbnailImageUrl);

  return (
    <div className="relative h-114 w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={(s) => requestAnimationFrame(() => setActive(s.realIndex))}
        onSwiper={(s) => setActive(s.realIndex)}
        className="h-full"
      >
        {imageUrls.map((url, idx) => (
          <SwiperSlide key={idx}>
            <ImageWithLoading
              src={url}
              alt={`프로메사 전시회 홈 페이지의 ${idx + 1}번째 배경 이미지`}
              fill
              priority
              className="object-cover"
            />
            <div className="pointer-events-none absolute bottom-0 left-0 z-5 h-3/10 w-full bg-gradient-to-b from-[#000000]/0 to-[#000000]/70" />
            <div className="absolute bottom-10 left-0 z-10 mr-15 ml-10 flex h-full flex-col justify-end">
              <p className="text-headline-03 text-grey-1">{data[idx].summary.title}</p>
              <p className="text-body-01 text-grey-4 font-medium">{data[idx].summary.subTitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {imageUrls.length > 1 && (
        <div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col justify-between">
          <div className="mt-5 ml-10">
            <p className="text-body-02 font-medium text-white">
              {active + 1} / {imageUrls.length}
            </p>
          </div>
          <div className="relative mb-7 flex justify-center">
            <hr className="absolute top-0 w-50 rounded-full border-t-3 border-t-white/30" />
            <hr
              className="absolute top-0 rounded-full border-t-3 border-t-white/80 transition-transform duration-300"
              style={{
                width: `calc(var(--spacing) * ${50 / imageUrls.length})`,
                translate: `calc(var(--spacing) * ${(50 * active + 25) / imageUrls.length - 25}) var(--tw-translate-y)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
