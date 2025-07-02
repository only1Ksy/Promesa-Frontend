import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { fetchItemDetail } from '@/services/api/item';

import ArtistPageButton from './artist-page-button';

interface ProductInformationProps {
  onSelect: (section: 'product' | 'notice' | 'review') => void;
  itemId: number;
}

export default function ProductInformation({ onSelect, itemId }: ProductInformationProps) {
  const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res.data,
  });

  if (!item) return null;

  return (
    <div className="flex w-full flex-col items-start gap-5">
      {/* 카테고리, 상품명, 리뷰, 가격*/}
      <div className="flex flex-col items-start gap-3.25 self-stretch px-5">
        {/* 카테고리, 상품명, 리뷰 */}
        <div className="flex flex-col items-start gap-1 self-stretch">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <Link href="/shop?categoryId=1&sort=wishCount,DESC">
              <span className="text-grey-5 text-body-02 flex items-center">잔</span>
            </Link>
            <span className="text-grey-9 text-subhead font-medium">{item.itemName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span onClick={() => onSelect('review')} className="text-grey-6 text-caption-01 cursor-pointer underline">
              리뷰보기
            </span>
          </div>
        </div>
        {/* 가격 */}
        <div className="flex flex-col items-start justify-center">
          <span className="text-grey-9 text-headline-05 font-bold">{item.price.toLocaleString()}원</span>
        </div>
      </div>
      {/* 배송 정보 */}
      <div className="border-green mx-5 flex items-start gap-1 self-stretch border p-4">
        <span className="text-grey-8 text-caption-01 w-15 font-bold">배송비</span>
        <div className="flex flex-col">
          <span className="text-orange text-caption-01 font-bold">3000원</span>
          <span className="text-grey-8 text-caption-01 font-medium">70,000원 이상 구매 시 무료배송</span>
          <span className="text-grey-8 text-caption-01 font-medium">제주/도서산간 3,000원 추가</span>
        </div>
      </div>
      {/* 아티스트 페이지 바로가기 */}
      <ArtistPageButton artistId={item.artistId} />
      {/* 장바구니, 구매하기 버튼 */}
      <div className="flex w-full items-center justify-center gap-2 px-5 py-2">
        <button className="text-grey-9 text-body-01 border-grey-9 flex h-12 w-59 cursor-pointer items-center justify-center gap-[10px] border-[1.4px] font-bold">
          장바구니
        </button>
        <button className="bg-grey-9 text-body-01 text-grey-1 flex h-12 w-full cursor-pointer items-center justify-center gap-[10px] font-bold">
          구매하기
        </button>
      </div>
    </div>
  );
}
