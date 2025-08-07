'use client';

import { DehydratedState } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import EmptyCard from '@/components/common/empty/empty-card';
import BottomFixedBarPortal from '@/components/common/utilities/bottom-fixed-bar-portal';
import BottomFixedBar from '@/components/features/cart/bottom-fixed-bar';
import CartProductList from '@/components/features/cart/cart-product-list';
import CartTotalPrice from '@/components/features/cart/cart-total-price';
import { fetchCarts } from '@/services/api/cart-controller';

interface ClientCartPageProps {
  cartsState: DehydratedState;
}

export default function ClientCartPage({ cartsState }: ClientCartPageProps) {
  const router = useRouter();

  const { data: carts } = useSuspenseQuery({
    queryKey: ['carts'],
    queryFn: () => fetchCarts(),
    select: (res) => res,
  });

  if (!carts) return null;

  const totalPrice = carts.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const isAvailable = carts.every((item) => item.saleStatus === 'ON_SALE');

  const handlePurchase = () => {
    router.push('order?mode=cart');
  };

  const isEmpty = carts.length === 0;

  return (
    <HydrationBoundary state={cartsState}>
      <div className="relative" style={{ minHeight: 'calc(100vh - 46px)' }}>
        {!isEmpty ? (
          <>
            <div className="flex flex-col gap-7.75">
              <CartProductList carts={carts} />
              <CartTotalPrice totalPrice={totalPrice} />
            </div>
            <BottomFixedBarPortal>
              <BottomFixedBar handlePurchase={handlePurchase} isAvailable={isAvailable} />
            </BottomFixedBarPortal>
          </>
        ) : (
          <EmptyCard
            main="장바구니에 담긴 작품이 없습니다"
            sub="원하는 작품을 담아보세요"
            buttonText="작품 담으러 가기"
          />
        )}
      </div>
    </HydrationBoundary>
  );
}
