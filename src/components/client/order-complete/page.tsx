'use client';

import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import BottomFixedBar from '@/components/features/order/complete/bottom-fixed-bar';
import OrderInformation from '@/components/features/order/complete/order-information';
import orderCompletedJson from '@/public/videos/lottie-order-completed.json';

export default function ClientOrderCompletePage() {
  const [play, setPlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPlay(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex w-full justify-center p-5">
        <div className="flex min-h-180 w-90.5 flex-col items-center gap-15">
          {/* 상단 아이콘 */}
          <div className="flex w-full flex-col items-center justify-center px-5.5 text-center">
            <Lottie loop={false} animationData={orderCompletedJson} play={play} style={{ width: 103, height: 84.67 }} />
            <span className="text-headline-05 mt-6 font-bold text-black">주문이 완료되었어요</span>
            <p className="text-body-01 mt-1 font-medium text-black">아래 계좌번호로 입금하면 결제가 완료돼요.</p>
          </div>
          {/* 주문 정보 */}
          <OrderInformation />
        </div>
      </div>
      {/* 하단 고정 바*/}
      <BottomFixedBar />
    </>
  );
}
