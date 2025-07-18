'use client';

import clsx from 'clsx';
import Link from 'next/link';

import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import PromesaMainSymbolIcon from '@/public/icons/logo/main-symbol.svg';
import PromesaTextLargeIcon from '@/public/icons/logo/text-lg.svg';

export default function HomeBackground() {
  return (
    <div className="fixed-component no-z-index bg-green top-11.5 flex h-112.5 flex-col items-center justify-center gap-15">
      <ImageWithLoading src="/images/home-background.png" alt="프로메사 홈 페이지의 배경 이미지." fill priority />
      <div className="z-3 flex flex-col gap-3">
        <PromesaMainSymbolIcon className="text-grey-1" />
        <PromesaTextLargeIcon className="text-grey-1" />
      </div>
      <Link href="/shop">
        <div
          className={clsx(
            'text-body-02 font-regular text-grey-1 border-grey-1 relative z-5 bg-grey-1/5 transition-colors duration-200',
            'only-hover:bg-grey-1 only-hover:text-grey-6 active:bg-grey-1 active:text-grey-6',
            'flex h-8 w-35 items-center justify-center rounded-[40px] border-[1.2px]',
          )}
        >
          <span>제품 둘러보기</span>
        </div>
      </Link>
    </div>
  );
}
