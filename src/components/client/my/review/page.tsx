'use client';

import { useState } from 'react';

import MyReviewAvailable from '@/components/features/my/review/my-review-available';
import MyReviewToggle from '@/components/features/my/review/my-review-toggle';
import MyReviewWritten from '@/components/features/my/review/my-review-written';

export default function ClientMyReviewPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'written'>('available');

  return (
    <>
      <div className="sticky top-11.5 z-40">
        <MyReviewToggle onSelect={setActiveTab} active={activeTab} />
      </div>
      <div>{activeTab === 'available' ? <MyReviewAvailable /> : <MyReviewWritten />}</div>
    </>
  );
}
