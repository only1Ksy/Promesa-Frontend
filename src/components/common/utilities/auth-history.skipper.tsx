'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAuthHistorySkipStore } from '@/lib/store/use-auth-history-skip-store';

const AUTH_PATH_PREFIXES = ['/login', '/logout', 'https://kauth.kakao.com', 'https://accounts.kakao.com'];

const MAX_SKIP = 5;

function shouldSkip(href: string): boolean {
  return AUTH_PATH_PREFIXES.some((prefix) => href.includes(prefix));
}

export default function AuthHistorySkipper() {
  const pathname = usePathname();
  const { isSkipping, skipCount, startSkip, increment, resetSkip } = useAuthHistorySkipStore();

  useEffect(() => {
    if (!isSkipping && shouldSkip(window.location.href)) {
      startSkip();
      history.back();
    }

    const handlePopState = () => {
      if (shouldSkip(window.location.href)) {
        increment();
        if (skipCount < MAX_SKIP) {
          history.back();
        } else {
          resetSkip();
          window.location.href = '/';
        }
      } else {
        resetSkip();
        window.location.reload();
      }
    };

    if (isSkipping) {
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname, isSkipping, skipCount, startSkip, increment, resetSkip]);

  return null;
}
