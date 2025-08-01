'use client';

interface BottomFixedBarProps {
  handlePurchase: () => void;
}

export default function BottomFixedBar({ handlePurchase }: BottomFixedBarProps) {
  return (
    <div className="bg-pale-green home-shadow flex h-21 w-full px-5 pt-3 pb-4">
      <button
        className="text-body-01 w-full cursor-pointer rounded-xs bg-black py-2 font-bold text-white"
        onClick={handlePurchase}
      >
        결제하기
      </button>
    </div>
  );
}
