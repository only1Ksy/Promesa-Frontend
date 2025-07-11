'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { useBottomFixedBarTarget } from '@/lib/utils/portal-target-context';

export default function BottomFixedBarPortal({ children }: PropsWithChildren) {
  const ref = useBottomFixedBarTarget();
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (ref) {
      setTarget(ref);
    } else {
      const retry = setTimeout(() => {
        const dom = document.querySelector('.fixed-component.bottom-0') as HTMLElement | null;
        if (dom) {
          setTarget(dom);
        }
      }, 100);

      return () => clearTimeout(retry);
    }
  }, [ref]);

  if (!target) return null;

  return createPortal(children, target);
}
