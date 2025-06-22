'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-15">
      <div className="flex h-60 flex-col justify-end">
        <p className="text-grey-9 text-headline-01 flex items-center justify-center text-7xl">ERROR</p>
        <p className="text-grey-9 text-headline-03 mt-5 flex items-center justify-center">{error.message}</p>
      </div>
      <Link href="/home">
        <div className="text-body-02 font-regular hover:text-grey-1 border-grey-9 text-grey-9 hover:bg-grey-9 mb-10 flex h-8 w-35 items-center justify-center rounded-[10rem] border-[1.2px] backdrop-blur-[2.35px] transition duration-200">
          <p>홈으로 가기</p>
        </div>
      </Link>
    </div>
  );
}
