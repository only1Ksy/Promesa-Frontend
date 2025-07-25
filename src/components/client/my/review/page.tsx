'use client';

import { useState } from 'react';

import MyReviewAvailable from '@/components/features/my/review/my-review-available';
import MyReviewToggle from '@/components/features/my/review/my-review-toggle';
import MyReviewWritten from '@/components/features/my/review/my-review-written';

export default function ClientMyReviewPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'written'>('available');

  return (
    <div style={{ minHeight: 'calc(100vh - 46px)' }}>
      <div className="sticky top-11.5 z-40">
        <MyReviewToggle onSelect={setActiveTab} active={activeTab} />
      </div>
      <div className="py-8.75">{activeTab === 'available' ? <MyReviewAvailable /> : <MyReviewWritten />}</div>
    </div>
  );
}
