import ClientError from '@/components/client/layout/error';
import { HttpError } from '@/types/axios.dto';

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function Error({ error }: ErrorProps) {
  const status = (error as HttpError).status ?? 500;
  const message = error.message;

  return <ClientError rawError={error} status={status} message={message} />;
}
