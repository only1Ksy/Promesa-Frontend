'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

interface DetailSwiperProps {
  images: string[];
  alt?: string;
}

export default function DetailSwiper({ images, alt = 'product image' }: DetailSwiperProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 이미지가 없는 경우 처리
  if (!images || images.length === 0) {
    return null;
  }

  // 이미지가 1개인 경우
  if (images.length === 1) {
    return (
      <div className="bg-green relative mb-5 aspect-square h-96 w-full">
        <Image src={images[0]} alt={alt} fill className="rounded-lg object-cover" />
      </div>
    );
  }

  // 실시간 스크롤 진행률 계산
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollLeft, scrollWidth, clientWidth } = target;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) return;

    // 진행률 계산 (0~1)
    const progress = scrollLeft / maxScroll;
    setScrollProgress(progress);
  };

  // 실시간 바 위치 계산
  const barPosition = scrollProgress * (120 - 120 / images.length); // 60px = 120px - 60px

  return (
    <div className="bg-green relative mb-5 aspect-square h-96 w-full">
      <div
        ref={containerRef}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
        onScroll={handleScroll}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0 snap-center">
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0} // 첫 번째 이미지 우선 로딩
            />
          </div>
        ))}
      </div>

      {/* 실시간 커스텀 인디케이터 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform">
        <div className="relative">
          {/* 배경 바 (큰 바) */}
          <div className="bg-grey-8 opacity-0.6 h-0.5 w-30 rounded-full" />
          {/* 실시간 움직이는 바 (작은 바) */}
          <div
            className={`bg-grey-1 absolute top-0 h-0.5 rounded-full transition-transform duration-100 ease-out`}
            style={{
              width: `${120 / images.length}px`, // 인디케이터 길이
              transform: `translateX(${barPosition}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
