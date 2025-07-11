'use client';

import { useEffect, useRef } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import FloatingButton from '@/components/layout/floating-button';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { BottomFixedBarTargetContext } from '@/lib/utils/portal-target-context';

export default function ClientRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isDetailPage = pathName.startsWith('/detail/');
  const isReviewPage = pathName.startsWith('/review/');
  const isOrderPage = pathName.startsWith('/order/');
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const isFetching = useIsFetching();
  const FetchingSpinner = dynamic(() => import('@/components/layout/fetching-spinner'), { ssr: false });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isFetching > 0 && <FetchingSpinner />}

      {isReviewPage || isOrderPage ? (
        <>
          <Header />
          <div className="mt-11.5">{children}</div>
        </>
      ) : isDetailPage ? (
        <BottomFixedBarTargetContext.Provider value={bottomBarRef}>
          <div ref={bottomBarRef} className="fixed-component bottom-0" />
          <Header />
          <div className="mt-11.5">{children}</div>
          <div className="pb-21">
            <Footer />
          </div>
          <FloatingButton />
        </BottomFixedBarTargetContext.Provider>
      ) : (
        <>
          <Header />
          <div className="mt-11.5">{children}</div>
          <Footer />
          <FloatingButton />
        </>
      )}
    </>
  );
}
