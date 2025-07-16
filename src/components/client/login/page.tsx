'use client';

import { useSearchParams } from 'next/navigation';

import KakkoLogoIcon from '@/public/icons/auth/kakko-logo.svg';
import CloseIcon from '@/public/icons/layout/close.svg';
import PromesaTextMediumIcon from '@/public/icons/logo/text-md.svg';

export default function ClientLoginPage() {
  const searchParams = useSearchParams();

  return (
    <div className="bg-pale-green flex h-screen flex-col gap-9">
      <div className="mx-5 my-2 flex justify-end">
        <button
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back();
            } else {
              window.location.href = '/';
            }
          }}
          className="flex cursor-pointer items-center justify-center"
        >
          <CloseIcon className="text-grey-9" />
        </button>
      </div>
      <div className="mb-25 flex h-full flex-col items-center justify-center gap-8">
        <div className="text-grey-9 flex flex-col items-center gap-10 p-2.5">
          <PromesaTextMediumIcon className="text-grey-9" />
          <div className="text-subhead text-grey-7 flex text-center font-medium">
            <p>
              PROMESA에 오신걸 환영합니다.
              <br />
              새로운 도자기들과 아티스트들을 만나보세요.
            </p>
          </div>
        </div>
        <div className="w-full px-5">
          <button
            onClick={() => {
              const clientId = process.env.NEXT_PUBLIC_REST_API_KEY!;
              const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI!);
              const state = encodeURIComponent(process.env.NEXT_PUBLIC_FRONTEND_URI!);
              const afterLogin = searchParams.get('afterLogin');

              window.location.href =
                `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code` +
                `&state=${state}&afterLogin=${afterLogin}`;
            }}
            className="flex h-13.5 w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-[#fee500]"
          >
            <KakkoLogoIcon className="text-[#000000]" />
            <p className="text-body-01 font-bold text-black">카카오로 계속하기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
