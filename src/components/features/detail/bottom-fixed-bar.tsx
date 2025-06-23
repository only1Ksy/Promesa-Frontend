'use client';

import { useState } from 'react';
import clsx from 'clsx';

import { useWishStore } from '@/lib/store/use-wish-store';
import HeartEmpty from '@/public/icons/item/heart-empty.svg';
import HeartFilled from '@/public/icons/item/heart-filled.svg';
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
    <div className="border-green bg-pale-green flex items-center justify-between border px-5 py-3 shadow-[0_0_60px_0_rgba(0,0,0,0.10)]">
      <button
        onClick={() => toggleWish(itemId)}
        className="text-orange text-caption-01 z-50 flex h-12 w-12 cursor-pointer flex-col items-center font-bold"
      >
        {isWished ? <HeartFilled /> : <HeartEmpty />}
        <span>{wishedIds.length}</span>
      </button>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          'bg-grey-9 text-body-01 text-grey-1 w-75.5 cursor-pointer font-bold transition-all',
          isOpen ? 'h-30' : 'h-15',
        )}
      >
        구매하기
      </button>

      {/* <BottomFixedModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </div>
  );
}
