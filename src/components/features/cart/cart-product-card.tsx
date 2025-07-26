'use client';

import { useState } from 'react';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import { useDeleteCartItem, usePatchCartItem } from '@/hooks/use-cart';
import CloseIcon from '@/public/icons/layout/close.svg';
import { CartSchema } from '@/types/cart-controller';

interface CartProductCardProps {
  product: CartSchema;
}

export default function CartProductCard({ product }: CartProductCardProps) {
  const [quantity, setQuantity] = useState(product.quantity);

  const { mutate: patchCarts } = usePatchCartItem();
  const { mutate: deleteCarts } = useDeleteCartItem();

  // 수량 조절
  const itemCount = product.quantity;
  // !!! 수정 필요
  const isSoldOut = product.quantity < 1;

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      patchCarts({ itemId: product.itemId, quantity: newQuantity });
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < itemCount) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      patchCarts({ itemId: product.itemId, quantity: newQuantity });
    }
  };

  return (
    <div className="flex gap-4">
      <div className="h-35 w-28">
        <ImageWithEffect alt="장바구니 미리보기 이미지" fill src={product.thumbnailUrl} />
      </div>
      <div className="flex h-35 w-58.5 flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full items-center justify-between">
              <span className="text-grey-9 text-body-01 font-bold overflow-ellipsis">{product.name}</span>
              <button onClick={() => deleteCarts(product.itemId)}>
                <CloseIcon width={20} height={20} />
              </button>
            </div>
            <span className="text-body-02 text-grey-6 font-medium">{product.artistName}</span>
          </div>
        </div>
        <div className="flex justify-between">
          {!isSoldOut ? (
            <div className="flex h-6.5 w-21.5 items-center justify-between rounded-[99px] border px-2">
              <button
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
                className="text-grey-9 flex h-8 w-8 cursor-pointer items-center justify-center disabled:opacity-30"
              >
                -
              </button>
              <span className="text-body-02 text-grey-9 text-center font-medium">{quantity}</span>
              <button
                onClick={handleQuantityIncrease}
                disabled={quantity >= itemCount}
                className="text-grey-9 flex h-8 w-8 cursor-pointer items-center justify-center disabled:opacity-50"
              >
                +
              </button>
            </div>
          ) : (
            <div className="text-subhead text-grey-9 ml-5 flex items-center font-medium opacity-40">품절</div>
          )}
          <span className="text-grey-9 text-body-01 font-medium">{product.price.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}
