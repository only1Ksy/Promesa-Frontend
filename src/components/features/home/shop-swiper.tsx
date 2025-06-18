'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import ItemPreviewGrid from '@/components/common/item/item-preview-grid';
import { fetchNowPopularItems } from '@/services/api/items';

export default function ShopSwiper() {
  const { data: items, isLoading } = useQuery({
    queryKey: ['nowPopularItems'],
    queryFn: fetchNowPopularItems,
    select: (res) => res.data,
  });

  if (!items) notFound();

  if (isLoading) {
    return (
      <div className="ml-5 flex w-full gap-2.5">
        <div className="bg-green mb-26 h-55 w-44" />
        <div className="bg-green mb-26 h-55 w-44" />
        <div className="bg-green mb-26 h-55 w-5" />
      </div>
    );
  }

  return (
    <div className="hide-scrollbar scroll-x-area ml-5 flex gap-2.5">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <div key={`shop-swiper-${idx}`} className={`w-44 flex-none ${isLast ? 'mr-5' : ''}`}>
            <ItemPreviewGrid
              itemId={item.itemId}
              itemName={item.itemName}
              artistName={item.artistName}
              price={item.price}
              sale={item.sale}
            />
          </div>
        );
      })}
    </div>
  );
}
