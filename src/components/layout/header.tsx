'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import BackIcon from '@/public/icons/layout/back.svg';
import CartIcon from '@/public/icons/layout/cart.svg';
import HamburgerIcon from '@/public/icons/layout/hamburger.svg';
import MyIcon from '@/public/icons/layout/my.svg';
import SearchIcon from '@/public/icons/layout/search.svg';
import PromesaTextSmallIcon from '@/public/icons/logo/text-sm.svg';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isSearch = pathname.startsWith('/shop');
  const isBack = pathname.startsWith('/artist') || pathname.startsWith('/detail');

  return (
    <div className="bg-pale-green fixed-component top-0 flex items-center justify-between px-5 py-2">
      <div className="mr-17">
        {!isBack ? (
          <Link href="/menu">
            <HamburgerIcon className="text-grey-9" />
          </Link>
        ) : (
          <button
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push('/');
              }
            }}
            className="flex cursor-pointer items-center justify-center"
          >
            <BackIcon className="text-grey-9" />
          </button>
        )}
      </div>
      <Link href="/">
        <PromesaTextSmallIcon className="text-black" />
      </Link>
      <div className="flex gap-1">
        {isSearch ? <SearchIcon className="text-grey-9" /> : <div className="h-7.5 w-7.5" />}
        <Link href="/my-page">
          <MyIcon className="text-grey-9" />
        </Link>
        <Link href="/cart">
          <CartIcon className="text-grey-9" />
        </Link>
      </div>
    </div>
  );
}
