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
    const afterLogin = (searchParams.get('afterLogin') !== 'null' && searchParams.get('afterLogin')) || '/';

    if (accessToken) {
      setAccessToken(accessToken);

      router.replace(afterLogin);
    } else {
      router.replace('/login');
    }
  }, [router, searchParams, setAccessToken]);

  return <div className="h-screen w-full" />;
}
