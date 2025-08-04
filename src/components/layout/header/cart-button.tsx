'use client';

import { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store/use-auth-store';
import CartIcon from '@/public/icons/layout/cart.svg';
import { fetchCarts } from '@/services/api/cart-controller';

export default function CartButton() {
  const { isLoggedIn, hasChecked, checkLogin } = useAuthStore();

  const CartBadge = () => {
    const { data } = useSuspenseQuery({
      queryKey: ['carts'],
      queryFn: fetchCarts,
    });

    return (
      <div className="bg-orange absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full">
        <p className="text-caption-02 text-center font-medium text-white">{data.length}</p>
      </div>
    );
  };

  useEffect(() => {
    if (!hasChecked) checkLogin();
  }, [hasChecked, checkLogin]);

  return (
    <div className="relative">
      <Link href="/cart">
        <CartIcon className="text-grey-9" />
        {isLoggedIn && <CartBadge />}
      </Link>
    </div>
  );
}
