'use client';

import { PropsWithChildren, useEffect, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';

interface HorizontalScrollProps extends PropsWithChildren {
  activeId?: string;
  className?: string;
}

export default function HorizontalScrollWithActiveLine({ children, activeId, className }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
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
    const indicator = indicatorRef.current;
    if (!wrap || !activeId || !indicator) return;

    const active = wrap.querySelector<HTMLButtonElement>(`#${activeId}`);
    if (!active) return;

    const left = active.offsetLeft - wrap.clientWidth / 2 + active.clientWidth / 2;
    wrap.scrollTo({ left, behavior: 'smooth' });

    const offsetX = active.offsetLeft - 8;
    const width = active.offsetWidth + 16;

    indicator.style.transform = `translateX(${offsetX}px)`;
    indicator.style.width = `${width}px`;
  };

  useLayoutEffect(scrollToActive);
  useEffect(scrollToActive, [activeId]);

  return (
    <div className="relative pb-3">
      <div ref={containerRef} className={clsx('hide-scrollbar scroll-x-area', className)}>
        {children}
      </div>
      <div className="absolute bottom-0 h-[1.4px] w-full overflow-x-hidden">
        <div className="bg-green absolute bottom-0 h-[1.4px] w-full" />
        <div
          ref={indicatorRef}
          className="bg-grey-9 absolute bottom-0 h-[1.4px] transition-transform duration-500"
          style={{ width: 0, transform: 'translateX(0px)' }}
        />
      </div>
    </div>
  );
}
