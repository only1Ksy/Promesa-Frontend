'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import clsx from 'clsx';

type HorizontalScrollProps = PropsWithChildren<{
  className?: string;
}>;

export default function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 0.5;

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

  return (
    <div ref={containerRef} className={clsx('hide-scrollbar scroll-x-area', className)}>
      {children}
    </div>
  );
}
