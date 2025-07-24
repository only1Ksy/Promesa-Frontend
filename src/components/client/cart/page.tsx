import CartProductList from '@/components/features/cart/cart-product-list';
import CartTotalPrice from '@/components/features/cart/cart-total-price';

export default function ClientCartPage() {
  return (
    <div className="flex flex-col gap-7.75">
      <CartProductList />
      <CartTotalPrice />
    </div>
  );
}
