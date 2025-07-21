'use client';

import React from 'react';
import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import HorizontalScrollwithActive from '@/components/common/utilities/horizontal-scroll-with-active';
import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { fetchExhibitions } from '@/services/api/exhibition-controller';

const CATEOGORY_LIST = [
  { key: '', value: 'ALL' },
  { key: 'ONGOING', value: 'Ongoing' },
  { key: 'ENDED', value: 'Past' },
  { key: 'NONE', value: 'Upcomming' },
] as const;

export default function ExhibitionList() {
  const [activeIdx, setActiveIdx] = useState(0);

  const { data } = useSuspenseQuery({
    queryKey: ['exhibitionList'],
    queryFn: fetchExhibitions,
  });

  const displayData = useMemo(() => {
    if (CATEOGORY_LIST[activeIdx].key === '') return data;
    return data.filter((item) => {
      return item.status === CATEOGORY_LIST[activeIdx].key;
    });
  }, [data, activeIdx]);

  return (
    <div className="mx-5 mt-7.5 mb-20 flex flex-col">
      <div className="flex flex-col gap-3">
        <p className="text-headline-06 text-black">Exhibition</p>
        <HorizontalScrollwithActive
          activeId={`category-id-${activeIdx}`}
          className="text-body-01 mb-2 flex gap-8 font-medium"
        >
          {CATEOGORY_LIST.map(({ value }, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={idx}
                id={`category-id-${idx}`}
                onClick={() => setActiveIdx(idx)}
                className={clsx('text-body-01 cursor-pointer font-medium', isActive ? 'text-grey-9' : 'text-grey-4')}
              >
                {value}
              </button>
            );
          })}
        </HorizontalScrollwithActive>
      </div>
      <div className="mt-4 flex flex-col gap-7">
        {displayData.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col gap-5">
              <div className="bg-green relative h-103 w-full overflow-hidden rounded-xs">
                <ImageWithEffect src={item.imageUrl} alt={`전시회 ${item.title}의 메인 이미지.`} fill />
              </div>
              <div className="mx-1.5 flex flex-col gap-5">
                <div className="flex flex-col">
                  <p className="text-headline-05 text-black">{item.title}</p>
                  <div className="text-caption-01 flex gap-1 font-medium text-black">
                    <p>{item.createdAt.split('T')[0]}</p>
                    <p>~</p>
                    <p>{item.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <p className="text-body-02 font-medium text-black">{item.description}</p>
              </div>
              <div className="flex gap-2.5">
                <div className="bg-green aspect-[4/5] flex-1" />
                <div className="bg-green aspect-[4/5] flex-1" />
                <div className="bg-green aspect-[4/5] flex-1" />
              </div>
            </div>
            {idx !== data.length - 1 && <hr className="border-t border-black/20" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
