import Link from 'next/link';

export default function AdminArtistPage() {
  return (
    <div className="flex flex-col">
      <div className="mb-5 pl-5">
        <p className="text-headline-04">아티스트 등록/수정</p>
      </div>
      <div className="mb-15 flex h-[calc(100vh-var(--spacing)*56)] flex-col items-center justify-center gap-10">
        <Link href="/admin/artist/register">
          <div className="flex h-20 w-50 items-center justify-center rounded-sm border border-black hover:bg-black hover:text-white">
            <p className="text-headline-05 font-regular">아티스트 등록하기</p>
          </div>
        </Link>
        <Link href="/admin/artist/update">
          <div className="flex h-20 w-50 items-center justify-center rounded-sm border border-black hover:bg-black hover:text-white">
            <p className="text-headline-05 font-regular">아티스트 수정하기</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
