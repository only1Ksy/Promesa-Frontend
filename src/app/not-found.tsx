import ClientErrorTemplate from '@/components/client/layout/error-template';

export default function NotFound() {
  return <ClientErrorTemplate status={404} message="현재 페이지를 찾을 수 없습니다." />;
}
