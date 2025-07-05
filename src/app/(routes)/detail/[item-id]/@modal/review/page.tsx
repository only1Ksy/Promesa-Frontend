// `@modal/review/page.tsx`
import ReviewModal from '@/components/features/review/review-modal';

export default function ReviewModalPage({ params }: { params: { 'item-id': string } }) {
  return <ReviewModal itemId={Number(params['item-id'])} />;
}
