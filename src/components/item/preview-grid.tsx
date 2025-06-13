import { useWishStore } from '@/lib/store/wish-store';
import HeartEmptyIcon from '@/public/icons/item/heart-empty.svg';
import HeartFilledIcon from '@/public/icons/item/heart-filled.svg';
import type { Item } from '@/types/item.dto';

type ItemPreviewGridProps = Pick<Item, 'itemId' | 'itemName' | 'price' | 'artistName' | 'sale'>;

export default function ItemPreviewGrid({ itemId, itemName, price, artistName, sale }: ItemPreviewGridProps) {
  const { isWished, toggleWish } = useWishStore();

  return (
    <div className="relative flex h-81 w-44 flex-col gap-2.5">
      <button onClick={() => toggleWish(itemId)} className="absolute top-2 right-2 z-10 cursor-pointer">
        {isWished(itemId) ? (
          <HeartFilledIcon className="text-orange" />
        ) : (
          <HeartEmptyIcon className="text-pale-green" />
        )}
      </button>
      <div className="bg-green h-55 w-full" />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.25">
          <p className="text-caption-01 text-grey-600 font-medium">{artistName}</p>
          <p className="text-body-01 custom-break-words line-clamp-2 overflow-hidden font-medium text-ellipsis text-black">
            {itemName}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="text-body-02 text-orange font-medium">{`${sale}%`}</p>
          <p className="text-body-02 font-regular text-black">{`${price.toLocaleString()}원`}</p>
        </div>
      </div>
    </div>
  );
}
