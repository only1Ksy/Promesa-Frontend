'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useAccessTokenStore } from '@/lib/store/use-access-token-store';

export default function ClientLoginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccessToken = useAccessTokenStore((s) => s.setAccessToken);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const afterLogin = searchParams.get('afterLogin') || '/';

    if (!accessToken) {
      router.replace('/login');
      return;
    }

    setAccessToken(accessToken);

    const base = Number(sessionStorage.getItem('histBase') ?? '0');
    const steps = history.length - base - 1;

    if (steps > 0) {
      const finalize = () => {
        window.removeEventListener('popstate', finalize);
        sessionStorage.removeItem('histBase');
        router.replace(afterLogin);
      };

      window.addEventListener('popstate', finalize, { once: true });
      history.go(-steps);
    } else {
      sessionStorage.removeItem('histBase');
      router.replace(afterLogin);
    }
  }, [router, searchParams, setAccessToken]);

  return <div className="h-screen w-full" />;
}
