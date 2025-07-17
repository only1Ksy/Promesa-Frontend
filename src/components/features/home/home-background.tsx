'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import PromesaMainSymbolIcon from '@/public/icons/logo/main-symbol.svg';
import PromesaTextLargeIcon from '@/public/icons/logo/text-lg.svg';

export default function HomeBackground() {
  // strict background color handling
  const pathname = usePathname();
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const isTouchRef = useRef<boolean>(false);
  if (typeof window !== 'undefined' && isTouchRef.current === false) {
    isTouchRef.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

  const originalClassRef = useRef<string | null>(null);

  const resetHover = () => {
    if (!isTouchRef.current) return;

    const el = ctaRef.current;
    if (!el) return;

    if (originalClassRef.current == null) {
      originalClassRef.current = el.className;
    }
    const original = originalClassRef.current;

    const active = document.activeElement as HTMLElement | null;
    if (active && active !== document.body) {
      try {
        active.blur();
      } catch {}
    }
    const link = el.parentElement as HTMLElement | null;
    if (link && typeof (link as unknown as HTMLAnchorElement).blur === 'function') {
      try {
        (link as unknown as HTMLAnchorElement).blur();
      } catch {}
    }

    el.className = '';
    void el.offsetHeight;
    el.className = original;

    requestAnimationFrame(() => {
      if (el.className !== original) el.className = original;
    });
  };

  useEffect(() => {
    resetHover();
  }, []);

  useEffect(() => {
    resetHover();
  }, [pathname]);

  useEffect(() => {
    const handler = () => resetHover();
    window.addEventListener('pageshow', handler);
    return () => window.removeEventListener('pageshow', handler);
  }, []);

  return (
    <div className="fixed-component no-z-index bg-green top-11.5 flex h-112.5 flex-col items-center justify-center gap-15">
      <ImageWithLoading src="/images/home-background.png" alt="프로메사 홈 페이지의 배경 이미지." fill priority />
      <div className="z-3 flex flex-col gap-3">
        <PromesaMainSymbolIcon className="text-grey-1" />
        <PromesaTextLargeIcon className="text-grey-1" />
      </div>
      <Link href="/shop">
        <div
          ref={ctaRef}
          className={clsx(
            'text-body-02 font-regular text-grey-1 border-grey-1 bg-transparent transition-colors duration-200',
            'only-hover:bg-grey-1 only-hover:text-grey-6 active:bg-grey-1 active:text-grey-6',
            'flex h-8 w-35 items-center justify-center rounded-[40px] border-[1.2px] backdrop-blur-[2.35px]',
          )}
        >
          <span>제품 둘러보기</span>
        </div>
      </Link>
    </div>
  );
}
