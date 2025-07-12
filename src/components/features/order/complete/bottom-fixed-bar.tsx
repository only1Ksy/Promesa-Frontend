// components/features/order/bottom-fixed-bar.tsx
import clsx from 'clsx';

/* interface BottomFixedBarProps {
  total: number;
  agree: boolean;
  handlePayCheck: () => void;
} */

export default function BottomFixedBar() {
  return (
    <div className="bg-pale-green home-shadow flex h-21 w-full justify-between px-5 py-3">
      <button
        className={clsx(
          'text-body-01 bg-pale-green border-grey-9 text-grey-9 w-44 cursor-pointer rounded-xs border py-2 font-bold',
        )}
      >
        주문 확인하기
      </button>
      <button className={clsx('text-body-01 bg-grey-9 text-grey-1 w-44 cursor-pointer rounded-xs py-2 font-bold')}>
        쇼핑 계속하기
      </button>
    </div>
  );
}
