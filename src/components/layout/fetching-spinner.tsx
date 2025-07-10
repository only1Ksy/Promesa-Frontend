'use client';

import { useEffect } from 'react';

import LoadingAnimation from '../common/utilities/loading-animation';

export default function FetchingSpinner() {
  // block scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed-component max-z-index top-0 flex min-h-screen items-center justify-center bg-[#000000]/70">
      <LoadingAnimation />
    </div>
  );
}
