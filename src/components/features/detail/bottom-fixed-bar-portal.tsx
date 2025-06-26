'use client';

import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

import { useBottomFixedBarTarget } from '@/lib/utils/portal-target-context';

export default function BottomFixedBarPortal({ children }: PropsWithChildren) {
  const target = useBottomFixedBarTarget();

  if (typeof window === 'undefined' || !target) return null;

  return createPortal(children, target);
}
