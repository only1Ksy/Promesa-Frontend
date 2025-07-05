'use client';

import { useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';

interface ExpandableProps {
  flag: boolean;
  collapsedMaxHeight: number;
  durationTime?: number;
  className?: string;
  children: React.ReactNode;
}

export default function Expandable({
  flag,
  collapsedMaxHeight,
  durationTime = 300,
  className,
  children,
}: ExpandableProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    requestAnimationFrame(() => {
      el.style.transition = `max-height ${durationTime}ms`;
      el.style.maxHeight = flag
        ? `${el.scrollHeight / rootFontSize}rem`
        : `calc(var(--spacing) * ${collapsedMaxHeight})`;
    });
  }, [flag, collapsedMaxHeight, durationTime]);

  return (
    <div
      ref={contentRef}
      className={clsx('overflow-hidden', className)}
      style={{
        transition: `max-height ${durationTime}ms`,
        maxHeight: `calc(var(--spacing) * ${collapsedMaxHeight})`,
      }}
    >
      {children}
    </div>
  );
}
