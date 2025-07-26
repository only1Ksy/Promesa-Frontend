import { CartResponse } from '@/types/cart-controller';

import CartProductCard from './cart-product-card';

interface CartProductListProps {
  carts: CartResponse;
}

export default function CartProductList({ carts }: CartProductListProps) {
  return (
    <div className="flex flex-col items-center gap-5 px-5 pt-5">
      {carts.map((product, index) => (
        <>
          <div key={index}>
            <CartProductCard product={product} />
          </div>
          <div className="bg-green h-[1px] w-full" />
        </>
      ))}
    </div>
  );
}
