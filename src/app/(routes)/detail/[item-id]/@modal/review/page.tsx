import ReviewModal from '@/components/features/review/review-modal';

export default async function ReviewModalPage({ params }: { params: Promise<{ 'item-id': string }> }) {
  const resolvedParams = await params;
  return <ReviewModal itemId={Number(resolvedParams['item-id'])} />;
}
