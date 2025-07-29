import ClientReviewWritePage from '@/components/client/my/review/write/page';

export default async function DetailPage({ params: paramsPromise }: { params: Promise<{ 'order-id': string }> }) {
  const params = await paramsPromise;
  const orderId = Number(params['order-id']);

  return <ClientReviewWritePage order={orderId} />;
}
