'use client';

import { useEffect, useRef } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import FloatingButton from '@/components/layout/floating-button';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { BottomFixedBarTargetContext } from '@/lib/utils/portal-target-context';

interface ClientRoutesLayoutProps {
  dehydratedState: DehydratedState;
  children: React.ReactNode;
}

export default function ClientRoutesLayout({ dehydratedState, children }: ClientRoutesLayoutProps) {
  const pathName = usePathname();
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const isDetailPage = pathName.startsWith('/detail');
  const isOrderPage = pathName.startsWith('/order');
  const isOrderCompletePage = pathName.startsWith('/order/complete');
  const isReviewPage = pathName.startsWith('/review');

  const isBottomBarRef = isDetailPage || isOrderPage || isReviewPage;
  const isHeaderShadow = !isDetailPage && !isOrderCompletePage;
  const isFooter = !isOrderPage && !isReviewPage;
  const isFloatingButton = !isOrderPage && !isReviewPage;

  const isFetching = useIsFetching();
  const FetchingSpinner = dynamic(() => import('@/components/layout/fetching-spinner'), { ssr: false });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <HydrationBoundary state={dehydratedState}>
      {isFetching > 0 && <FetchingSpinner />}
      <BottomFixedBarTargetContext.Provider value={isBottomBarRef ? bottomBarRef : null}>
        {isBottomBarRef && <div ref={bottomBarRef} className="fixed-component bottom-0" />}
        <Header shadow={isHeaderShadow} />
        <div className="bg-pale-green pt-11.5">{children}</div>
        {isFooter && isBottomBarRef ? (
          // need to refactor
          <div className="pb-21">
            <Footer />
          </div>
        ) : (
          <Footer />
        )}
        {isFloatingButton && <FloatingButton />}
      </BottomFixedBarTargetContext.Provider>
    </HydrationBoundary>
  );
}
