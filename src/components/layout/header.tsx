'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import CartIcon from '@/public/icons/layout/cart.svg';
import HamburgerIcon from '@/public/icons/layout/hamburger.svg';
import MyIcon from '@/public/icons/layout/my.svg';
import SearchIcon from '@/public/icons/layout/search.svg';
import PromesaTextSmallIcon from '@/public/icons/logo/text-sm.svg';

import BackButton from './header/back-button';

interface HeaderProps {
  shadow?: boolean;
}

export default function Header({ shadow }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isSearch = pathname.startsWith('/shop');
  const isReview = pathname.includes('/review');
  const isBack = pathname.startsWith('/artist') || pathname.startsWith('/detail') || isReview;

  const reviewMode = searchParams.get('mode'); // ← 여기서 mode 값을 읽어요

  return (
    <header
      className={clsx(
        'bg-pale-green fixed-component top-0 flex items-center justify-between px-5 py-2',
        shadow && 'home-shadow',
      )}
    >
      <div className="mr-17">
        {!isBack ? (
          <Link href="/menu">
            <HamburgerIcon className="text-grey-9" />
          </Link>
        ) : (
          <BackButton />
        )}
      </div>

      {!isReview ? ( // need to refactor
        <Link href="/">
          <PromesaTextSmallIcon className="text-black" />
        </Link>
      ) : (
        <span className="text-subhead text-grey-9 font-medium">
          {reviewMode === 'imageOnly' ? '모아보기' : '리뷰 전체보기'}
        </span>
      )}

      <div className="flex gap-1">
        {isSearch ? <SearchIcon className="text-grey-9" /> : <div className="h-7.5 w-7.5" />}
        <Link href="/me">
          <MyIcon className="text-grey-9" />
        </Link>
        <Link href="/cart">
          <CartIcon className="text-grey-9" />
        </Link>
      </div>
    </header>
  );
}
