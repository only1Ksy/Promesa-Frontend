'use client';

import { useState } from 'react';

import DropDownIcon from '@/public/icons/item/drop-down.svg';
import type { ItemListParams } from '@/types/params.dto';
import { CATEGORY_ID_KEYS, FRAME_KEYS, SORT_KEYS } from '@/types/params.dto';

interface ItemListFilteringHeaderProps {
  categoryId: ItemListParams['categoryId'];
  sort: ItemListParams['sort'];
  frame: ItemListParams['frame'];
  push: (next: Partial<ItemListParams>) => void;
}

export default function ItemListFilteringHeader({ categoryId, sort, frame, push }: ItemListFilteringHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        {/* 카테고리 */}
        <div className="to-pale-green absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-r from-[rgba(238,239,233,0)]" />
        <div className="hide-scrollbar flex gap-5.5 overflow-x-auto pr-8">
          {CATEGORY_ID_KEYS.map(({ label, value }) => {
            const isActive = categoryId === value;
            return (
              <button
                key={`category-id-${value}`}
                onClick={() => push({ categoryId: value, page: '1' })}
                className={`text-body-01 flex-shrink-0 cursor-pointer font-medium ${isActive ? 'text-grey-9' : 'text-grey-4'}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1">
        {/* 정렬 */}
        <div className="text-caption-01 text-grey-9 relative flex min-w-21.5 flex-col items-center font-medium">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`flex cursor-pointer items-center gap-2 px-2 py-1 ${open ? 'bg-green' : 'bg-pale-green'}`}
          >
            <span className="h-4 w-full text-start">{SORT_KEYS.find((opt) => opt.value === sort)?.label ?? null}</span>
            <DropDownIcon className={`flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <div
            className={`bg-pale-green absolute top-6 left-0 z-10 flex w-full flex-col overflow-hidden transition-all ${open ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {SORT_KEYS.map(
              ({ label, value }) =>
                sort !== value && (
                  <button
                    key={`sort-${value}`}
                    onClick={() => {
                      push({ sort: value, page: '1' });
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
                key={`frame-${value}`}
                onClick={() => push({ frame: value })}
                className={`cursor-pointer ${isActive ? 'text-orange' : 'text-grey-3'}`}
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
