'use client';

import React from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import HorizontalScrollWithActive from '@/components/common/utilities/horizontal-scroll-with-active';
import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { fetchExhibitions } from '@/services/api/exhibition-controller';
import type { ExhibitionSummarySchema } from '@/types/exhibition-controller';

const STATUS_LIST = ['ALL', 'ONGOING', 'UPCOMING', 'PERMANENT', 'PAST'] as const; // strict declaration

interface ExhibitionListProps {
  status: ExhibitionSummarySchema['status'] | 'ALL';
}

export default function ExhibitionList({ status: initialStatus }: ExhibitionListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = searchParams.get('status');
  const selectedStatus =
    value && STATUS_LIST.includes(value as ExhibitionSummarySchema['status'] | 'ALL')
      ? (value as ExhibitionSummarySchema['status'] | 'ALL')
      : initialStatus;

  const { data } = useSuspenseQuery({
    queryKey: ['exhibitionList', selectedStatus],
    queryFn: () => fetchExhibitions(selectedStatus),
  });

  const handleClick = (idx: number) => {
    const newStatus = STATUS_LIST[idx];
    const params = new URLSearchParams(searchParams);
    params.set('status', newStatus);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mx-5 mt-7.5 mb-20 flex flex-col">
      <div className="flex flex-col gap-3">
        <p className="text-headline-06 text-black">Exhibition</p>
        {/* 헤더 */}
        <HorizontalScrollWithActive
          activeId={`category-id-${selectedStatus}`}
          className="text-body-01 mb-2 flex gap-4 font-medium"
        >
          {STATUS_LIST.map((stat, idx) => {
            const isActive = selectedStatus === stat;
            return (
              <button
                key={idx}
                id={`category-id-${stat}`}
                onClick={() => handleClick(idx)}
                className={clsx('text-body-01 cursor-pointer font-medium', isActive ? 'text-grey-9' : 'text-grey-4')}
              >
                {stat.charAt(0) + stat.slice(1).toLowerCase()}
              </button>
            );
          })}
        </HorizontalScrollWithActive>
      </div>
      {/* 전시회 리스트 */}
      <div className="mt-4 flex flex-col gap-7">
        {data.map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col gap-5">
              <div className="bg-green relative h-103 w-full overflow-hidden rounded-xs">
                <ImageWithEffect src={item.summary.imageUrl} alt={`전시회 ${item.summary.title}의 메인 이미지.`} fill />
              </div>
              <div className="mx-1.5 flex flex-col gap-5">
                <div className="flex flex-col">
                  <p className="text-headline-05 text-black">{item.summary.title}</p>
                  <div className="text-caption-01 flex gap-1 font-medium text-black">
                    <p>{item.summary.startDate}</p>
                    <p>~</p>
                    <p>{item.summary.endDate}</p>
                  </div>
                </div>
                <p className="text-body-02 font-medium text-black">{item.summary.description}</p>
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
