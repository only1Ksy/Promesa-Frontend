'use client';

import { useEffect } from 'react';

import ClientError from '@/components/client/layout/error';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ClientError status={error.name} message={error.message} />;
}
