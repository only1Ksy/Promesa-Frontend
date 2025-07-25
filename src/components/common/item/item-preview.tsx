'use client';

import clsx from 'clsx';
import Link from 'next/link';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { useToggleWish } from '@/hooks/use-toggle-wish';
import HeartEmptyIcon from '@/public/icons/item/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/item/heart-filled.svg';
import type { ItemPreviewResponseSchema } from '@/types/item-controller';

import ItemSoldOutDiv from './item-sold-out-div';

interface ItemPreviewProps {
  item: ItemPreviewResponseSchema;
  maxWidthClass: string;
  heightClass: string;
}

export default function ItemPreview({ item, maxWidthClass, heightClass }: ItemPreviewProps) {
  const { itemId, saleStatus, itemName, price, imageUrl, artistName, wished } = item;

  const { mutate: toggleWish } = useToggleWish();

  if (saleStatus !== 'ON_SALE')
    return <ItemSoldOutDiv item={item} maxWidthClass={maxWidthClass} heightClass={heightClass} />;

  return (
    <div className={clsx('relative flex-1', maxWidthClass, heightClass)}>
      <button
        onClick={() => toggleWish({ targetType: 'ITEM', targetId: itemId, currentWished: wished })}
        className="absolute top-2 right-2 z-10 w-7.5 cursor-pointer"
      >
        {wished ? <HeartFilledIcon className="text-orange" /> : <HeartEmptyIcon className="text-white" />}
      </button>
      <Link href={`/detail/${itemId}`}>
        <div className="flex flex-col gap-2.5">
          <div className="bg-green relative aspect-[4/5] w-full">
            {/* image optimization limit */}
            <ImageWithEffect src={imageUrl} alt={`아이템 ${itemId}의 프리뷰 이미지.`} fill />
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
      </Link>
    </div>
  );
}
