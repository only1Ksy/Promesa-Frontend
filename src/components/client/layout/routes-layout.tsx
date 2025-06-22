'use client';

import { useRef } from 'react';
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
  const bottomBarRef = useRef<HTMLDivElement>(null);

  return !isDetailPage ? (
    <>
      <Header />
      <div className="mt-11.5">{children}</div>
      <Footer />
      <FloatingButton />
    </>
  ) : (
    <BottomFixedBarTargetContext.Provider value={bottomBarRef}>
      <Header />
      <div className="mt-11.5">{children}</div>
      <div className="mb-21">
        <Footer />
      </div>
      <FloatingButton />
      <div ref={bottomBarRef} className="fixed-component bottom-0"></div>
    </BottomFixedBarTargetContext.Provider>
  );
}
