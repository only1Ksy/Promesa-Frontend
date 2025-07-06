'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import VideoLoader from '@/components/layout/video-loader';
import { useAccessTokenStore } from '@/lib/store/use-access-token-store';

export default function ClientLoginSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAccessToken = useAccessTokenStore((s) => s.setAccessToken);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const afterLogin = searchParams.get('afterLogin') || '/';
    const refreshToken = searchParams.get('refresh'); // need to refactor

    if (accessToken) {
      setAccessToken(accessToken);

      if (refreshToken) {
        const isProd = process.env.NODE_ENV === 'production';
        document.cookie = `refresh=${refreshToken}; path=/; ${isProd ? 'secure; samesite=lax' : ''}`;
      }

      router.replace(afterLogin);
    } else {
      router.replace('/login');
    }
  }, [router, searchParams, setAccessToken]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <VideoLoader />
    </div>
  );
}
