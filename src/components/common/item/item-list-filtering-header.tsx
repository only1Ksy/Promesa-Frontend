'use client';

import { useEffect, useRef, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';

import HorizontalScrollwithActive from '@/components/common/utilities/horizontal-scroll-with-active';
import DropDownIcon from '@/public/icons/item/drop-down.svg';
import FrameGridIcon from '@/public/icons/item/frame-grid.svg';
import FrameMasonryIcon from '@/public/icons/item/frame-masonry.svg';
import { fetchParentCategories } from '@/services/api/category-controller';
import type { ItemControllerParams } from '@/types/item-controller';

interface ItemListFilteringHeaderProps {
  categoryId: ItemControllerParams['categoryId'];
  sort: ItemControllerParams['sort'];
  frame: ItemControllerParams['frame'];
  push: (next: Partial<ItemControllerParams>) => void;
}

export default function ItemListFilteringHeader({ categoryId, sort, frame, push }: ItemListFilteringHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const searchParamKeys = useSearchParams().toString();

  const { data } = useSuspenseQuery({
    queryKey: ['categoryParent'],
    queryFn: fetchParentCategories,
  });

  // initialize when using router.push(...)
  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParamKeys]);

  // drop down
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const parentCategoryList = [{ id: 0, name: 'ALL' }, ...data];

  // sort, frame keys
  const SORT_KEYS = [
    { label: '높은 가격순', value: 'price,desc' },
    { label: '낮은 가격순', value: 'price,asc' },
    { label: '인기순', value: 'wishCount,desc' },
  ];
  const FRAME_KEYS = [
    { label: FrameGridIcon, value: 'grid' },
    { label: FrameMasonryIcon, value: 'masonry' },
  ];

  return (
    <div className="bg-pale-green sticky top-11.5 z-20 flex flex-col gap-3 pt-7 pb-4">
      <div className="relative">
        {/* 카테고리 */}
        <div className="to-pale-green from-pale-green/0 pointer-events-none absolute top-0 right-0 z-5 h-full w-8 bg-gradient-to-r" />
        <HorizontalScrollwithActive activeId={`category-id-${categoryId}`} className="flex gap-5.5 pr-8">
          {parentCategoryList.map(({ id, name }) => {
            const isActive = categoryId === id;
            return (
              <button
                key={id}
                id={`category-id-${id}`}
                onClick={() => push({ categoryId: id, page: 0 })}
                className={clsx(
                  'text-body-01 flex-shrink-0 cursor-pointer font-medium',
                  isActive ? 'text-grey-9' : 'text-grey-4',
                )}
              >
                {name}
              </button>
            );
          })}
        </HorizontalScrollwithActive>
      </div>

      <div className="flex items-center justify-end gap-1">
        {/* 정렬 */}
        <div ref={dropdownRef} className="text-caption-01 relative flex flex-col items-center font-medium">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={clsx(
              'text-grey-9 flex cursor-pointer items-center justify-center gap-2 px-2 py-1',
              open ? 'bg-green' : 'bg-pale-green',
            )}
          >
            <span className="w-14.5 text-end">{SORT_KEYS.find((opt) => opt.value === sort)?.label ?? null}</span>
            <DropDownIcon className={clsx('transition-transform', open ? 'rotate-180' : '')} />
          </button>
          <div
            className={clsx(
              'absolute top-6.5 left-0 z-10 flex w-full flex-col overflow-hidden transition-all',
              open ? 'max-h-13 opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            {SORT_KEYS.map(
              ({ label, value }) =>
                sort !== value && (
                  <button
                    key={value}
                    onClick={() => {
                      push({ sort: value, page: 0 });
                      setOpen(false);
                    }}
                    className="bg-pale-green text-grey-5 hover:bg-green hover:text-grey-9 flex cursor-pointer items-center px-2 py-1"
                  >
                    <span className="w-14.5 text-end">{label}</span>
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
                onClick={() => push({ frame: value })}
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
