'use client';

import { useRouter } from 'next/navigation';

import BackIcon from '@/public/icons/layout/back.svg';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          requestAnimationFrame(() => {
            window.scrollTo(0, 0);
          });
        } else {
          router.replace('/');
        }
      }}
      className="flex cursor-pointer items-center justify-center"
    >
      <BackIcon className="text-grey-9" />
    </button>
  );
}
