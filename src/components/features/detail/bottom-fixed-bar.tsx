'use client';

import { useState } from 'react';

import { useWishStore } from '@/lib/store/use-wish-store';
import HeartEmptyIcon from '@/public/icons/item/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/item/heart-filled.svg';

import BottomFixedModal from './bottom-fixed-modal';

interface BottomFixedBarProps {
  itemId: number;
}

export default function BottomFixedBar({ itemId }: BottomFixedBarProps) {
  const { wishedIds, toggleWish } = useWishStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isWished = wishedIds.includes(itemId);

  return (
    <>
      <div className="bg-pale-green border-green flex w-full flex-col gap-2 border px-5 shadow-[0_0_60px_0_rgba(0,0,0,0.10)]">
        <div className="my-3 flex gap-3">
          <div className="text-orange flex h-12 w-12 flex-col items-center">
            <button onClick={() => toggleWish(itemId)} className="cursor-pointer">
              {isWished ? <HeartFilledIcon className="h-8 w-8" /> : <HeartEmptyIcon className="h-8 w-8 text-white" />}
            </button>
            <span className="text-caption-01 font-bold">0</span>
          </div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="bg-grey-9 text-grey-1 flex h-15 flex-1 cursor-pointer items-center justify-center"
          >
            <span className="text-body-01 font-bold">구매하기</span>
          </div>
        </div>
      </div>

      <BottomFixedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} itemId={itemId} />
    </>
  );
}
