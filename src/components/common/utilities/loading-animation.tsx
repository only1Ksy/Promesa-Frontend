'use client';

import Lottie from 'react-lottie-player';

import loadingData from '@/public/videos/lottie-loading.json';

export default function LoadingAnimation() {
  return (
    <div className="h-60 w-60">
      <Lottie loop play animationData={loadingData} className="h-full w-full" />
    </div>
  );
}
