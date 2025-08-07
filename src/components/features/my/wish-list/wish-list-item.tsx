import clsx from 'clsx';
import Link from 'next/link';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import CheckIcon from '@/public/icons/my/check.svg';
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
          <div
            className={clsx(
              'flex h-5 w-5 items-center justify-center rounded-full border',
              isSelected ? 'border-grey-9' : 'border-grey-5',
            )}
          >
            {isSelected && <CheckIcon className="text-grey-9" />}
          </div>
        </button>
      </div>
      <Link href={`/detail/${item.targetId}`}>
        <div className="flex h-31.25 gap-3.5">
          <div className="bg-green relative aspect-[4/5] w-full">
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
            <p className="text-body-02 font-regular text-grey-9">{`${item.price.toLocaleString('ko-KR')}원`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
