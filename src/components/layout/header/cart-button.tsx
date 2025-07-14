'use client';

import Link from 'next/link';

import { useAccessTokenStore } from '@/lib/store/use-access-token-store';
import CartIcon from '@/public/icons/layout/cart.svg';

export default function CartButton() {
  const { accessToken } = useAccessTokenStore.getState(); // need to refactor (prefetch API)

  return (
    <div className="relative">
      <Link href="/cart">
        <CartIcon className="text-grey-9" />
      </Link>
      {accessToken && (
        <div className="bg-orange absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full">
          <p className="text-caption-02 text-center font-medium text-white">3</p>
        </div>
      )}
    </div>
  );
}
