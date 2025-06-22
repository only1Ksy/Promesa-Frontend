'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ScrollToTopIcon from '@/public/icons/layout/scroll-to-top.svg';

export default function ClientRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current = document.getElementById('frame') as HTMLDivElement;
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDetailPage = pathname?.startsWith('/detail/');

  return (
    <>
      <div className="bg-pale-green fixed top-0 left-1/2 z-900 w-full max-w-[var(--frame-width)] -translate-x-1/2">
        <Header />
      </div>

      <div className="mt-11.5">{children}</div>
      {!isDetailPage && (
        <>
          <Footer />
          <div className="fixed bottom-10 left-1/2 z-900 flex w-full max-w-[var(--frame-width)] -translate-x-1/2 justify-end px-5">
            <button
              onClick={scrollToTop}
              className="bg-pale-green border-deep-green flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1.333px] py-3"
            >
              <ScrollToTopIcon className="text-grey-8" />
            </button>
          </div>
        </>
      )}
    </>
  );
}
