'use client';

import Lottie from 'react-lottie-player';

import loadingData from '@/public/videos/lottie-loading.json';

export default function LoadingAnimation() {
  return (
    <div className="h-50 w-50">
      <Lottie loop play animationData={loadingData} className="h-full w-full" />
    </div>
  );
}
