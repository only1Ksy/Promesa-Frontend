import ImageWithEffect from '@/components/common/utilities/image-with-effect';

interface Item {
  imageSrc: string;
  artistName: string;
  itemName: string;
  itemNumber: number;
  price: number;
}

interface ItemProps {
  item: Item;
}

export default function ProductCard({ item }: ItemProps) {
  return (
    <div className="flex gap-4.5">
      <div className="h-28.75 w-23">
        <ImageWithEffect src={item.imageSrc} alt={'ProductPreviewImage'} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col">
          <div className="text-body-02 font-bold">{item.artistName}</div>
          <div className="text-body-01 font-medium">{item.itemName}</div>
          <div className="text-body-02 font-medium">{item.itemNumber}개</div>
        </div>
        <div className="text-body-01 font-bold">{(item.price * item.itemNumber).toLocaleString()}원</div>
      </div>
    </div>
  );
}
