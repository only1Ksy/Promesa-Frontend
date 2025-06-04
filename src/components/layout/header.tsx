import Link from 'next/link';

import PromesaGreyIcon from '@/public/icons/default/promesa-grey-900.svg';
import CartIcon from '@/public/icons/layout/cart.svg';
import HamburgerIcon from '@/public/icons/layout/hamburger.svg';
import MyIcon from '@/public/icons/layout/my.svg';

export default function Header() {
  return (
    <div className="mx-5 my-2 flex items-center justify-between">
      <div className="mr-8.5">
        <Link href="/menu">
          <HamburgerIcon className="text-grey-900 h-7.5 w-7.5" />
        </Link>
      </div>
      <Link href="/">
        <PromesaGreyIcon />
      </Link>
      <div className="flex gap-0.5">
        <Link href="/my-page">
          <MyIcon className="text-grey-900 h-7.5 w-7.5" />
        </Link>
        <Link href="/cart">
          <CartIcon className="text-grey-900 h-7.5 w-7.5" />
        </Link>
      </div>
    </div>
  );
}
