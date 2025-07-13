'use client';

import { useSearchParams } from 'next/navigation';

import KakkoLogoIcon from '@/public/icons/auth/kakko-logo.svg';
import CloseIcon from '@/public/icons/layout/close.svg';
import PromesaLoginSymbolIcon from '@/public/icons/logo/login-symbol.svg';
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
      <div className="mx-5 mb-13.5 flex h-full flex-col items-center gap-4">
        <div className="text-grey-9 flex flex-1 flex-col items-center justify-center gap-2">
          <PromesaLoginSymbolIcon />
          <PromesaTextMediumIcon />
        </div>
        <div className="text-body-02 flex">
          <p className="text-orange font-bold">회원가입</p>
          <p className="text-grey-5 font-medium">하고 더 많은 도자기와 아티스트를 만나보세요</p>
        </div>
        <div className="w-full">
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
            {/* strict design match : mt-0.5, font-medium */}
            <KakkoLogoIcon className="mt-0.5" />
            <p className="font-apple text-lg leading-[150%] font-medium text-[#000000]/85">카카오로 계속하기</p>
          </button>
        </div>
      </div>
    </div>
  );
}
