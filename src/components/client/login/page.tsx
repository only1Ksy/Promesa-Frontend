'use client';

import { useSearchParams } from 'next/navigation';

import KakkoLogoIcon from '@/public/icons/auth/kakko-logo.svg';
import PromesaTextMediumIcon from '@/public/icons/logo/text-md.svg';

export default function ClientLoginPage() {
  const searchParams = useSearchParams();

  return (
    <div className="bg-pale-green flex h-screen flex-col items-center justify-center gap-8 pb-25">
      <div className="text-grey-9 flex flex-col items-center gap-10 p-2.5">
        <PromesaTextMediumIcon className="text-grey-9" />
        <div className="text-subhead text-grey-7 flex flex-col text-center font-medium">
          <p>PROMESA에 오신 걸 환영합니다.</p>
          <p>지금, 당신의 공간에 새로운 취향을 더해보세요.</p>
        </div>
      </div>
      <div className="w-full px-5">
        <button
          onClick={() => {
            const clientId = process.env.NEXT_PUBLIC_REST_API_KEY!;
            const state = encodeURIComponent(process.env.NEXT_PUBLIC_FRONTEND_URI!);
            const afterLogin = searchParams.get('afterLogin');

            sessionStorage.setItem('histBase', String(history.length));

            const kakkoUrl =
              `${process.env.NEXT_PUBLIC_REDIRECT_URI}?client_id=${clientId}&response_type=code` +
              `&state=${state}?afterLogin=${afterLogin}`;

            window.location.replace(kakkoUrl);
          }}
          className="flex h-13.5 w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-[#fee500]"
        >
          <KakkoLogoIcon className="text-[#000000]" />
          <p className="text-body-01 font-bold text-black">카카오로 계속하기</p>
        </button>
      </div>
    </div>
  );
}
