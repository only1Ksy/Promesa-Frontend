import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col bg-white">
      <header className="mt-15 flex w-full items-center justify-between px-5">
        <span className="text-headline-01">관리자 페이지</span>
        <Link href="/admin">
          <p className="text-headline-02 text-orange">홈으로</p>
        </Link>
      </header>
      {children}
    </div>
  );
}
