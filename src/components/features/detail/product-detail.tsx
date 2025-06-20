import Image from 'next/image';

export default function ProductDetail() {
  return (
    <>
      {/* 상세 정보 */}
      <div className="flex flex-col items-start gap-2 self-stretch px-5 py-8">
        <div className="flex items-center gap-4">
          <span className="w-8">품번</span>
          <span>11029292929292929</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-8">종류</span>
          <span>높은 잔</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-8">사이즈</span>
          <span>20x40x40cm</span>
        </div>
        {/* 상세 이미지 */}
        <div className="w-full">
          <Image alt="product detail page detail image" src={''} />
        </div>
      </div>
    </>
  );
}
