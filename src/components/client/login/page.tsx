'use client';

import { useSearchParams } from 'next/navigation';

export default function ClientLoginPage() {
  const searchParams = useSearchParams();

  const afterLogin = searchParams.get('afterLogin');

  return (
    <div className="bg-pale-green flex flex-col gap-9">
      <div className="mx-4 mt-9">
        <h1 className="text-headline-02 text-grey-7 font-regular">
          PROMESA에
          <br />
          오신걸 환영합니다.
        </h1>
      </div>
      <div className="mx-5">
        <button
          onClick={() => {
            const clientId = process.env.NEXT_PUBLIC_REST_API_KEY!;
            const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI!);
            const state = encodeURIComponent(process.env.NEXT_PUBLIC_FRONTEND_URI!);

            window.location.href =
              `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code` +
              `&state=${state}&afterLogin=${afterLogin}`;
          }}
          className="flex h-12.5 w-full cursor-pointer items-center justify-center rounded-md bg-[#fee502]"
        >
          <p className="text-body-02 font-bold text-black">카카오로 계속하기</p>
        </button>
      </div>
    </div>
  );
}
