'use client';

import { useEffect } from 'react';

import { useAccessTokenStore } from '@/lib/store/use-access-token-store';
import { reissueOnce } from '@/services/api/axios/auth';

export default function ReissueInitializer() {
  const setAccessToken = useAccessTokenStore((s) => s.setAccessToken);

  useEffect(() => {
    reissueOnce().then((token) => {
      if (token) setAccessToken(token);
    });
  });

  return null;
}
