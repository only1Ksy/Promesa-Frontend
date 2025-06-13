'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CartIcon from '@/public/icons/layout/cart.svg';
import HamburgerIcon from '@/public/icons/layout/hamburger.svg';
import MyIcon from '@/public/icons/layout/my.svg';
import SearchIcon from '@/public/icons/layout/search.svg';
import PromesaTextSmallIcon from '@/public/icons/logo/text-sm.svg';

export default function Header() {
  const pathname = usePathname();
  const isSearch = pathname.startsWith('shop');

  return (
    <div className="mx-5 my-2 flex items-center justify-between">
      <div className="mr-17">
        <Link href="/menu">
          <HamburgerIcon className="text-grey-9" />
        </Link>
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
