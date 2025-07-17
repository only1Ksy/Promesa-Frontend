'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import CloseIcon from '@/public/icons/layout/close.svg';
import MyIcon from '@/public/icons/layout/my.svg';
import SearchIcon from '@/public/icons/layout/search.svg';
import PromesaTextSmallIcon from '@/public/icons/logo/text-sm.svg';

import BackButton from './header/back-button';
import CartButton from './header/cart-button';
import HamburgerButton from './header/hamburger-button';

interface HeaderProps {
  shadow?: boolean;
}

export default function Header({ shadow }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAuthPage = pathname.startsWith('/log'); // login, logout

  const isArtistPage = pathname.startsWith('/artist');
  const isDetailPage = pathname.startsWith('/detail');
  const isMyPage = pathname.startsWith('/my');
  const isOrderPage = pathname.startsWith('/order');
  const isOrderCompletePage = pathname.startsWith('/order/complete');
  const isReviewPage = pathname.includes('/review');
  const isShopPage = pathname.startsWith('/shop');

  const isBack = isArtistPage || isDetailPage || isMyPage || isOrderPage || isReviewPage;

  const reviewMode = searchParams.get('mode');

  const EmptyDiv = () => <div className="h-7.5 w-7.5" />;

  const LeftIcon = () => {
    if (isAuthPage || isOrderCompletePage) return <EmptyDiv />;
    else if (isBack) return <BackButton />;
    else return <HamburgerButton />;
  };

  const CenterText = () => {
    if (isAuthPage || isArtistPage || isOrderCompletePage) return null;
    else if (isOrderPage) return <span className="text-subhead text-grey-9 font-medium">주문/결제</span>;
    else if (isReviewPage)
      return (
        <span className="text-subhead text-grey-9 font-medium">
          {reviewMode === 'imageOnly' ? '모아보기' : '리뷰 전체보기'}
        </span>
      );
    else if (isMyPage) return <span className="text-subhead text-grey-9 font-medium">마이페이지</span>;
    else
      return (
        <Link href="/">
          <PromesaTextSmallIcon className="text-black" />
        </Link>
      );
  };

  const RightHeader = () => {
    const FirstIcon = () => (isShopPage ? <SearchIcon className="text-grey-9" /> : <EmptyDiv />);
    const SecondIcon = () =>
      isAuthPage || isMyPage || isOrderPage ? (
        <EmptyDiv />
      ) : (
        <Link href="/my">
          <MyIcon className="text-grey-9" />
        </Link>
      );
    const ThirdIcon = () => {
      if (isAuthPage)
        return (
          <button
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = '/';
              }
            }}
            className="flex cursor-pointer items-center justify-center"
          >
            <CloseIcon className="text-grey-9" />
          </button>
        );
      else if (isOrderPage) return <EmptyDiv />;
      else return <CartButton />;
    };

    return (
      <>
        <FirstIcon />
        <SecondIcon />
        <ThirdIcon />
      </>
    );
  };

  return (
    <header
      className={clsx(
        'bg-pale-green fixed-component top-0 flex items-center justify-between px-5 py-2',
        shadow && 'home-shadow',
      )}
    >
      <div className="mr-17">
        <LeftIcon />
      </div>
      <CenterText />
      <div className="flex gap-1">
        <RightHeader />
      </div>
    </header>
  );
}
