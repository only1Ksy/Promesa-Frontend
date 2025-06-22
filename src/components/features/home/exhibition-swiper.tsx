'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import HorizontalScroll from '@/components/common/utilities/horizontal-scroll';
import { fetchExhibitions } from '@/services/api/exhibitions';

export default function ExhibitionSwiper() {
  const { data: items, isLoading } = useQuery({
    queryKey: ['exhibitions'],
    queryFn: fetchExhibitions,
    select: (res) => res.data,
  });

  if (!items) return null;

  if (isLoading) {
    return (
      <div className="ml-5 flex w-full gap-2">
        <div className="bg-green h-77 w-68" />
        <div className="bg-green h-77 w-25.5" />
      </div>
    );
  }

  return (
    <HorizontalScroll className="ml-5 flex gap-2">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <div
            key={idx}
            className={clsx(`bg-green relative flex h-77 w-68 flex-shrink-0 items-end p-7`, isLast ? 'mr-5' : '')}
          >
            <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-3/10 w-full bg-gradient-to-b from-[#000000]/0 to-[#000000]" />
            <div className="z-10 flex flex-col gap-1">
              <p className="text-subhead text-grey-1 font-bold">{item.exhibitionTitle}</p>
              <p className="text-caption-01 text-grey-2 font-medium">{item.exhibitionDescription}</p>
            </div>
          </div>
        );
      })}
    </HorizontalScroll>
  );
}
