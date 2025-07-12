'use client';

import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import Expandable from '@/components/common/utilities/expandable';
import { useAccessTokenStore } from '@/lib/store/use-access-token-store';
import CloseIcon from '@/public/icons/layout/close.svg';
import HamburgerIcon from '@/public/icons/layout/hamburger.svg';
import HideCategoriesIcon from '@/public/icons/layout/hide-categories.svg';
import { logoutOnce } from '@/services/api/axios/auth';
import { fetchParentCategories } from '@/services/api/category-controller';

export default function HamburgerButton() {
  const [open, setOpen] = useState(false);
  const [itemCategoriesOpen, setItemCategoriesOpen] = useState(false);

  const accessToken = useAccessTokenStore((s) => s.accessToken);

  // handle navigation
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();

  const { data } = useSuspenseQuery({
    queryKey: ['itemCategories'],
    queryFn: fetchParentCategories,
  });

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
          'fixed-component max-z-index bg-pale-green top-0 flex min-h-screen -translate-x-5 flex-col gap-3',
          'overflow-hidden transition-[width] duration-500',
          !open && '!w-0',
        )}
      >
        <button
          onClick={() => {
            setOpen(false);
            setItemCategoriesOpen(false);
          }}
          className="mx-5 my-2 flex cursor-pointer items-center justify-end"
        >
          <CloseIcon className="text-grey-9" />
        </button>
        <div className="mx-5 flex flex-col gap-5">
          {/* 빠른 페이지 이동 */}
          <div className="text-body-01 text-grey-5 flex gap-8 font-medium">
            {accessToken ? (
              <Link href="/login">
                <p>Login</p>
              </Link>
            ) : (
              <button onClick={logoutOnce} className="flex cursor-pointer items-center justify-center">
                <p>Logout</p>
              </button>
            )}
            <Link href="/">
              <p>Wishlist</p>
            </Link>
            <Link href="https://www.instagram.com/promesa_ceramic" target="_blank" rel="noopener noreferrer">
              <p>Instagram</p>
            </Link>
          </div>
          {/* 카테고리 (HOME/SHOP/ARTIST/EXHIBITION) */}
          <div className="flex flex-col gap-1.25">
            <div className="my-3">
              <Link href="/">
                <p className="text-headline-06">HOME</p>
              </Link>
            </div>
            {/* SHOP 카테고리 */}
            <div className="flex gap-9.25">
              <div className="my-3 flex items-start">
                <div className="flex items-center gap-1">
                  <Link href="/shop">
                    <p className="text-headline-06">SHOP</p>
                  </Link>
                  <button
                    onClick={() => setItemCategoriesOpen((prev) => !prev)}
                    className={clsx(
                      'flex cursor-pointer items-center justify-center transition-transform duration-500',
                      itemCategoriesOpen ? '-rotate-90' : '',
                    )}
                  >
                    <HideCategoriesIcon className="text-grey-9" />
                  </button>
                </div>
              </div>
              {/* 아이템 카테고리 리스트 */}
              {/* max-height = 16 + 24 * len + 20 * (len - 1) */}
              <Expandable
                flag={itemCategoriesOpen}
                collapsedMaxHeight={0}
                durationTime={400}
                className="mt-4 flex flex-col gap-5"
              >
                {data.map(({ id, name }, idx) => (
                  <Link key={id} href={`/shop?categoryId=${idx}`}>
                    <p className="text-body-01 text-grey-5 cursor-pointer font-medium transition duration-300 hover:text-black">
                      {name}
                    </p>
                  </Link>
                ))}
              </Expandable>
            </div>
            <div className="my-3">
              <Link href="/home/artists">
                <p className="text-headline-06">ARTIST</p>
              </Link>
            </div>
            <div className="my-3">
              <Link href="/home/exhibitions">
                <p className="text-headline-06">EXHIBITION</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
