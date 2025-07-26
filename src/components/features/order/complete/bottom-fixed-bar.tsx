// components/features/order/bottom-fixed-bar.tsx
import clsx from 'clsx';
import Link from 'next/link';

export default function BottomFixedBar() {
  return (
    <div className="bg-pale-green home-shadow flex h-21 w-full justify-between px-5 py-3">
      <Link href={'/my/order'}>
        <button
          className={clsx(
            'text-body-01 bg-pale-green border-grey-9 text-grey-9 h-14 w-44 cursor-pointer rounded-xs border py-2 font-bold',
          )}
        >
          주문 확인하기
        </button>
      </Link>
      <Link href="/shop?sort=wishCount,desc">
        <button
          className={clsx('text-body-01 bg-grey-9 text-grey-1 h-14 w-44 cursor-pointer rounded-xs py-2 font-bold')}
        >
          쇼핑 계속하기
        </button>
      </Link>
    </div>
  );
}
