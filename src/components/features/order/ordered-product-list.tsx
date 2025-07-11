import ProductCard from './product-card';

interface Item {
  imageSrc: string;
  artistName: string;
  itemName: string;
  itemNumber: number;
  price: number;
}

interface ItemsProps {
  items: Item[];
}

export default function OrderedProductList({ items }: ItemsProps) {
  return (
    <div className="border-green flex flex-col gap-3.5 border-b px-5 pb-6.5">
      <div className="flex gap-1.5">
        <span className="text-headline-05">주문상품</span>
        <span className="text-headline-06">{items.length}개</span>
      </div>
      {items.map((item) => (
        <ProductCard key={item.itemNumber} item={item} />
      ))}
    </div>
  );
}
