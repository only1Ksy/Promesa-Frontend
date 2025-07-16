'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import PromesaMainSymbolIcon from '@/public/icons/logo/main-symbol.svg';
import PromesaTextLargeIcon from '@/public/icons/logo/text-lg.svg';

export default function HomeBackground() {
  // strict hover handling
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    const prevBg = el.style.background;
    const prevColor = el.style.color;

    el.style.setProperty('background', 'inherit', 'important');
    el.style.setProperty('color', 'inherit', 'important');

    requestAnimationFrame(() => {
      if (prevBg) el.style.setProperty('background', prevBg);
      else el.style.removeProperty('background');

      if (prevColor) el.style.setProperty('color', prevColor);
      else el.style.removeProperty('color');
    });
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
          ref={linkRef}
          className={clsx(
            'text-body-02 font-regular text-grey-1 border-grey-1 z-3 transition-colors duration-200',
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
