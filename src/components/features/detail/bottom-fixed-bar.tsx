'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { useWishStore } from '@/lib/store/use-wish-store';
import HeartEmptyIcon from '@/public/icons/item/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/item/heart-filled.svg';
import type { Item } from '@/types/item.dto';

// import BottomFixedModal from './bottom-fixed-modal';

interface BottomFixedBarProps {
  itemId: Item['itemId'];
}

export default function BottomFixedBar({ itemId }: BottomFixedBarProps) {
  const { wishedIds, toggleWish } = useWishStore();
  const [isOpen, setIsOpen] = useState(false);

  const isWished = wishedIds.includes(itemId);

  return (
    <div className="bg-pale-green border-green flex w-full flex-col gap-2 border px-5 shadow-[0_0_60px_0_rgba(0,0,0,0.10)]">
      {isOpen && (
        <div className="text-grey-6 mx-5 my-5 flex items-center justify-between">
          <span className="text-subhead font-medium">단품</span>
          <div className="text-grey-9 flex items-center gap-2">
            <span className="text-subhead font-medium">총</span>
            <span className="text-headline-04">27,000원</span>
          </div>
        </div>
      )}

      <div className={clsx('flex', isOpen ? 'gap-2' : 'my-3 gap-3')}>
        {isOpen ? (
          <div className="border-grey-9 bg-pale-green text-grey-9 flex h-12 flex-1/3 items-center justify-center border-[1.4px]">
            <span className="text-body-01 font-bold">장바구니</span>
          </div>
        ) : (
          <div className="text-orange flex h-12 w-12 flex-col items-center">
            <button onClick={() => toggleWish(itemId)} className="cursor-pointer">
              {isWished ? <HeartFilledIcon className="h-8 w-8" /> : <HeartEmptyIcon className="h-8 w-8 text-white" />}
            </button>
            <span className="text-caption-01 font-bold">0</span>
          </div>
        )}
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={clsx(
            'bg-grey-9 text-grey-1 flex cursor-pointer items-center justify-center',
            isOpen ? 'h-12 flex-2/3' : 'h-15 flex-1',
          )}
        >
          <span className="text-body-01 font-bold">구매하기</span>
        </div>
      </div>
    </div>
  );
}
