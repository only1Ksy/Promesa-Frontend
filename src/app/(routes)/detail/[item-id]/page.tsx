import Image from 'next/image';

export default function Detail() {
  return (
    <div>
      {/* 메인 이미지 */}
      <div className="bg-deep-green mb-5 flex h-96 w-full flex-col items-start justify-center gap-[10px]">
        <Image alt="product detail imageß" src={''}></Image>
      </div>
      <div className="flex flex-col items-start gap-10 self-stretch pb-29.5">
        {/* 상단 상품 정보 */}
        <div className="flex h-109.5 w-full flex-col items-start gap-5">
          {/* 카테고리, 상품명, 리뷰, 가격*/}
          <div className="flex flex-col items-start gap-[13px] self-stretch px-5">
            {/* 카테고리, 상품명, 리뷰 */}
            <div className="flex flex-col items-start gap-1 self-stretch">
              <div className="flex flex-col items-start gap-2 self-stretch">
                <span>잔 / 높은 잔</span>
                <span>빈티지 블랙 높은 잔 세트</span>
              </div>
              <div className="flex items-center gap-2">
                <span>4건 리뷰보기</span>
              </div>
            </div>
            {/* 가격 */}
            <div className="flex flex-col items-start justify-center">
              <span>54,000원</span>
            </div>
          </div>
          {/* 배송 정보 */}
          <div className="border-green mx-5 flex items-start gap-1 self-stretch border p-4">
            <span>배송비</span>
            <div className="flex flex-col">
              <span>3000원</span>
              <span>70.000원 이상 구매 시 무료배송</span>
              <span>제주/도서산간 3,000원 추가</span>
            </div>
          </div>
          {/* 아티스트 페이지 바로가기 */}
          <div className="relative flex h-19 w-full flex-col items-start gap-[10px] px-5">
            <Image alt="product detail page artist image" src={''}></Image>
            <div className="absolute flex h-19 w-90.5 items-center justify-between self-stretch px-5">
              <div className="flex items-start gap-4">
                <div className="flex flex-col">
                  <span>박아름</span>
                  <span>Artist</span>
                </div>
                <div>/</div>
              </div>
              <div className="flex flex-col">
                <span>북마크</span>
                <span>28</span>
              </div>
            </div>
          </div>
          {/* 장바구니, 구매하기 버튼 */}
          <div className="flex w-full items-center justify-center gap-2 px-5 py-2">
            <button className="border-grey-9 flex h-12 w-59 items-center justify-center gap-[10px] border-[1.4px]">
              장바구니
            </button>
            <button className="bg-grey-9 text-grey-1 flex h-12 w-full items-center justify-center gap-[10px]">
              구매하기
            </button>
          </div>
        </div>
        {/* 하단 상세 페이지 */}
        <div></div>
      </div>
    </div>
  );
}
