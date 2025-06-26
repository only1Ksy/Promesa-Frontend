'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useState } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface DetailSwiperProps {
  images: string[];
  alt?: string;
}

export default function DetailSwiper({ images, alt = 'product image' }: DetailSwiperProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 이미지가 없는 경우 처리
  if (!images || images.length === 0) {
    return null;
  }

  // 이미지가 1개인 경우
  if (images.length === 1) {
    return (
      <div className="bg-green mb-5 flex h-96 w-full flex-col items-start justify-center gap-2.5">
        <div className="relative h-full w-full">
          <Image src={images[0]} alt={alt} fill className="object-cover" priority />
        </div>
      </div>
    );
  }

  // 슬라이드 변경 핸들러
  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex);
  };

  // 작은 바의 위치 계산 (전체 바 기준으로 비율 계산)
  const smallBarPosition = (currentSlide / (images.length - 1)) * 60; // 60px = 120px - 60px

  return (
    <>
      <div className="bg-green relative mb-5 flex h-96 w-full flex-col items-start justify-center gap-2.5">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={false} // loop 비활성화
          onSlideChange={handleSlideChange}
          className="detail-swiper h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image}-${index}`}>
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={`${alt} ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 커스텀 인디케이터 */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 transform">
          <div className="relative">
            {/* 배경 바 (큰 바) */}
            <div
              style={{
                width: '120px',
                height: '2px',
                backgroundColor: '#313131',
                opacity: 0.6,
                borderRadius: '1px',
              }}
            />
            {/* 움직이는 바 (작은 바) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: `${smallBarPosition}px`,
                width: `${120 / images.length}px`,
                height: '2px',
                backgroundColor: '#F2F2F2',
                borderRadius: '1px',
                transition: 'left 0.3s ease-out',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .detail-swiper {
          position: relative;
        }
      `}</style>
    </>
  );
}
