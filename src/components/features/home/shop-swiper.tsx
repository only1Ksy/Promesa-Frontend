'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
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
      <HorizontalScroll className="ml-5 flex gap-2.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <div key={idx} className={clsx('w-44 flex-none', isLast && 'mr-5')}>
              <ItemPreview item={item} maxWidthClass="max-w-44" heightClass="h-81" />
            </div>
          );
        })}
      </HorizontalScroll>
    </div>
  );
}
