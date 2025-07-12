'use client';

import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';

import orderCompletedJson from '@/public/videos/lottie-order-completed.json';

export default function ClientOrderCompletePage() {
  const [play, setPlay] = useState(true);

  useEffect(() => {
    // 3초 정도 후 애니메이션 자동 정지
    const timer = setTimeout(() => setPlay(false), 3000); // Lottie 길이에 따라 조정

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center px-5.5 text-center">
        <Lottie loop={false} animationData={orderCompletedJson} play={play} style={{ width: 103, height: 84.67 }} />
        <h1 className="text-headline-04 text-deep-green mt-6 font-bold">주문이 완료되었어요</h1>
        <p className="text-body-01 text-grey-7 mt-2">아래 계좌번호로 입금하면 결제가 완료돼요.</p>
      </div>
    </div>
  );
}
