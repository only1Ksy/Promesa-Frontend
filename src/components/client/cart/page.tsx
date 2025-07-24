'use client';

import BottomFixedBarPortal from '@/components/common/utilities/bottom-fixed-bar-portal';
import BottomFixedBar from '@/components/features/cart/bottom-fixed-bar';
import CartProductList from '@/components/features/cart/cart-product-list';
import CartTotalPrice from '@/components/features/cart/cart-total-price';

export default function ClientCartPage() {
  const handlePurchase = () => {};

  const isEmpty = true;

  return (
    <div className="relative" style={{ minHeight: 'calc(100vh - 46px)' }}>
      {!isEmpty ? (
        <>
          <div className="flex flex-col gap-7.75">
            <CartProductList />
            <CartTotalPrice />
          </div>
          <BottomFixedBarPortal>
            <BottomFixedBar handlePurchase={handlePurchase} />
          </BottomFixedBarPortal>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
