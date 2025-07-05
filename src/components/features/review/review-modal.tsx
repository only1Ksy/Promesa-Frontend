'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

import ReviewContent from '@/components/features/review/review-content';
import Header from '@/components/layout/header';
import { fetchItemReviews } from '@/services/api/review-controller';

interface ReviewModalProps {
  itemId: number;
}

export default function ReviewModal({ itemId }: ReviewModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  const close = () => router.back();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['itemReview'],
    queryFn: () => fetchItemReviews(),
    select: (res) => res.data,
  });

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  if (isLoading || !reviews) return null;

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="bg-pale-green fixed inset-0 z-999 mx-auto w-full max-w-[var(--frame-width)] overflow-y-auto shadow-lg"
    >
      <Header />
      <div className="pt-11.5">
        <ReviewContent reviews={reviews} itemId={itemId} mode={mode} />
      </div>
    </motion.div>
  );
}
