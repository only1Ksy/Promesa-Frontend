'use client';

import { useEffect, useRef, useState } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { usePathname, useSearchParams } from 'next/navigation';

import { AlertProvider } from '@/components/common/alert/alert-provider';
import { ToastProvider } from '@/components/common/alert/toast-provider';
import FloatingButton from '@/components/layout/floating-button';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useAccessTokenStore } from '@/lib/store/use-access-token-store';
import { useImageLoadingStore } from '@/lib/store/use-image-loading-store';
import { BottomFixedBarTargetContext } from '@/lib/utils/portal-target-context';

interface ClientRoutesLayoutProps {
  children: React.ReactNode;
}

export default function ClientRoutesLayout({ children }: ClientRoutesLayoutProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  const isCartPage = pathname.startsWith('/cart');
  const isDetailPage = pathname.startsWith('/detail');
  const isOrderCompletePage = pathname.startsWith('/order/complete');
  const isOrderPage = pathname.startsWith('/order');
  const isReviewPage = pathname.startsWith('/review') || pathname.startsWith('/my/review/write');
  const isMyPage = pathname.startsWith('/my');
  const isMyReviewPage = pathname.startsWith('/my/review');
  const isMyOrderPage = pathname.startsWith('/my/order');
  const isSearchPage = pathname.startsWith('/search');
  const isMyReviewEditPage = isMyReviewPage && searchParams.get('editId') !== null;
  const isMyProfilePage = pathname.startsWith('/my/profile');
  const isMyWishListPage = pathname.startsWith('/my/wish-list');

  const isBottomBarRef = isDetailPage || isOrderPage || isReviewPage || isCartPage || isMyReviewEditPage;
  const isHeaderShadow =
    !isDetailPage &&
    !isOrderCompletePage &&
    !isMyOrderPage &&
    !isMyReviewPage &&
    !isCartPage &&
    !isSearchPage &&
    !isMyProfilePage;
  const isFooter =
    !isOrderPage &&
    !isReviewPage &&
    !isMyReviewPage &&
    !isMyOrderPage &&
    !isMyProfilePage &&
    !isCartPage &&
    !isMyWishListPage;
  const isFloatingButton = !isOrderPage && !isReviewPage && !isMyPage && !isCartPage;

  const loadingCount = useImageLoadingStore((s) => s.loadingCount);
  const isFetching = useIsFetching();
  const FetchingSpinner = dynamic(() => import('@/components/layout/fetching-spinner'), { ssr: false });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }, []);

  // hydration error
  const queryClient = useQueryClient();
  const tokenReadyRef = useRef(false);
  const accessToken = useAccessTokenStore((s) => s.accessToken);
  useEffect(() => {
    if (tokenReadyRef.current || !accessToken) return;
    tokenReadyRef.current = true;
    queryClient
      .getQueryCache()
      .findAll()
      .forEach((query) => queryClient.invalidateQueries({ queryKey: query.queryKey }));
  }, [accessToken, queryClient]);

  // scroll-to-top when history back
  useEffect(() => {
    const handlePopState = () => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <AlertProvider>
      <ToastProvider>
        {hasMounted && (loadingCount > 0 || isFetching > 0) && <FetchingSpinner />}
        <BottomFixedBarTargetContext.Provider value={isBottomBarRef ? bottomBarRef : null}>
          {isBottomBarRef && <div ref={bottomBarRef} className="fixed-component bottom-0" />}
          <Header shadow={isHeaderShadow} />
          <div className="bg-pale-green pt-11.5">{children}</div>
          {isFooter && isBottomBarRef ? (
            // need to refactor
            <div className="pb-21">
              <Footer />
            </div>
          ) : isFooter ? (
            <Footer />
          ) : (
            <></>
          )}
          {isFloatingButton && <FloatingButton />}
        </BottomFixedBarTargetContext.Provider>
      </ToastProvider>
    </AlertProvider>
  );
}
