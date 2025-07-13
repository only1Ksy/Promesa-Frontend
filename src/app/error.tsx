'use client';

import { useEffect } from 'react';

import ClientErrorTemplate from '@/components/client/layout/error-template';
import { HttpError } from '@/types/axios.dto';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  const status = (error as HttpError).status ?? 500;
  const message = error.message;

  useEffect(() => {
    console.log(error);
  }, [error]);

  return <ClientErrorTemplate status={status} message={message} />;
}
