import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="mt-15 flex flex-col items-center gap-10">
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
