'use client';

// import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import BottomFixedBarPortal from '@/components/common/utilities/bottom-fixed-bar-portal';
import BottomFixedBar from '@/components/features/order/bottom-fixed-bar';
import DeliveryForm from '@/components/features/order/delivery-form';
import OrderedProductList from '@/components/features/order/ordered-product-list';
import PayForm from '@/components/features/order/pay-form';
import TotalPrice from '@/components/features/order/total-price';
import { useOrderStore } from '@/lib/store/order-information-store';
import { fetchCarts } from '@/services/api/cart-controller';
import { fetchItemDetail } from '@/services/api/item-controller';
import { postOrder } from '@/services/api/order-controller';
import { postDefaultAddress } from '@/services/api/order-controller';

export default function ClientOrderItemPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { delivery, payment } = useOrderStore();

  const params = useMemo(
    () => ({
      mode: searchParams.get('mode') ?? 'one',
      itemId: searchParams.get('id') ? Number(searchParams.get('id')) : 0,
      itemCount: searchParams.get('num') ? Number(searchParams.get('num')) : 1,
    }),
    [searchParams],
  );

  // params에 따라 분기처리
  const isCartMode = params.mode === 'cart';

  const [agree, setAgree] = useState<boolean>(false);

  // 단일 아이템, 카트에 따라 분기
  const { data: item } = useQuery({
    queryKey: ['itemDetail', params.itemId],
    queryFn: () => fetchItemDetail(params.itemId),
    select: (res) => res,
    enabled: !isCartMode,
  });

  const { data: carts } = useQuery({
    queryKey: ['carts'],
    queryFn: fetchCarts,
    enabled: isCartMode, // cart일 때만 실행
  });

  const items = useMemo(() => {
    if (isCartMode) {
      if (!carts) return [];

      return carts.map((cart) => ({
        imageSrc: cart.thumbnailUrl,
        artistName: cart.artistName,
        itemName: cart.name,
        itemNumber: cart.quantity,
        price: cart.price,
        itemId: cart.itemId,
      }));
    }

    if (!item) return [];

    return [
      {
        imageSrc: item.mainImageUrls[0],
        artistName: item.artist.name,
        itemName: item.title,
        itemNumber: params.itemCount,
        price: item.price,
        itemId: params.itemId,
      },
    ];
  }, [isCartMode, item, params, carts]);

  const orderItems = items.map((item) => ({
    itemId: item.itemId,
    quantity: item.itemNumber,
  }));

  const handlePayClick = async () => {
    if (!agree) return;

    if (!delivery.name) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!delivery.postcode || !delivery.address || !delivery.addressDetail) {
      alert('주소를 모두 입력해주세요.');
      return;
    }

    if (!delivery.phone2 || !delivery.phone3) {
      alert('전화번호를 정확히 입력해주세요.');
      return;
    }

    if (!payment.selectedBank) {
      alert('은행을 선택해주세요.');
      return;
    }

    if (!payment.depositor) {
      alert('입금자명을 입력해주세요.');
      return;
    }

    // 모든 검사를 통과하면 결제 진행
    console.log('✅ 제출 가능, 결제 진행!');

    // 기본 배송지 저장 호출
    if (delivery.isDefault) {
      try {
        const saved = await postDefaultAddress(
          delivery.name,
          delivery.postcode,
          delivery.address,
          delivery.addressDetail,
          `${delivery.phone1}-${delivery.phone2}-${delivery.phone3}`,
        );
        console.log('✅ 기본 배송지 저장 성공:', saved);

        // 필요하다면 여기서 fetchDefaultAddress()로 다시 불러올 수도 있음
      } catch (error) {
        console.error('❌ 기본 배송지 저장 실패:', error);
        alert('기본 배송지 저장에 실패했습니다. 다시 시도해주세요.');
        return;
      }
    }

    // 주문 호출
    const orderData = {
      type: isCartMode ? ('MULTIPLE' as const) : ('SINGLE' as const),
      items: orderItems,
      address: {
        recipientName: delivery.name,
        zipCode: delivery.postcode,
        addressMain: delivery.address,
        addressDetails: delivery.addressDetail,
        recipientPhone: `${delivery.phone1}-${delivery.phone2}-${delivery.phone3}`,
      },
      payment: {
        paymentMethod: '무통장입금',
        bankName: payment.selectedBank,
        depositorName: payment.depositor,
      },
    };
    console.log(JSON.stringify(orderData, null, 2));

    try {
      const result = await postOrder(orderData);
      console.log('주문 성공:', result);

      // 주문 완료 페이지로 이동하거나, 주문 완료 메시지 보여주기 등 처리
      alert(`주문이 완료되었습니다! 주문번호: ${result.summary.orderId}`);
      router.push(`order/complete/${result.summary.orderId}`);
    } catch (err) {
      console.error('주문 실패:', err);
      alert('주문 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.itemNumber, 0);

  return (
    <>
      <div className="flex w-full flex-col gap-6.5 pt-3 pb-21">
        {/* 주문 아이템 리스트 */}
        <OrderedProductList items={items} />
        {/* 배송지 작성 */}
        <DeliveryForm />
        {/* 결제 수단 */}
        <PayForm />
        {/* 총 결제 금액 */}
        <TotalPrice total={total} />
        {/* 결제 동의 버튼 */}
        <div className="flex h-12.5 items-center gap-4.5 px-5">
          <button
            type="button"
            onClick={() => setAgree((prev) => !prev)}
            className="flex cursor-pointer items-center gap-1.5"
          >
            <span className={clsx('h-3.5 w-3.5', agree ? 'bg-orange' : 'bg-grey-4')} />
            <span className={clsx('text-caption-01 font-medium', agree ? 'text-black' : 'text-grey-5')}>
              주문내용 확인 및 결제 동의
            </span>
          </button>
        </div>
      </div>
      {/* 하단 고정 결제하기 버튼 */}
      <BottomFixedBarPortal>
        <BottomFixedBar total={total > 70000 ? total : total + 3000} agree={agree} handlePayCheck={handlePayClick} />
      </BottomFixedBarPortal>
    </>
  );
}
