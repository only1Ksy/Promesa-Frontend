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
        <div className="flex">
          <span>주문상품정보</span>
          <span>{TEMP_ORDER.date}</span>
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
          <div></div>
          <div></div>
        </div>
      </div>
    </motion.div>
  );
}
