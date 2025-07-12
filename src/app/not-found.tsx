import ClientError from '@/components/client/layout/error';

export default function NotFound() {
  return <ClientError status="404" message="현재 페이지를 찾을 수 없습니다." />;
}
