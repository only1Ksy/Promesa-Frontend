'use client';

import { useToggleWish } from '@/hooks/mutation/use-toggle-wish';
import { useWishStore } from '@/lib/store/use-wish-store';
import HeartEmptyIcon from '@/public/icons/item/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/item/heart-filled.svg';
import type { Item } from '@/types/item.dto';

type ItemPreviewGridProps = Pick<Item, 'itemId' | 'itemName' | 'price' | 'artistName' | 'sale'>;

export default function ItemPreviewGrid({ itemId, itemName, price, artistName, sale }: ItemPreviewGridProps) {
  const { mutate } = useToggleWish();

  const wished = useWishStore((state) => state.wishedIds.includes(itemId));

  return (
    <div className="relative flex h-81 w-44 flex-col gap-2.5">
      <button onClick={() => mutate(itemId)} className="absolute top-2 right-2 z-10 cursor-pointer">
        {wished ? <HeartFilledIcon className="text-orange" /> : <HeartEmptyIcon className="text-pale-green" />}
      </button>
      <div className="bg-green h-55 w-full" />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col">
          <p className="text-caption-01 text-grey-600 font-medium">{artistName}</p>
          <p className="text-body-01 custom-break-words text-grey-9 line-clamp-2 overflow-hidden font-medium text-ellipsis">
            {itemName}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="text-body-02 text-orange font-medium">{`${sale}%`}</p>
          <p className="text-body-02 font-regular text-grey-9">{`${price.toLocaleString()}원`}</p>
        </div>
      </div>
    </div>
  );
}
