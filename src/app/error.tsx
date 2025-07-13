'use client';

import { useEffect } from 'react';

import ClientError from '@/components/client/layout/error';

interface ErrorProps {
  error: Error & { status?: number; digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ClientError status={(error.status ?? 500).toString()} message={error.message} />;
}
