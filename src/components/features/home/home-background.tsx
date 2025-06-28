import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import PromesaMainSymbolIcon from '@/public/icons/logo/main-symbol.svg';
import PromesaTextLargeIcon from '@/public/icons/logo/text-lg.svg';

export default function HomeBackground() {
  return (
    <div className="fixed-component no-z-index bg-green top-11.5 flex h-112.5 flex-col items-center justify-center gap-15">
      <Image src="/images/home-background.png" alt="프로메사 홈 페이지의 배경 이미지." fill priority />
      <div className="z-3 flex flex-col gap-3">
        <PromesaMainSymbolIcon className="text-grey-1" />
        <PromesaTextLargeIcon className="text-grey-1" />
      </div>
      <Link href="/shop">
        <div
          className={clsx(
            'text-body-02 font-regular text-grey-1 border-grey-1 hover:bg-grey-1 hover:text-grey-6 z-3 transition-colors duration-200',
            'flex h-8 w-35 items-center justify-center rounded-[40px] border-[1.2px] backdrop-blur-[2.35px]',
          )}
        >
          <span>둘러보기</span>
        </div>
      </Link>
    </div>
  );
}
