'use client';

import { useEffect } from 'react';

import { logoutOnce } from '@/services/api/axios/auth';

export default function ClientLogoutPage() {
  useEffect(() => {
    logoutOnce().then(() => {
      window.location.href = '/';
    });
  }, []);

  return <div className="h-screen w-full" />;
}
