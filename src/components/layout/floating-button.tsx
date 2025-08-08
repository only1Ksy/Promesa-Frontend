'use client';

import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { BottomFixedBarTargetContext } from '@/lib/utils/portal-target-context';
import KakaoIcon from '@/public/icons/layout/kakao.svg';
import ScrollToTopIcon from '@/public/icons/layout/scroll-to-top.svg';

export default function FloatingButton() {
  const bottomFixedBarRef = useContext(BottomFixedBarTargetContext);
  const [bottomHeight, setBottomHeight] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [delayedShow, setDelayedShow] = useState(false);

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

  // show scroll-to-top
  useEffect(() => {
    const onScroll = () => setShowScrollToTop(window.scrollY > 10);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // show delayed scroll-to-top
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const shouldDelay = bottomFixedBarRef && showScrollToTop;

    if (shouldDelay) {
      timer = setTimeout(() => setDelayedShow(true), 300); // 300 ms
    } else {
      setDelayedShow(false);
    }

    return () => clearTimeout(timer);
  }, [bottomFixedBarRef, showScrollToTop]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return !bottomFixedBarRef ? (
    showScrollToTop && (
      <div className="fixed-component pointer-events-none bottom-10 flex justify-end px-5">
        <button
          onClick={scrollToTop}
          className="bg-pale-green border-grey-5 pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1.333px] py-3"
        >
          <ScrollToTopIcon className="text-grey-8" />
        </button>
      </div>
    )
  ) : (
    <div className="fixed-component pointer-events-none flex justify-end px-5" style={{ bottom: `${bottomHeight}rem` }}>
      <div className="relative w-fit">
        <Link href="https://pf.kakao.com/_IucNn/chat" target="_blank" rel="noopener noreferrer">
          <div
            className={clsx(
              'bg-pale-green border-grey-5 text-grey-8 pointer-events-auto flex flex-col items-center justify-center gap-0.5 rounded-[20px] border-[1.4px] p-3',
              'transition-transform duration-400 ease-in-out', // 400 ms
              showScrollToTop ? '-translate-y-11' : '',
            )}
          >
            <KakaoIcon />
            <span className="text-caption-02 font-medium">문의하기</span>
          </div>
        </Link>
        {delayedShow && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <button
              onClick={scrollToTop}
              className="bg-pale-green border-grey-5 pointer-events-auto flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1.333px] py-3"
            >
              <ScrollToTopIcon className="text-grey-8" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
