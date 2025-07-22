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
    const steps = history.length - base;

    const finalize = () => {
      window.removeEventListener('popstate', finalize);
      try {
        history.replaceState(null, '', afterLogin);
      } catch {}
      window.location.replace(afterLogin);
    };

    if (steps > 0) {
      window.addEventListener('popstate', finalize, { once: true });
      history.go(-steps);
    } else {
      finalize();
    }

  }, [router, searchParams, setAccessToken]);

  return <div className="h-screen w-full" />;
}
