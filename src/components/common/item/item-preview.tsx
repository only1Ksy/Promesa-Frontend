'use client';

import clsx from 'clsx';
import Link from 'next/link';

import { useToggleWish } from '@/hooks/mutation/use-toggle-wish';
import { useWishStore } from '@/lib/store/use-wish-store';
import HeartEmptyIcon from '@/public/icons/item/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/item/heart-filled.svg';
import type { ItemPreviewSchema } from '@/types/item-controller';

interface ItemPreviewProps extends Pick<ItemPreviewSchema, 'itemId' | 'itemName' | 'price' | 'artistName'> {
  maxWidthClass: string;
  heightClass: string;
}

export default function ItemPreview({
  itemId,
  itemName,
  price,
  artistName,
  maxWidthClass,
  heightClass,
}: ItemPreviewProps) {
  const { mutate } = useToggleWish();

  const wished = useWishStore((state) => state.wishedIds.includes(itemId));

  if (itemId < 0) return <div className={clsx('flex-1', maxWidthClass, heightClass)} />;

  return (
    <div className={clsx('relative flex-1', maxWidthClass, heightClass)}>
      <button onClick={() => mutate(itemId)} className="absolute top-2 right-2 z-10 cursor-pointer">
        {wished ? <HeartFilledIcon className="text-orange" /> : <HeartEmptyIcon className="text-pale-green" />}
      </button>
      <Link href={`/detail/${itemId}`}>
        <div className="flex flex-col gap-2.5">
          <div className="bg-green aspect-[4/5] w-full" />
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
