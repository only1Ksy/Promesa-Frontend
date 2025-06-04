'use client';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import ProductPreview from '@/components/common/product-preview';

const items = [
  {
    artist: '아티스트',
    product: {
      name: '반짝반짝 도자기',
      sale: '30%',
      price: '28,000원',
    },
  },
  {
    artist: '아티스트',
    product: {
      name: '반짝반짝 도자기',
      sale: '30%',
      price: '28,000원',
    },
  },
  {
    artist: '아티스트',
    product: {
      name: '반짝반짝 도자기',
      sale: '30%',
      price: '28,000원',
    },
  },
  {
    artist: '아티스트',
    product: {
      name: '반짝반짝 도자기',
      sale: '30%',
      price: '28,000원',
    },
  },
  {
    artist: '아티스트',
    product: {
      name: '반짝반짝 도자기',
      sale: '30%',
      price: '28,000원',
    },
  },
];

export default function ShopSwiper() {
  return (
    <Swiper slidesPerView="auto" spaceBetween={10} centeredSlides={false}>
      {items.map((item, idx) => (
        <SwiperSlide key={`shop-swiper-${idx}`} className="flex !w-44 items-center justify-center">
          <ProductPreview
            artist={item['artist']}
            name={item['product']['name']}
            sale={item['product']['sale']}
            price={item['product']['price']}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
