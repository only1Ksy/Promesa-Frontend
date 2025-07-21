'use client';

import ImageWithLoading from '@/components/common/utilities/image-with-loading';

export default function HomeExhibitionsBackground() {
  return (
    <div className="relative h-114 w-full overflow-hidden">
      <ImageWithLoading
        src="/images/home-exhibitions-background.png"
        alt="프로메사 전시회 홈 페이지의 메인 이미지"
        fill
        priority
      />
      <div className="absolute z-5 h-full w-full bg-gradient-to-b from-[#000000]/0 from-20% to-[#000000] to-100%" />
      <div className="absolute bottom-15 z-10 mx-12 flex flex-col gap-2.5">
        <p className="text-headline-03 text-grey-1 mx-1">느린 아침을 위한 머그</p>
        <p className="text-body-01 text-grey-4 font-medium">핸드메이드 도자기와 함께 여유로운 아침을 즐겨 보세요</p>
      </div>
    </div>
  );
}
