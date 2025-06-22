'use client';

import { useWishStore } from '@/lib/store/use-wish-store';
import HeartEmpty from '@/public/icons/item/heart-empty.svg';
import HeartFilled from '@/public/icons/item/heart-filled.svg';
import type { Item } from '@/types/item.dto';

interface BottomFixedBarProps {
  itemId: Item['itemId'];
}

export default function BottomFixedBar({ itemId }: BottomFixedBarProps) {
  const { wishedIds, toggleWish } = useWishStore();

  const isWished = wishedIds.includes(itemId);

  return (
    <>
      <button
        onClick={() => toggleWish(itemId)}
        className="text-orange text-caption-01 z-50 flex h-12 w-12 cursor-pointer flex-col items-center font-bold"
      >
        {isWished ? <HeartFilled /> : <HeartEmpty />}
        <span>{wishedIds.length}</span> {/* 또는 원하는 값 */}
      </button>
      <button className="bg-grey-9 text-body-01 text-grey-1 h-12 w-75.5 cursor-pointer font-bold">구매하기</button>
    </>
  );
}
