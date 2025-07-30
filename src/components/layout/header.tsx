'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import SearchHeader from '@/components/features/search/search-header';
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const isLoginPage = pathname.startsWith('/login');
  const isLogoutPage = pathname.startsWith('/logout');
  const isAuthPage = isLoginPage || isLogoutPage;

  const isArtistPage = pathname.startsWith('/artist');
  const isDetailPage = pathname.startsWith('/detail');
  const isMyOrderPage = pathname.startsWith('/my/order');
  const isMyReviewWritePage = pathname.startsWith('/my/review/write');
  const isMyReviewPage = pathname.startsWith('/my/review') && !isMyReviewWritePage;
  const isMyPage = pathname.startsWith('/my') && !isMyOrderPage && !isMyReviewWritePage && !isMyReviewPage;
  const isOrderPage = pathname.startsWith('/order');
  const isOrderCompletePage = pathname.startsWith('/order/complete');
  const isReviewPage = pathname.includes('/review') && !isMyReviewWritePage && !isMyReviewPage;
  const isShopPage = pathname.startsWith('/shop');
  const isCartPage = pathname.startsWith('/cart');

  const isBack =
    isArtistPage ||
    isDetailPage ||
    isMyPage ||
    isOrderPage ||
    isReviewPage ||
    isMyReviewPage ||
    isMyReviewWritePage ||
    isMyOrderPage ||
    isCartPage;

  const reviewMode = searchParams.get('mode');
  const orderId = searchParams.get('id');

  const isMyOrderDetailPage = isMyOrderPage && orderId !== null;

  const EmptyDiv = () => <div className="h-7.5 w-7.5" />;

  const LeftIcon = () => {
    if (isAuthPage || isOrderCompletePage || isMyOrderDetailPage) return <EmptyDiv />;
    else if (isBack) return <BackButton />;
    else return <HamburgerButton />;
  };

  const CenterText = () => {
    if (isAuthPage || isArtistPage || isOrderCompletePage) return null;
    else if (isOrderPage) return <span className="text-subhead text-grey-9 font-medium">주문/결제</span>;
    else if (isReviewPage)
      return (
        <span className="text-subhead text-grey-9 font-medium">
          {reviewMode == null ? '리뷰 전체보기' : '모아보기'}
        </span>
      );
    else if (isMyPage) return <span className="text-subhead text-grey-9 font-medium">마이페이지</span>;
    else if (isMyOrderPage && !isMyOrderDetailPage)
      return <span className="text-subhead text-grey-9 font-medium">주문 내역 조회</span>;
    else if (isMyOrderDetailPage) return <span className="text-subhead text-grey-9 font-medium">주문 상세</span>;
    else if (isMyReviewWritePage) return <span className="text-subhead text-grey-9 font-medium">리뷰 작성</span>;
    else if (isMyReviewPage) return <span className="text-subhead text-grey-9 font-medium">리뷰</span>;
    else if (isCartPage) return <span className="text-subhead text-grey-9 font-medium">장바구니</span>;
    else
      return (
        <Link href="/">
          <PromesaTextSmallIcon className="text-black" />
        </Link>
      );
  };

  const RightHeader = () => {
    const FirstIcon = () =>
      isShopPage ? (
        <Link href="/search">
          <SearchIcon className="text-grey-9" />
        </Link>
      ) : (
        <EmptyDiv />
      );
    const SecondIcon = () =>
      isAuthPage || isMyPage || isOrderPage || isMyOrderPage || isMyReviewWritePage || isMyReviewPage || isCartPage ? (
        <EmptyDiv />
      ) : (
        <Link href="/my">
          <MyIcon className="text-grey-9" />
        </Link>
      );
    const ThirdIcon = () => {
      if (isLoginPage || isMyOrderDetailPage)
        return (
          <button
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.replace('/');
              }
            }}
            className="flex cursor-pointer items-center justify-center"
          >
            <CloseIcon width={30} height={30} className="text-grey-9" />
          </button>
        );
      else if (
        isLogoutPage ||
        isOrderPage ||
        (isMyOrderPage && !isMyOrderDetailPage) ||
        isMyReviewWritePage ||
        isCartPage
      )
        return <EmptyDiv />;
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

  // search page
  const isSearchPage = pathname.startsWith('/search');
  if (isSearchPage)
    return (
      <header className={clsx('bg-pale-green fixed-component top-0 flex w-full px-5 py-2', shadow && 'home-shadow')}>
        <SearchHeader />
      </header>
    );

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
