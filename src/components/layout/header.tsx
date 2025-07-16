'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import MyIcon from '@/public/icons/layout/my.svg';
import SearchIcon from '@/public/icons/layout/search.svg';
import PromesaTextSmallIcon from '@/public/icons/logo/text-sm.svg';

import BackButton from './header/back-button';
import CartButton from './header/cart-button';
import HamburgerButton from './header/hamburger-button';

interface HeaderProps {
  shadow?: boolean;
}

export default function Header({ shadow }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOrder = pathname.startsWith('/order');
  const isOrderComplete = pathname.startsWith('/order/complete');
  const isSearch = pathname.startsWith('/shop');
  const isReview = pathname.includes('/review');
  const isMy = pathname.startsWith('/my');
  const isBack = pathname.startsWith('/artist') || pathname.startsWith('/detail') || isMy || isReview || isOrder;

  const reviewMode = searchParams.get('mode');

  return (
    <header
      className={clsx(
        'bg-pale-green fixed-component top-0 flex items-center justify-between px-5 py-2',
        shadow && 'home-shadow',
      )}
    >
      <div className="mr-17">
        {!isOrderComplete ? !isBack ? <HamburgerButton /> : <BackButton /> : <div className="h-7.5 w-7.5" />}
      </div>

      {isOrderComplete ? null : isOrder ? (
        <span className="text-subhead pr-24 font-medium text-black">주문/결제</span>
      ) : isReview ? (
        <span className="text-subhead text-grey-9 font-medium">
          {reviewMode === 'imageOnly' ? '모아보기' : '리뷰 전체보기'}
        </span>
      ) : (
        <Link href="/">
          <PromesaTextSmallIcon className="text-black" />
        </Link>
      )}

      {/* 오른쪽 영역 */}
      <div className="flex gap-1">
        {!isOrder && (
          <>
            {isSearch ? <SearchIcon className="text-grey-9" /> : <div className="h-7.5 w-7.5" />}
            {isMy ? (
              <div className="h-7.5 w-7.5" />
            ) : (
              <Link href="/my">
                <MyIcon className="text-grey-9" />
              </Link>
            )}
            <CartButton />
          </>
        )}
      </div>
    </header>
  );
}
