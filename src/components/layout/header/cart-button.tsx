'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store/use-auth-store';
import CartIcon from '@/public/icons/layout/cart.svg';

export default function CartButton() {
  const { isLoggedIn, hasChecked, checkLogin } = useAuthStore();

  useEffect(() => {
    if (!hasChecked) checkLogin();
  }, [hasChecked, checkLogin]);

  return (
    <div className="relative">
      <Link href="/cart">
        <CartIcon className="text-grey-9" />
        {isLoggedIn && (
          <div className="bg-orange absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full">
            <p className="text-caption-02 text-center font-medium text-white">3</p>
          </div>
        )}
      </Link>
    </div>
  );
}
