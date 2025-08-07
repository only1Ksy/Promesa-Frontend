'use client';

import clsx from 'clsx';

interface BottomFixedBarProps {
  handlePurchase: () => void;
  isAvailable: boolean;
}

export default function BottomFixedBar({ handlePurchase, isAvailable }: BottomFixedBarProps) {
  return (
    <div className="bg-pale-green home-shadow flex h-21 w-full px-5 pt-3 pb-4">
      <button
        className={clsx(
          'text-body-01 w-full cursor-pointer rounded-xs py-2 font-bold',
          isAvailable ? 'bg-black text-white' : 'bg-grey-4 text-grey-1',
        )}
        onClick={handlePurchase}
      >
        결제하기
      </button>
    </div>
  );
}
