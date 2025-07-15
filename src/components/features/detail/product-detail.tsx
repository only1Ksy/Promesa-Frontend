import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { fetchItemDetail } from '@/services/api/item-controller';

interface ProductDetailProps {
  itemId: number;
}

export default function ProductDetail({ itemId }: ProductDetailProps) {
  const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res,
  });

  if (!item) return null;

  return (
    <div className="flex w-full flex-col items-start">
      {/* 상세 정보 */}
      <div className="text-grey-8 text-caption-01 flex flex-col items-start gap-2 self-stretch px-5 py-8 font-medium">
        <div className="flex items-center gap-4">
          <span className="w-8">품번</span>
          <span>{item.productCode}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-8">종류</span>
          <span>{item.type}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-8">사이즈</span>
          <span>{`${item.width}x${item.height}x${item.depth}`}</span>
        </div>
        {/* 상세 이미지 */}
        <div className="h-100 w-full">
          <Image alt="product detail page detail image" src={''} />
        </div>
      </div>
    </div>
  );
}
