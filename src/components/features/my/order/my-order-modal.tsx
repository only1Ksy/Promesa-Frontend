'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

import Header from '@/components/layout/header';

import MyOrderCard from './my-order-card';

export default function MyOrderModal() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  if (!orderId) return null;

  const TEMP_ORDER = {
    date: '2025.08.08',
    status: '배송중',
    shipComment: '8/5 (금) 도착 예정',
    url: '/src/image',
    title: '반짝반짝 도자기',
    price: 25000,
    itemCount: 1,
    orderId: { orderId },
    name: '김서연',
    phone: '010 - 1234 - 5678',
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="bg-pale-green fixed inset-0 z-999 mx-auto w-full max-w-[var(--frame-width)] overflow-y-auto shadow-lg"
    >
      <Header shadow />
      <div className="flex flex-col gap-3 pt-11.5">
        <div className="flex items-center gap-2.5 px-5 pt-5">
          <span className="text-headline-05">주문상품정보</span>
          <span className="text-body-01 text-grey-5 font-medium">{TEMP_ORDER.date}</span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <MyOrderCard
            status={TEMP_ORDER.status}
            shipComment={TEMP_ORDER.shipComment}
            url={TEMP_ORDER.url}
            title={TEMP_ORDER.title}
            price={TEMP_ORDER.price}
            itemCount={TEMP_ORDER.itemCount}
          />

          <div className="bg-green h-[1px] w-90.5" />

          <div className="flex w-full flex-col gap-3.5 px-5">
            <span className="text-headline-05">구매자정보</span>
            <div className="text-body-01 flex flex-col gap-3 font-medium">
              <div className="flex items-center justify-between">
                <span>구매자</span>
                <span>{TEMP_ORDER.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>휴대전화</span>
                <span>{TEMP_ORDER.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-green h-[1px] w-90.5" />

          <div className="flex w-full flex-col gap-3.5 px-5">
            <span className="text-headline-05">결제정보</span>
            <div className="flex flex-col gap-3">
              <div className="text-subhead flex items-center justify-between">
                <span className="font-medium">총 결제 금액</span>
                <span className="text-orange font-bold">{(TEMP_ORDER.price + 3000).toLocaleString()}원</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span>총 상품 금액</span>
                  <span>{TEMP_ORDER.price.toLocaleString()}원</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>배송비</span>
                  <span>+3,000원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
