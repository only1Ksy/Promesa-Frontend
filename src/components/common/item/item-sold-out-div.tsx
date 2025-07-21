'use client';

import clsx from 'clsx';

import HeartEmptyIcon from '@/public/icons/item/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/item/heart-filled.svg';
import type { ItemPreviewResponseSchema } from '@/types/item-controller';

import ImageWithEffect from '../utilities/image-with-effect';

interface ItemSoldOutDivProps {
  item: ItemPreviewResponseSchema;
  maxWidthClass: string;
  heightClass: string;
}

export default function ItemSoldOutDiv({ item, maxWidthClass, heightClass }: ItemSoldOutDivProps) {
  const { itemId, itemName, price, imageUrl, artistName, wished } = item;
  const isMasonry = maxWidthClass === 'max-w-29'; // strict handling

  return (
    <div className={clsx('relative flex-1', maxWidthClass, heightClass)}>
      <div className="absolute top-2 right-2 z-10 w-7.5">
        {wished ? <HeartFilledIcon className="text-orange" /> : <HeartEmptyIcon className="text-white" />}
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="bg-green relative aspect-[4/5] w-full">
          {/* image optimization limit */}
          <ImageWithEffect src={imageUrl} alt={`아이템 ${itemId}의 프리뷰 이미지.`} fill unoptimized />
          <div className="absolute top-0 z-5 flex h-full w-full items-center justify-center bg-black/50">
            <p className={clsx('font-medium text-white', isMasonry ? 'text-body-02' : 'text-subhead')}>sold out</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col">
            <p className="text-caption-01 text-grey-600 font-medium">{artistName}</p>
            <p className="text-body-01 custom-break-words text-grey-9 line-clamp-2 overflow-hidden font-medium text-ellipsis">
              {itemName}
            </p>
          </div>
          <p className="text-body-02 font-regular text-grey-9">{`${price.toLocaleString()}원`}</p>
        </div>
      </div>
    </div>
  );
}
