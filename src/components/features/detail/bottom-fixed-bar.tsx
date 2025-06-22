'use client';

import { useState } from 'react';

import { useWishStore } from '@/lib/store/use-wish-store';
import HeartEmpty from '@/public/icons/item/heart-empty.svg';
import HeartFilled from '@/public/icons/item/heart-filled.svg';
import type { Item } from '@/types/item.dto';

interface BottomFixedBarProps {
  itemId: Item['itemId'];
}

type PurchaseStep = 'initial' | 'options';

export default function BottomFixedBar({ itemId }: BottomFixedBarProps) {
  const { wishedIds, toggleWish } = useWishStore();
  const [step, setStep] = useState<PurchaseStep>('initial');

  const isWished = wishedIds.includes(itemId);

  const handlePurchaseClick = () => {
    setStep('options');
  };

  const handleAddToCart = () => {
    // 장바구니 추가 로직
    console.log('장바구니에 추가:', itemId);
  };

  const handleDirectPurchase = () => {
    // 바로 구매 로직
    console.log('바로 구매:', itemId);
  };

  if (step === 'initial') {
    // 첫 번째 단계: 찜 + 구매하기
    return (
      <>
        <button
          onClick={() => toggleWish(itemId)}
          className="text-orange text-caption-01 z-50 flex h-12 w-12 cursor-pointer flex-col items-center font-bold"
        >
          {isWished ? <HeartFilled /> : <HeartEmpty />}
          <span>{wishedIds.length}</span>
        </button>
        <button
          onClick={handlePurchaseClick}
          className="bg-grey-9 text-body-01 text-grey-1 h-12 w-75.5 cursor-pointer font-bold"
        >
          구매하기
        </button>
      </>
    );
  }

  // 두 번째 단계: 장바구니 + 구매하기
  return (
    <>
      <button
        onClick={handleAddToCart}
        className="bg-grey-1 text-body-01 text-grey-9 border-grey-5 h-12 w-37.25 cursor-pointer border font-bold"
      >
        장바구니
      </button>
      <button
        onClick={handleDirectPurchase}
        className="bg-grey-9 text-body-01 text-grey-1 h-12 w-37.25 cursor-pointer font-bold"
      >
        구매하기
      </button>
    </>
  );
}
