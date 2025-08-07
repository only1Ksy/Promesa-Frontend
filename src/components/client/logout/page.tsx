'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/lib/store/use-auth-store';
import { logoutOnce } from '@/services/api/axios/auth';

export default function ClientLogoutPage() {
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const setHasChecked = useAuthStore((s) => s.setHasChecked);

  useEffect(() => {
    const logout = async () => {
      await logoutOnce();
      setLoggedIn(false);
      setHasChecked(true);
      window.location.replace('/home');
    };

    logout();
  }, [setLoggedIn, setHasChecked]);

  return <div className="h-screen w-full" />;
}
