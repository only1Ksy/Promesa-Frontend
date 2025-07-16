'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import CartIcon from '@/public/icons/layout/cart.svg';
import { fetchIsLoggedIn } from '@/services/api/axios/auth';

export default function CartButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchIsLoggedIn().then(setIsLoggedIn);
  }, []);

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
