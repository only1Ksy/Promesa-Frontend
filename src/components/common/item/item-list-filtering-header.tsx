'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';

import HorizontalScrollwithActive from '@/components/common/utilities/horizontal-scroll-with-active';
import DropDownIcon from '@/public/icons/item/drop-down.svg';
import type { ArtistItemListParams, ItemListCommon, ShopItemListParams } from '@/types/params.dto';
import { CATEGORY_ID_KEYS, FRAME_KEYS, SORT_KEYS } from '@/types/params.dto';

interface ItemListFilteringHeaderProps {
  categoryId: ItemListCommon['categoryId'];
  sort: ItemListCommon['sort'];
  frame: ItemListCommon['frame'];
  push: (next: Partial<ShopItemListParams | ArtistItemListParams>, isScroll: boolean) => void;
}

export default function ItemListFilteringHeader({ categoryId, sort, frame, push }: ItemListFilteringHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const searchParamKey = useSearchParams().toString();

  // initialize when using router.push(...)
  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParamKey]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        {/* 카테고리 */}
        <div className="to-pale-green from-pale-green/0 pointer-events-none absolute top-0 right-0 z-5 h-full w-8 bg-gradient-to-r" />
        <HorizontalScrollwithActive activeId={`category-id-${categoryId}`} className="flex gap-5.5 pr-8">
          {CATEGORY_ID_KEYS.map(({ label, value }) => {
            const isActive = categoryId === value;
            return (
              <button
                key={value}
                id={`category-id-${value}`}
                onClick={() => push({ categoryId: value, page: '1' }, false)}
                className={clsx(
                  'text-body-01 flex-shrink-0 cursor-pointer font-medium',
                  isActive ? 'text-grey-9' : 'text-grey-4',
                )}
              >
                {label}
              </button>
            );
          })}
        </HorizontalScrollwithActive>
      </div>

      <div className="flex items-center justify-end gap-1">
        {/* 정렬 */}
        <div className="text-caption-01 text-grey-9 relative flex w-21.5 flex-col items-center font-medium">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={clsx(
              'flex w-full cursor-pointer items-center justify-between px-2 py-1',
              open ? 'bg-green' : 'bg-pale-green',
            )}
          >
            <span className="h-4 flex-1 text-start">{SORT_KEYS.find((opt) => opt.value === sort)?.label ?? null}</span>
            <DropDownIcon className={clsx('transition-transform', open ? 'rotate-180' : '')} />
          </button>
          <div
            className={clsx(
              'bg-pale-green absolute top-6 left-0 z-10 flex w-full flex-col overflow-hidden transition-all',
              open ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            {SORT_KEYS.map(
              ({ label, value }) =>
                sort !== value && (
                  <button
                    key={value}
                    onClick={() => {
                      push({ sort: value, page: '1' }, false);
                      setOpen(false);
                    }}
                    className="mx-2 my-1 h-4 cursor-pointer text-start"
                  >
                    {label}
                  </button>
                ),
            )}
          </div>
        </div>

        {/* 액자식/앨범식 */}
        <div className="my-1 flex gap-2.25">
          {FRAME_KEYS.map(({ label: LabelIcon, value }) => {
            const isActive = frame === value;
            return (
              <button
                key={value}
                onClick={() => push({ frame: value }, false)}
                className={clsx('cursor-pointer', isActive ? 'text-orange' : 'text-grey-3')}
              >
                <LabelIcon />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
