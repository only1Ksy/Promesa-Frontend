'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import ItemPreview from '@/components/common/item/item-preview';
import HorizontalScroll from '@/components/common/utilities/horizontal-scroll';
import { fetchNowPopularItems } from '@/services/api/item-controller';

export default function ShopSwiper() {
  const { data: items } = useSuspenseQuery({
    queryKey: ['nowPopularItems'],
    queryFn: fetchNowPopularItems,
  });

  return (
    <HorizontalScroll className="ml-5 flex gap-2.5">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <div key={idx} className={`w-44 flex-none ${isLast ? 'mr-5' : ''}`}>
            <ItemPreview
              itemId={item.itemId}
              itemName={item.itemName}
              artistName={item.artistName}
              price={item.price}
              height={81}
              maxWidth={44}
            />
          </div>
        );
      })}
    </HorizontalScroll>
  );
}
