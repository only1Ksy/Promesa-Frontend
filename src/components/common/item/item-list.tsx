'use client';

import { useMemo, useRef, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import chunkList from '@/lib/utils/chunk-list';
import Expandable from '@/lib/utils/expandable';
import { fetchItems } from '@/services/api/item-controller';
import type { ItemControllerParams, ItemControllerServerParams } from '@/types/item-controller';

import ItemListFilteringHeader from './item-list-filtering-header';
import ItemListPaginationFooter from './item-list-pagination-footer';
import ItemPreview from './item-preview';

interface ItemListGridProps {
  initialParams: ItemControllerParams;
}

export default function ItemList({ initialParams }: ItemListGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const listTopRef = useRef<HTMLDivElement>(null);

  const params = useMemo(
    () =>
      ({
        categoryId: Number(searchParams.get('categoryId')) ?? initialParams.categoryId,
        page: Number(searchParams.get('page')) ?? initialParams.page,
        size: Number(searchParams.get('size')) ?? initialParams.size,
        sort: searchParams.get('sort') ?? initialParams.sort,
        artistId: initialParams.artistId,
        frame: searchParams.get('frame') ?? initialParams.frame,
      }) as ItemControllerParams,
    [initialParams, searchParams],
  );

  const serverParams: ItemControllerServerParams = {
    ...(initialParams as Omit<ItemControllerParams, 'frame'>),
  };

  const { data } = useSuspenseQuery({
    queryKey: ['items', serverParams],
    queryFn: () => fetchItems(serverParams),
  });

  const push = (next: Partial<ItemControllerParams>) => {
    const merged = { ...params, ...next };
    delete merged.artistId; // artistId is not search params
    const mergedParams = Object.fromEntries(Object.entries(merged).map(([key, value]) => [key, String(value)]));
    router.push(`?${new URLSearchParams(mergedParams).toString()}`, { scroll: false });
    requestAnimationFrame(() => {
      const root = document.getElementById('root');
      const target = listTopRef.current;
      if (!root || !target) return;

      root.scrollTo({
        top: target.offsetTop - 46, // header
        behavior: 'smooth',
      });
    });
  };

  const { items, totalPage } = data;

  // frame
  const rowLength = params.frame === 'grid' ? 2 : params.frame === 'masonry' ? 3 : 0;
  const heightClass = params.frame === 'grid' ? 81 : params.frame === 'masonry' ? 62 : 0;
  const maxWidthClass = params.frame === 'grid' ? 44 : params.frame === 'masonry' ? 29 : 0;
  const gapClass = params.frame === 'grid' ? 'gap-2.5' : params.frame === 'masonry' ? 'gap-2' : '';

  // collapsed max height
  const collapsedMaxHeight = params.frame === 'grid' ? 421 : params.frame === 'masonry' ? 261 : 0;

  return (
    <div ref={listTopRef} className="mx-5 flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        {/* 필터링 헤더 */}
        <ItemListFilteringHeader categoryId={params.categoryId} sort={params.sort} frame={params.frame} push={push} />

        {/* 아이템 리스트 */}
        <Expandable
          flag={open}
          collapsedMaxHeight={collapsedMaxHeight}
          durationTime={1000}
          className="relative flex flex-col gap-4"
        >
          {chunkList(items, rowLength).map((group, idx) => {
            const placeholders = Array(rowLength - group.length).fill(null);

            return (
              <div key={idx} className={clsx('flex w-full', gapClass)}>
                {ItemPreview &&
                  group.map((item) => (
                    <ItemPreview
                      key={item.itemId}
                      itemId={item.itemId}
                      itemName={item.itemName}
                      price={item.price}
                      artistName={item.artistName}
                      height={heightClass}
                      maxWidth={maxWidthClass}
                    />
                  ))}
                {ItemPreview &&
                  placeholders.map((_, idx) => (
                    <ItemPreview
                      key={idx}
                      itemId={-1}
                      itemName=""
                      price={0}
                      artistName=""
                      height={heightClass}
                      maxWidth={maxWidthClass}
                    />
                  ))}
              </div>
            );
          })}
          {/* 목록 열기 */}
          {params.artistId && !open && items.length >= 10 && (
            <>
              <div className="from-pale-green/0 to-pale-green/80 absolute bottom-0 z-5 h-70 w-full bg-gradient-to-b from-10% to-100%" />
              <div className="absolute bottom-2 z-10 flex w-full justify-center">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-pale-green border-grey-7 cursor-pointer rounded-full border px-5 py-2"
                >
                  <span className="text-body-01 text-grey-7 font-medium">목록 열기</span>
                </button>
              </div>
            </>
          )}
        </Expandable>
      </div>

      {/* 페이지네이션 */}
      {!params.artistId && (
        <ItemListPaginationFooter currentPage={params.page ?? 0} totalPage={totalPage} push={push} />
      )}
    </div>
  );
}
