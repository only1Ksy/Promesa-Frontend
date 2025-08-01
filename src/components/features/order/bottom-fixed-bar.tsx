// components/features/order/bottom-fixed-bar.tsx
import clsx from 'clsx';

interface BottomFixedBarProps {
  total: number;
  agree: boolean;
  handlePayCheck: () => void;
}

export default function BottomFixedBar({ total, agree, handlePayCheck }: BottomFixedBarProps) {
  return (
    <div className="bg-pale-green home-shadow flex h-21 w-full px-5 pt-3 pb-4">
      <button
        className={clsx(
          'text-body-01 w-full cursor-pointer rounded-xs py-2 font-bold',
          agree ? 'bg-black text-white' : 'bg-grey-4 text-grey-1 cursor-not-allowed',
        )}
        disabled={!agree}
        onClick={handlePayCheck}
      >
        {total.toLocaleString()}원 결제하기
      </button>
    </div>
  );
}
