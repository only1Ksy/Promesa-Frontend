'use client';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import ItemPreviewGrid from '@/components/item/preview-grid';
import { useNowPopularItemsQuery } from '@/hooks/query/use-now-popular-items-query';

export default function ShopSwiper() {
  const { data: items = [], isLoading } = useNowPopularItemsQuery();

  if (isLoading) {
    return (
      <div className="flex w-full gap-2.5">
        <div className="bg-green mb-26 h-55 w-44" />
        <div className="bg-green mb-26 h-55 w-44" />
        <div className="bg-green mb-26 h-55 w-5" />
      </div>
    );
  }

  return (
    <Swiper slidesPerView="auto" spaceBetween={10}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <SwiperSlide key={`shop-swiper-${idx}`} className={`!w-44 ${isLast ? 'mr-5' : ''}`}>
            <ItemPreviewGrid
              itemId={item.itemId}
              itemName={item.itemName}
              artistName={item.artistName}
              price={item.price}
              sale={item.sale}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
