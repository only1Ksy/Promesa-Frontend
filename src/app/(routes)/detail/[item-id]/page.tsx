import Image from 'next/image';

export default function Detail() {
  return (
    <div>
      {/* 메인 이미지 */}
      <div className="bg-deep-green mb-5 flex h-96 w-full flex-col items-start justify-center gap-[10px]">
        <Image alt="product detail imageß" src={''} />
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
            <Image alt="product detail page artist image" src={''} />
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
        <div>
          {/* 이동 바 */}
          <div className="border-grey-2 flex h-12 w-full items-start border-t">
            <div className="flex w-33.5 flex-col items-center gap-2 pt-3">
              <span>상품정보</span>
            </div>
            <div className="flex w-33.5 flex-col items-center gap-2 pt-3">
              <span>안내사항</span>
            </div>
            <div className="flex w-33.5 flex-col items-center gap-2 pt-3">
              <span>리뷰</span>
            </div>
          </div>
          {/* 상품 정보 */}
          <div className="flex w-full flex-col items-start">
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
          </div>
          {/* 안내사항 */}
          <div className="flex flex-col items-start gap-3 self-stretch px-5 py-10">
            <div className="flex items-center gap-4">
              <span className="w-20">배송안내</span>
              <span>1102942397492387</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 shrink-0">구매시 주의사항</span>
              <div className="flex flex-col items-start">
                <span>
                  1. 모든 제품은 수작업 공정으로 제작되어 색상, 형태, 크기에 미세한 차이가 있을 수 있습니다. 이는 불량이
                  아닌 자연스러운 제작 특성입니다.
                </span>
                <span>
                  1. 모든 제품은 수작업 공정으로 제작되어 색상, 형태, 크기에 미세한 차이가 있을 수 있습니다. 이는 불량이
                  아닌 자연스러운 제작 특성입니다.
                </span>
                <span>
                  1. 모든 제품은 수작업 공정으로 제작되어 색상, 형태, 크기에 미세한 차이가 있을 수 있습니다. 이는 불량이
                  아닌 자연스러운 제작 특성입니다.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 shrink-0">사용시 주의사항</span>
              <div className="flex flex-col items-start">
                <span>
                  강한 충격에 파손될 수 있으니 주의해 주세요/급격한 온도 변화는 균열의 원인이 될 수 있습니다/전자레인지,
                  오븐, 식기세척기 사용 가능 여부는 제품 설명을 확인해 주세요.
                </span>
                <span>세척 시 부드러운 스펀지 사용을 권장드립니다.</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-20 shrink-0">교환/환불 안내</span>
              <div className="flex flex-col items-start">
                <span>
                  단순 변심에 의한 교환/환불은 제품 미사용 상태에 한해 가능하며, 왕복 배송비는 고객 부담입니다.
                </span>
                <span>다음의 경우 교환/환불이 어렵습니다:</span>
                <ul>
                  <li>ㆍ사용 흔적이 있는 경우</li>
                  <li>ㆍ고의 또는 부주의로 인한 파손/손상</li>
                  <li>ㆍ제품 수령 후 2일이 지난 경우</li>
                </ul>
              </div>
            </div>
          </div>
          {/* 리뷰 */}
        </div>
      </div>
    </div>
  );
}
