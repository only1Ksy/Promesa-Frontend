import ArtistPageButton from './artist-page-button';
import RightSingle from '@/public/icons/item/page-right-single.svg';
import type { Item } from '@/types/item.dto';
import { useQuery } from '@tanstack/react-query';
import { fetchItemDetail } from '@/services/api/item';

interface ProductInformationProps {
  itemId: Item['itemId'];
}

export default function ProductInformation({ itemId }: ProductInformationProps) {
  const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res.data,
  });

  if (!item) return null;

  return (
    <>
      {/* 카테고리, 상품명, 리뷰, 가격*/}
      <div className="flex flex-col items-start gap-[13px] self-stretch px-5">
        {/* 카테고리, 상품명, 리뷰 */}
        <div className="flex flex-col items-start gap-1 self-stretch">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <span className="text-grey-5 text-body-02 flex items-center">
              잔
              <RightSingle className="text-grey-5" />
              높은 잔
            </span>
            <span className="text-grey-9 text-subhead font-medium">{item.itemName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-grey-6 text-caption-01 underline">4건 리뷰보기</span>
          </div>
        </div>
        {/* 가격 */}
        <div className="flex flex-col items-start justify-center">
          <span className="flex gap-1">
            <span className="text-grey-4 text-subhead font-medium line-through">54,000원</span>
            <span className="text-orange text-subhead font-bold">50%</span>
          </span>
          <span className="text-grey-9 text-headline-05 font-bold">{item.price}원</span>
        </div>
      </div>
      {/* 배송 정보 */}
      <div className="border-green mx-5 flex items-start gap-1 self-stretch border p-4">
        <span className="text-grey-8 text-caption-01 w-15 font-bold">배송비</span>
        <div className="flex flex-col">
          <span className="text-orange text-caption-01 font-bold">3000원</span>
          <span className="text-grey-8 text-caption-01 font-medium">70.000원 이상 구매 시 무료배송</span>
          <span className="text-grey-8 text-caption-01 font-medium">제주/도서산간 3,000원 추가</span>
        </div>
      </div>
      {/* 아티스트 페이지 바로가기 */}
      <ArtistPageButton artistId={item.artistId} />
      {/* 장바구니, 구매하기 버튼 */}
      <div className="flex w-full items-center justify-center gap-2 px-5 py-2">
        <button className="text-grey-9 text-body-01 border-grey-9 flex h-12 w-59 items-center justify-center gap-[10px] border-[1.4px] font-bold">
          장바구니
        </button>
        <button className="bg-grey-9 text-body-01 text-grey-1 flex h-12 w-full items-center justify-center gap-[10px] font-bold">
          구매하기
        </button>
      </div>
    </>
  );
}
