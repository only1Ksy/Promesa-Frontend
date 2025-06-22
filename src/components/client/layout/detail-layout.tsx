'use client';

import { useEffect, useRef } from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ScrollToTopIcon from '@/public/icons/layout/scroll-to-top.svg';
import KakaoIcon from '@/public/icons/layout/kakao.svg';

export default function ClientDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current = document.getElementById('frame') as HTMLDivElement;
  }, []);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-pale-green fixed top-0 left-1/2 z-900 w-full max-w-[var(--frame-width)] -translate-x-1/2">
        <Header />
      </div>
      <div className="mt-11.5">{children}</div>
      <div className="mb-18">
        <Footer />
      </div>

      {/* 스크롤 투 탑 버튼 */}
      <div className="fixed bottom-40 left-1/2 z-900 w-full max-w-[var(--frame-width)] -translate-x-1/2">
        <div className="flex justify-end px-[25px]">
          <div className="flex w-12 justify-center">
            <button
              onClick={scrollToTop}
              className="bg-pale-green border-deep-green flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1.333px] py-3"
            >
              <ScrollToTopIcon className="text-grey-8" />
            </button>
          </div>
        </div>
      </div>

      {/* 카카오 아이콘 */}
      <div className="fixed bottom-20 left-1/2 z-800 w-full max-w-[var(--frame-width)] -translate-x-1/2">
        <div className="flex justify-end px-5">
          <KakaoIcon className="cursor-pointer" />
        </div>
      </div>
    </>
  );
}
