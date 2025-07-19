'use client';

import { useState } from 'react';

import { useToggleWish } from '@/hooks/use-toggle-wish';
import HeartEmptyIcon from '@/public/icons/item/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/item/heart-filled.svg';

import BottomFixedModal from './bottom-fixed-modal';

interface BottomFixedBarProps {
  itemId: number;
  wished: boolean;
  wishCount: number;
}

export default function BottomFixedBar({ itemId, wished, wishCount }: BottomFixedBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClicked = () => {
    setIsModalOpen(true);
  };

  const { mutate: toggleWish } = useToggleWish({
    queryKeyList: [['itemDetail', itemId]],
  });

  return (
    <>
      <div className="bg-pale-green border-green flex w-full flex-col gap-2 border px-5 pb-1 shadow-[0_0_60px_0_rgba(0,0,0,0.10)]">
        <div className="my-3 flex gap-3">
          <div className="flex h-12 w-12 flex-col items-center">
            <button
              onClick={() => toggleWish({ targetType: 'ITEM', targetId: itemId, currentWished: wished })}
              className="cursor-pointer"
            >
              {wished ? (
                <>
                  <HeartFilledIcon width="32" height="32" className="text-orange" />
                  <span className="text-orange text-caption-01 font-bold">{wishCount}</span>
                </>
              ) : (
                <>
                  <HeartEmptyIcon width="32" height="32" className="text-grey-5" />
                  <span className="text-grey-5 text-caption-01 font-bold">{wishCount}</span>
                </>
              )}
            </button>
          </div>
          <button
            onClick={() => {
              onClicked();
            }}
            className="bg-grey-9 text-grey-1 text-body-01 flex h-15 flex-1 cursor-pointer items-center justify-center rounded-xs font-bold"
          >
            구매하기
          </button>
        </div>
      </div>

      <BottomFixedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} itemId={itemId} />
    </>
  );
}
