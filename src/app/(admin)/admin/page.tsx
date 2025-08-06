'use client';

import Link from 'next/link';

import { getQueryClient } from '@/services/query/client';

export default function AdminPage() {
  const queryClient = getQueryClient();

  const refetchAllQueries = () => {
    queryClient.refetchQueries({ type: 'all' });
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-8">
      <button onClick={refetchAllQueries} className="cursor-pointer">
        <div className="hover:bg-orange text-orange border-orange flex h-10 w-50 items-center justify-center rounded-sm border hover:text-white">
          <p className="text-headline-05 font-bold">동기화하기</p>
        </div>
      </button>
      <Link href="/admin/item">
        <div className="flex h-20 w-50 items-center justify-center rounded-sm border border-black hover:bg-black hover:text-white">
          <p className="text-headline-05 font-regular">작품 등록/수정</p>
        </div>
      </Link>
      <Link href="/admin/artist">
        <div className="flex h-20 w-50 items-center justify-center rounded-sm border border-black hover:bg-black hover:text-white">
          <p className="text-headline-05 font-regular">아티스트 등록/수정</p>
        </div>
      </Link>
      <Link href="/admin/exhibition">
        <div className="flex h-20 w-50 items-center justify-center rounded-sm border border-black hover:bg-black hover:text-white">
          <p className="text-headline-05 font-regular">기획전 등록/수정</p>
        </div>
      </Link>
      <Link href="/admin/order">
        <div className="flex h-20 w-50 items-center justify-center rounded-sm border border-black hover:bg-black hover:text-white">
          <p className="text-headline-05 font-regular">주문 상태 조회/수정</p>
        </div>
      </Link>
      <Link href="/admin/delivery">
        <div className="flex h-20 w-50 items-center justify-center rounded-sm border border-black hover:bg-black hover:text-white">
          <p className="text-headline-05 font-regular">배송 내역 조회/수정</p>
        </div>
      </Link>
      <Link href="/admin/inquiry">
        <div className="flex h-20 w-50 items-center justify-center rounded-sm border border-black hover:bg-black hover:text-white">
          <p className="text-headline-05 font-regular">문의 등록/수정</p>
        </div>
      </Link>
    </div>
  );
}
