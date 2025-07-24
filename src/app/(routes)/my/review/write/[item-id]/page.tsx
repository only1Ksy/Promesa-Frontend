import ClientReviewWritePage from '@/components/client/my/review/write/page';

export default async function DetailPage({ params: paramsPromise }: { params: Promise<{ 'item-id': string }> }) {
  const params = await paramsPromise;
  const itemId = Number(params['item-id']);

  return <ClientReviewWritePage itemId={itemId} />;
}
