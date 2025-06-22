'use client';

import { PropsWithChildren, useEffect, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';

interface HorizontalScrollProps extends PropsWithChildren {
  activeId?: string;
  className?: string;
}

export default function HorizontalScrollwithActive({ children, activeId, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 0.15;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        el.scrollLeft += e.deltaY * scrollSpeed;
        e.preventDefault();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // active
  const scrollToActive = () => {
    const wrap = containerRef.current;
    if (!wrap || !activeId) return;

    const active = wrap.querySelector<HTMLButtonElement>(`#${activeId}`);
    if (!active) return;

    active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  useLayoutEffect(scrollToActive);
  useEffect(scrollToActive, [activeId]);

  return (
    <div ref={containerRef} className={clsx('hide-scrollbar scroll-x-area', className)}>
      {children}
    </div>
  );
}
