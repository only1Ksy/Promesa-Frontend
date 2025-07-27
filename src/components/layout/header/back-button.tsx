'use client';

import { useRouter } from 'next/navigation';

import BackIcon from '@/public/icons/layout/back.svg';

interface BackButtonProps {
  backPath?: string;
}

export default function BackButton({ backPath }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (backPath) {
          router.push(backPath);
        } else if (window.history.length > 1) {
          router.back();
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
