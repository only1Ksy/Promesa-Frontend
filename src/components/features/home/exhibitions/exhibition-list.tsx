'use client';

import React from 'react';
import { useEffect, useRef } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import HorizontalScroll from '@/components/common/utilities/horizontal-scroll';
import HorizontalScrollWithActiveLine from '@/components/common/utilities/horizontal-scroll-with-active-line';
import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { fetchExhibitions } from '@/services/api/exhibition-controller';
import type { ExhibitionSummarySchema } from '@/types/exhibition-controller';

import NoExhibitions from './no-exhibitions';

const STATUS_LIST = ['ALL', 'ONGOING', 'PERMANENT', 'UPCOMING', 'PAST'] as const; // strict declaration

interface ExhibitionListProps {
  status: ExhibitionSummarySchema['status'] | 'ALL';
}

export default function ExhibitionList({ status: initialStatus }: ExhibitionListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasMountedRef = useRef(false);
  const listTopRef = useRef<HTMLDivElement>(null);

  const initialStatusRef = useRef(initialStatus);

  const value = searchParams.get('status');
  const selectedStatus =
    value && STATUS_LIST.includes(value as ExhibitionSummarySchema['status'] | 'ALL')
      ? (value as ExhibitionSummarySchema['status'] | 'ALL')
      : initialStatus;

  const { data } = useSuspenseQuery({
    queryKey: ['exhibitionList', selectedStatus],
    queryFn: () => fetchExhibitions(selectedStatus),
  });

  useEffect(() => {
    const isFirstVisit = initialStatusRef.current === selectedStatus;
    if (!hasMountedRef.current && isFirstVisit) {
      return;
    }

    hasMountedRef.current = true;

    const target = listTopRef.current;
    if (!target) return;

    target.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [selectedStatus]);

  const handleClick = (idx: number) => {
    const newStatus = STATUS_LIST[idx];
    const params = new URLSearchParams(searchParams);
    params.set('status', newStatus);
    router.push(`?${params.toString()}`, { scroll: false }); // prevent: scroll "from" top when re-render
  };

  return (
    <div className="relative mt-7.5 mb-20 flex flex-col">
      <div ref={listTopRef} className="scroll-mt-11.5" />
      {/* 헤더 */}
      <div className="bg-pale-green sticky top-11.5 z-10 flex flex-col gap-3 px-5 pb-7">
        <p className="text-headline-06 text-black">Exhibition</p>
        <HorizontalScrollWithActiveLine
          activeId={`status-id-${selectedStatus}`}
          className="text-body-01 flex justify-between font-medium"
        >
          {STATUS_LIST.map((stat, idx) => {
            const isActive = selectedStatus === stat;
            return (
              <button key={stat} id={`status-id-${stat}`} onClick={() => handleClick(idx)} className="cursor-pointer">
                <p className={clsx('text-body-01 font-medium', isActive ? 'text-grey-9' : 'text-grey-4')}>
                  {stat.charAt(0) + stat.slice(1).toLowerCase()}
                </p>
              </button>
            );
          })}
        </HorizontalScrollWithActiveLine>
      </div>
      {/* 전시회 리스트 */}
      {data.length > 0 ? (
        <div className="flex flex-col gap-7">
          {data.map((exhibitionItem, idx) => (
            <React.Fragment key={exhibitionItem.summary.id}>
              <div className="flex flex-col gap-5">
                <Link href={`/exhibition/${exhibitionItem.summary.id}`}>
                  <div className="mx-5 flex flex-col gap-5">
                    <div className="bg-green relative h-103 w-full overflow-hidden rounded-xs">
                      <ImageWithEffect
                        src={exhibitionItem.summary.thumbnailImageUrl}
                        alt={`전시회 ${exhibitionItem.summary.title}의 메인 이미지.`}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                    <div className="mx-1.5 flex flex-col gap-5">
                      <div className="flex flex-col">
                        <p className="text-headline-05 text-black">{exhibitionItem.summary.title}</p>
                        <div className="text-caption-01 flex gap-1 font-medium text-black">
                          <p>{exhibitionItem.summary.startDate}</p>
                          <p>~</p>
                          <p>{exhibitionItem.summary.endDate}</p>
                        </div>
                      </div>
                      <p className="text-body-02 custom-break-words font-medium text-black">
                        {exhibitionItem.summary.subTitle}
                      </p>
                    </div>
                  </div>
                </Link>
                {/* 아이템 리스트 */}
                <HorizontalScroll className="ml-5 flex gap-2.5 pr-5">
                  {exhibitionItem.itemPreviews.map((item) => (
                    <Link key={item.itemId} href={`/detail/${item.itemId}`}>
                      <div className="bg-green aspect-[4/5] h-33">
                        <ImageWithEffect
                          src={item.imageUrl}
                          alt={`아이템 ${item.itemId}의 프리뷰 이미지.`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  ))}
                </HorizontalScroll>
              </div>
              {idx !== data.length - 1 && <hr className="mx-5 border-t border-black/20" />}
            </React.Fragment>
          ))}
        </div>
      ) : (
        // 58 = 11.5 (header) + 26.5 (home-exhibitions header) + 20 (margin bottom)
        <div className="relative min-h-[calc(100vh-var(--spacing)*58)]">
          <NoExhibitions />
        </div>
      )}
    </div>
  );
}
