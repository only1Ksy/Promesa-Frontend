'use client';

import { useRouter } from 'next/navigation';

import GoIcon from '@/public/icons/layout/scroll-to-top.svg';

import MyOrderCard from './my-order-card';

export default function MyOrderList() {
  const router = useRouter();

  const TEMP_ORDER = [
    {
      date: '2025.08.08',
      status: '배송중',
      shipComment: '8/5 (금) 도착 예정',
      url: '/src/image',
      title: '반짝반짝 도자기',
      price: 25000,
      itemCount: 1,
      orderId: 1,
    },
    {
      date: '2025.08.08',
      status: '취소접수',
      shipComment: '',
      url: '/src/image',
      title: '반짝반짝 도자기',
      price: 25000,
      itemCount: 1,
      orderId: 1,
    },
    {
      date: '2025.08.08',
      status: '배송완료',
      shipComment: '8/5 (금) 도착 완료',
      url: '/src/image',
      title: '반짝반짝 도자기',
      price: 25000,
      itemCount: 1,
      orderId: 1,
    },
  ];

  return (
    <>
      {TEMP_ORDER.map((order, index) => {
        return (
          <>
            <div key={index} className="pt-5 pb-6">
              <div className="text-grey-9 text-body-02 flex items-center justify-between px-5 py-2 font-medium">
                <span>{order.date}</span>
                <button
                  onClick={() => router.push(`/my/order?id=${order.orderId}`)}
                  className="flex cursor-pointer items-center gap-1"
                >
                  <span>주문 상세</span>
                  <GoIcon className="text-grey-5 rotate-90" />
                </button>
              </div>
              <MyOrderCard
                status={order.status}
                shipComment={order.shipComment}
                url={order.url}
                title={order.title}
                price={order.price}
                itemCount={order.itemCount}
              />
            </div>
            {index !== TEMP_ORDER.length - 1 && <div className="bg-green mx-5 h-[1px]" />}
          </>
        );
      })}
    </>
  );
}
