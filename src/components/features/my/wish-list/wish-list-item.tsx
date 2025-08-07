import Link from 'next/link';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import type { WishResponseSchema } from '@/types/wish-controller';

interface WishListItemProps {
  item: WishResponseSchema;
  isSelected: boolean;
  select: () => void;
}

export default function WishListItem({ item, isSelected, select }: WishListItemProps) {
  return (
    <div className="flex h-31.25 w-full gap-3">
      <div className="mt-1 flex items-start">
        <button onClick={select} className="cursor-pointer">
          {isSelected ? (
            <div className="bg-grey-5 h-5 w-5 rounded-full" />
          ) : (
            <div className="border-grey-5 h-5 w-5 rounded-full border" />
          )}
        </button>
      </div>
      <Link href={`/detail/${item.targetId}`}>
        <div className="flex h-full gap-3.5">
          <div className="bg-green relative aspect-[4/5]">
            <ImageWithEffect
              src={item.thumbnailUrl}
              alt={`아이템 ${item.targetId} 프리뷰 이미지.`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              <p className="text-body-02 text-grey-9 custom-break-words font-medium">{item.title}</p>
              <p className="text-caption-01 text-grey-6 font-medium">{item.artistName}</p>
            </div>
            <p className="text-body-02 font-regular text-grey-9">{`${item.price.toLocaleString()}원`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
