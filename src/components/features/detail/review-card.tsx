import Image from 'next/image';

export default function ReviewCard() {
  return (
    <div className="flex w-full flex-col items-start gap-4 px-6">
      {/* 닉네임, 별점, 날짜 */}
      <div className="flex items-start justify-between self-stretch">
        <div className="flex w-53 items-start gap-2">
          <span>닉네임</span>
          <span>별점 ...</span>
        </div>
        <span>2025.06.20</span>
      </div>
      {/* 사진, 코멘트 */}
      <div className="flex flex-col items-start gap-5 self-stretch">
        <div className="bg-green h-29 w-[115px]">
          <Image alt="review image" src={''} />
        </div>
        <div>너므기여워요너무귀여워용</div>
      </div>
    </div>
  );
}
