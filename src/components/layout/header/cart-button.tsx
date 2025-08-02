'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store/use-auth-store';
import CartIcon from '@/public/icons/layout/cart.svg';
import { fetchCarts } from '@/services/api/cart-controller';

export default function CartButton() {
  const { isLoggedIn, hasChecked, checkLogin } = useAuthStore();

  const { data: carts, isLoading } = useQuery({
    queryKey: ['carts'],
    queryFn: () => fetchCarts(),
    select: (res) => res,
  });

  useEffect(() => {
    if (!hasChecked) checkLogin();
  }, [hasChecked, checkLogin]);

  if (!carts || isLoading) return null;

  const isNumber = isLoggedIn && carts.length !== 0;

  return (
    <div className="relative">
      <Link href="/cart">
        <CartIcon className="text-grey-9" />
        {isNumber && (
          <div className="bg-orange absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full">
            <p className="text-caption-02 text-center font-medium text-white">{carts.length}</p>
          </div>
        )}
      </Link>
    </div>
  );
}
