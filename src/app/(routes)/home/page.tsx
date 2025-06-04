import Link from 'next/link';

import MainSwiper from '@/components/features/home/main-swiper';
import ShopSwiper from '@/components/features/home/shop-swiper';
import SpecialSwiper from '@/components/features/home/special-swiper';
import LogoIcon from '@/public/icons/default/logo.svg';
import PromesaGreyIcon from '@/public/icons/default/promesa-grey-900.svg';
import PromesaWhiteIcon from '@/public/icons/default/promesa-white.svg';
import LinkIcon from '@/public/icons/home/link.svg';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 상단 배너 */}
      <div className="bg-grey-500 flex h-[450px] flex-col items-center justify-center gap-15">
        <div className="flex flex-col gap-3.25 text-white">
          <LogoIcon />
          <PromesaWhiteIcon />
        </div>
        <Link href="/shop">
          <div className="text-body-02 font-regular text-pale-green border-pale-green flex h-8 w-35 items-center justify-center rounded-[40px] border-[1.2px] backdrop-blur-[2.35px]">
            <p className="">둘러보기</p>
          </div>
        </Link>
      </div>
      {/* 둘러보기 */}
      <div className="my-12.5">
        <MainSwiper />
      </div>
      {/* 소개 */}
      <div className="mt-2.5 mb-27.5 flex flex-col gap-8">
        <div className="text-body-02 font-regular text-grey-900 flex flex-col items-center gap-1">
          <p>About</p>
          <PromesaGreyIcon />
        </div>
        <p className="text-caption-01 text-center font-medium text-black">
          팀 프로메사는 아직 주목받지 못한 신예 작가들을 발굴하고
          <br />
          플랫폼을 통해 작품의 전시와 거래를 돕습니다.
          <br />
          <br />
          도예를 전공하는 학생, 작품은 있지만 판매에 미숙한 작가,
          <br />
          유일무이한 오브제로 일상에 가치를 더하고 싶은 소비자까지.
          <br />
          저희 프로메사는 도예를 사랑하는 모두를 위해
          <br />
          열정을 다하겠습니다.
        </p>
      </div>
      {/* 기획전 */}
      <div className="gap- mb-20 flex flex-col gap-3">
        <div className="mx-5 flex items-center justify-between">
          <p className="text-subhead font-medium text-black">PROMESA 기획전</p>
          <Link href="/special">
            <div className="flex items-center gap-2">
              <p className="text-caption-01 text-grey-600 font-medium">목록 보기</p>
              <LinkIcon className="text-grey-600" />
            </div>
          </Link>
        </div>
        <div className="ml-5">
          <SpecialSwiper />
        </div>
      </div>
      {/* 인기순 정렬 */}
      <div className="gap- mb-20 flex flex-col gap-3">
        <div className="mx-5 flex items-center justify-between">
          <p className="text-subhead font-medium text-black">Now Popular</p>
          <Link href="/shop">
            <div className="flex items-center gap-2">
              <p className="text-caption-01 text-grey-600 font-medium">목록 보기</p>
              <LinkIcon className="text-grey-600" />
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
