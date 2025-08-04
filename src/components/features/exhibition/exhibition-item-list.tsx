'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import ItemPreview from '@/components/common/item/item-preview';
import chunkList from '@/lib/utils/chunk-list';
import FrameGridIcon from '@/public/icons/item/frame-grid.svg';
import FrameMasonryIcon from '@/public/icons/item/frame-masonry.svg';
import { fetchExhibition } from '@/services/api/exhibition-controller';

interface ExhibitionItemListProps {
  exhibitionId: number;
  frame: 'grid' | 'masonry';
}

export default function ExhibitionItemList({ exhibitionId, frame: initialFrame }: ExhibitionItemListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasMountedRef = useRef(false);
  const listTopRef = useRef<HTMLDivElement>(null);
  const initialFrameRef = useRef(initialFrame);

  const frame = searchParams.get('frame') == 'masonry' ? 'masonry' : 'grid';
  const FRAME_KEYS = [
    { label: FrameGridIcon, value: 'grid' },
    { label: FrameMasonryIcon, value: 'masonry' },
  ];

  const { data } = useSuspenseQuery({
    queryKey: ['exhibition', exhibitionId],
    queryFn: () => fetchExhibition(exhibitionId),
  });

  useEffect(() => {
    const isFirstVisit = initialFrameRef.current === initialFrame;
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
  }, [initialFrame]);

  // item-list setting
  const { rowLength, heightClass, maxWidthClass, gapClass } = useMemo(() => {
    switch (frame) {
      case 'grid':
        return {
          rowLength: 2,
          heightClass: 'h-81',
          maxWidthClass: 'max-w-44',
          gapClass: 'gap-2.5',
        };
      case 'masonry':
        return {
          rowLength: 3,
          heightClass: 'h-62',
          maxWidthClass: 'max-w-29',
          gapClass: 'gap-1.75',
        };
      default:
        return {
          rowLength: 0,
          heightClass: '',
          maxWidthClass: '',
          gapClass: '',
        };
    }
  }, [frame]);

  return (
    <div className="relative mx-5 mb-20 flex flex-col">
      <div ref={listTopRef} className="scroll-mt-11.5" />
      {/* 헤더 */}
      <div className="bg-pale-green sticky top-11.5 z-100 flex items-center justify-between pb-6">
        <p className="text-headline-05 text-black">작품 모아보기</p>
        <div className="flex gap-2.25">
          {FRAME_KEYS.map(({ label: LabelIcon, value }) => {
            const isActive = frame === value;
            return (
              <button
                key={value}
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  params.set('frame', value);
                  router.replace(`?${params.toString()}`, { scroll: false });
                }}
                className={clsx('cursor-pointer', isActive ? 'text-orange' : 'text-grey-3')}
              >
                <LabelIcon />
              </button>
            );
          })}
        </div>
      </div>
      {/* 아이템 리스트 */}
      <div className="flex flex-col gap-4">
        {chunkList(data.itemPreviews, rowLength).map((group, idx) => {
          const placeholders = Array(rowLength - group.length).fill(null);

          return (
            <div key={idx} className={clsx('flex w-full', gapClass)}>
              {group.map((item, idx) => (
                <ItemPreview key={idx} item={item} maxWidthClass={maxWidthClass} heightClass={heightClass} />
              ))}
              {placeholders.map((_, idx) => (
                <div key={idx} className={clsx('flex-1', maxWidthClass, heightClass)} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
