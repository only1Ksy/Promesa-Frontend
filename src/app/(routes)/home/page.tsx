import Link from 'next/link';

import ExhibitionSwiper from '@/components/features/home/exhibition-swiper';
import MainSwiper from '@/components/features/home/main-swiper';
import ShopSwiper from '@/components/features/home/shop-swiper';
import { INTRODUCTION_LINE_LIST } from '@/lib/constants/business-information';
import LinkIcon from '@/public/icons/common/link.svg';
import PromesaMainIcon from '@/public/icons/logo/main.svg';
import PromesaTextLargeIcon from '@/public/icons/logo/text-lg.svg';
import PromesaTextMediumIcon from '@/public/icons/logo/text-md.svg';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 상단 배너 */}
      <div
        className="flex h-[450px] flex-col items-center justify-center gap-15 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/images/home-background.png')" }}
      >
        <div className="flex flex-col gap-3">
          <PromesaMainIcon className="text-grey-1" />
          <PromesaTextLargeIcon className="text-grey-1" />
        </div>
        <Link href="/shop?categoryId=&sort=price,DESC">
          <div className="text-body-02 font-regular text-grey-1 border-grey-1 hover:bg-grey-1 hover:text-grey-6 flex h-8 w-35 items-center justify-center rounded-[10rem] border-[1.2px] backdrop-blur-[2.35px] transition duration-200">
            <p>둘러보기</p>
          </div>
        </Link>
      </div>
      {/* 둘러보기 */}
      <div className="my-12.5">
        <MainSwiper />
      </div>
      {/* 소개 */}
      <div className="mt-2.5 mb-27.5 flex flex-col gap-8">
        <div className="text-body-02 font-regular text-grey-9 flex flex-col items-center gap-1">
          <p>About</p>
          <PromesaTextMediumIcon className="text-black" />
        </div>
        <p className="text-caption-01 text-center font-medium text-black">
          {INTRODUCTION_LINE_LIST.map((line, idx) => (
            <span key={`introduction-${idx}`}>
              {line}
              {idx < INTRODUCTION_LINE_LIST.length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
      {/* 기획전 */}
      <div className="mb-20 flex flex-col gap-3">
        <div className="mx-5 flex items-center justify-between">
          <p className="text-subhead font-medium text-black">PROMESA 기획전</p>
          <Link href="/exhibitions">
            <div className="flex items-center gap-2">
              <p className="text-caption-01 text-grey-6 font-medium">목록 보기</p>
              <LinkIcon className="text-grey-6" />
            </div>
          </Link>
        </div>
        <div className="ml-5">
          <ExhibitionSwiper />
        </div>
      </div>
      {/* 인기순 정렬 */}
      <div className="mb-14 flex flex-col gap-3">
        <div className="mx-5 flex items-center justify-between">
          <p className="text-subhead font-medium text-black">Now Popular</p>
          <Link href="/shop?categoryId=&sort=wishCount,DESC">
            <div className="flex items-center gap-2">
              <p className="text-caption-01 text-grey-6 font-medium">목록 보기</p>
              <LinkIcon className="text-grey-6" />
            </div>
          </Link>
        </div>
        <div className="ml-5">
          <ShopSwiper />
        </div>
      </div>
    </div>
  );
}
