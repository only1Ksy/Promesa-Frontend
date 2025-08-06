'use client';

import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Expandable from '@/components/common/utilities/expandable';
import { useAuthStore } from '@/lib/store/use-auth-store';
import CloseIcon from '@/public/icons/layout/close.svg';
import HamburgerIcon from '@/public/icons/layout/hamburger.svg';
import HideCategoriesIcon from '@/public/icons/layout/hide-categories.svg';
import { fetchParentCategories } from '@/services/api/category-controller';

export default function HamburgerButton() {
  const [open, setOpen] = useState(false);
  const [itemCategoriesOpen, setItemCategoriesOpen] = useState(false);

  const { isLoggedIn, hasChecked, checkLogin } = useAuthStore();

  // handle navigation
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();

  const { data } = useSuspenseQuery({
    queryKey: ['itemCategories'],
    queryFn: fetchParentCategories,
  });

  useEffect(() => {
    if (!hasChecked) checkLogin();
  }, [hasChecked, checkLogin]);

  // block scroll
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  // handle navigation
  useEffect(() => {
    setOpen(false);
    setItemCategoriesOpen(false);
  }, [pathname, searchParamsStr]);

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex cursor-pointer items-center justify-center">
        <HamburgerIcon className="text-grey-9" />
      </button>
      <div
        className={clsx(
          'fixed-component max-z-index bg-pale-green top-0 flex min-h-screen -translate-x-5 flex-col gap-3 overflow-hidden',
          !open && '!w-0',
        )}
      >
        <div className="mx-5 my-2 flex items-center justify-end">
          <button
            onClick={() => {
              setOpen(false);
              setItemCategoriesOpen(false);
            }}
            className="flex cursor-pointer items-center justify-center"
          >
            <CloseIcon width={30} height={30} className="text-grey-9" />
          </button>
        </div>
        <div className="mx-5 flex flex-col gap-6">
          {/* 빠른 페이지 이동 */}
          <div className="text-body-01 text-grey-5 flex gap-8 font-medium">
            {!isLoggedIn ? (
              <Link href="/login?afterLogin=/admin">
                <p>Login</p>
              </Link>
            ) : (
              <Link href="/logout">
                <p>Logout</p>
              </Link>
            )}
            <Link href="/my/wish-list">
              <p>Wishlist</p>
            </Link>
            <Link href="https://www.instagram.com/promesa_ceramic" target="_blank" rel="noopener noreferrer">
              <p>Instagram</p>
            </Link>
          </div>
          {/* 카테고리 (HOME/SHOP/ARTIST/EXHIBITION) */}
          <div className="flex flex-col gap-1">
            <div className="my-3">
              <Link href="/">
                <p className="text-subhead font-medium">HOME</p>
              </Link>
            </div>
            {/* SHOP 카테고리 */}
            <div className="flex gap-9">
              <div className="my-3 flex items-start">
                <button
                  onClick={() => setItemCategoriesOpen((prev) => !prev)}
                  className="flex cursor-pointer items-center gap-1"
                >
                  <p className="text-subhead font-medium">SHOP</p>
                  <div
                    className={clsx(
                      'flex items-center justify-center transition-transform duration-500',
                      itemCategoriesOpen ? '-rotate-90' : '',
                    )}
                  >
                    <HideCategoriesIcon className="text-grey-9" />
                  </div>
                </button>
              </div>
              {/* 아이템 카테고리 리스트 */}
              <Expandable
                flag={itemCategoriesOpen}
                collapsedMaxHeight={0}
                durationTime={400}
                className="mt-4 flex flex-col gap-5"
              >
                {data.map(({ id, name }) => (
                  <Link key={id} href={`/shop?categoryId=${id}`}>
                    <p className="text-body-01 text-grey-5 only-hover:text-black cursor-pointer font-medium transition duration-300 active:text-black">
                      {name}
                    </p>
                  </Link>
                ))}
              </Expandable>
            </div>
            <div className="my-3">
              <Link href="/home/artists">
                <p className="text-subhead font-medium">ARTIST</p>
              </Link>
            </div>
            <div className="my-3">
              <Link href="/home/exhibitions">
                <p className="text-subhead font-medium">EXHIBITION</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
