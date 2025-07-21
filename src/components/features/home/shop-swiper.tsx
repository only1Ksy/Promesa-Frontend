'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import ItemPreview from '@/components/common/item/item-preview';
import HorizontalScroll from '@/components/common/utilities/horizontal-scroll';
import LinkIcon from '@/public/icons/common/link.svg';
import { fetchNowPopularItems } from '@/services/api/item-controller';

export default function ShopSwiper() {
  const { data: items } = useSuspenseQuery({
    queryKey: ['nowPopularItems'],
    queryFn: fetchNowPopularItems,
  });

  return (
    <div className="mb-14 flex flex-col gap-3">
      <div className="mx-5 flex items-center justify-between">
        <p className="text-subhead font-medium text-black">Now Popular</p>
        <Link href="/shop?sort=wishCount,desc">
          <div className="flex items-center gap-2">
            <p className="text-caption-01 text-grey-6 font-medium">목록 보기</p>
            <LinkIcon className="text-grey-6" />
          </div>
        </Link>
      </div>
      <HorizontalScroll className="ml-5 flex gap-2.5 pr-5">
        {items.map((item, idx) => (
          <div key={idx} className="w-44 flex-none">
            <ItemPreview item={item} maxWidthClass="max-w-44" heightClass="h-81" />
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}
