'use client';

import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import Link from 'next/link';

import { BottomFixedBarTargetContext } from '@/lib/utils/portal-target-context';
import KakaoIcon from '@/public/icons/layout/kakao.svg';
import ScrollToTopIcon from '@/public/icons/layout/scroll-to-top.svg';

export default function FloatingButton() {
  const bottomFixedBarRef = useContext(BottomFixedBarTargetContext);
  const [bottomHeight, setBottomHeight] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // dynamic height control
  useLayoutEffect(() => {
    if (!bottomFixedBarRef?.current) return;

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    const update = () => {
      const height = (bottomFixedBarRef.current!.getBoundingClientRect().height + 12) / rootFontSize;
      setBottomHeight(height);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(bottomFixedBarRef.current);

    return () => ro.disconnect();
  }, [bottomFixedBarRef]);

  // show-scroll-to-top
  useEffect(() => {
    const onScroll = () => setShowScrollToTop(window.scrollY > 10);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return !bottomFixedBarRef ? (
    <div className="fixed-component pointer-events-none bottom-10 flex justify-end px-5">
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="bg-pale-green border-grey-5 pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1.333px] py-3"
        >
          <ScrollToTopIcon className="text-grey-8" />
        </button>
      )}
    </div>
  ) : (
    <div className="fixed-component pointer-events-none flex justify-end px-5" style={{ bottom: `${bottomHeight}rem` }}>
      <div className="flex flex-col items-center gap-3">
        <Link href="https://www.kakaocorp.com/" target="_blank" rel="noopener noreferrer">
          <button className="bg-pale-green border-grey-5 text-grey-8 pointer-events-auto flex h-max w-max cursor-pointer flex-col items-center gap-0.5 rounded-[20px] border-[1.4px] p-3">
            <KakaoIcon />
            <span className="text-caption-02 font-medium">문의하기</span>
          </button>
        </Link>
        {showScrollToTop && (
          <button
            onClick={scrollToTop}
            className="bg-pale-green border-grey-5 pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1.333px] py-3"
          >
            <ScrollToTopIcon className="text-grey-8" />
          </button>
        )}
      </div>
    </div>
  );
}
