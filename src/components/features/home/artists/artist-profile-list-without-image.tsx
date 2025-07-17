'use client';

import { createRef, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import CloseIcon from '@/public/icons/layout/close.svg';
import type { ArtistResponseSchema } from '@/types/artist-controller';

interface ArtistProfileListWithoutImage {
  sortedDataWithSection: (ArtistResponseSchema & {
    section: string;
  })[];
  open: boolean;
  close: () => void;
}

export default function ArtistProfileListWithoutImage({
  sortedDataWithSection,
  open,
  close,
}: ArtistProfileListWithoutImage) {
  const sections = useMemo(() => {
    const unique = new Set<string>();
    for (const item of sortedDataWithSection) {
      unique.add(item.section);
    }

    return Array.from(unique).sort((a, b) => {
      if (a === '#') return 1;
      if (b === '#') return -1;

      if (a === 'A...Z') {
        return b === '#' ? -1 : 1;
      }
      if (b === 'A...Z') {
        return a === '#' ? 1 : -1;
      }

      return a.localeCompare(b, 'ko');
    });
  }, [sortedDataWithSection]);

  const sectionRefs = useMemo(() => {
    return Object.fromEntries(sections.map((s) => [s, createRef<HTMLDivElement>()])) as Record<
      string,
      React.RefObject<HTMLDivElement>
    >;
  }, [sections]);

  const sectionedData = useMemo(() => {
    return sortedDataWithSection.reduce<Record<string, typeof sortedDataWithSection>>((acc, item) => {
      const section = item.section;
      if (!acc[section]) {
        acc[section] = [];
      }

      // mock extended data
      for (let i = 0; i < 10; i++) {
        acc[section].push(item);
      }
      return acc;
    }, {});
  }, [sortedDataWithSection]);

  // block scroll
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleScroll = (section: string) => {
    sectionRefs[section].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {open && <div onClick={close} className="fixed-component max-z-index top-0 h-25.5" />}
      <div
        className={clsx(
          'fixed-component max-z-index bg-pale-green top-25.5 min-h-screen flex-col rounded-t-[20px] px-5 pt-5',
          'transition-transform duration-500',
          open ? 'outline-green translate-y-0 shadow-[0px_-4px_60px_0px_rgba(0,0,0,0.2)] outline' : 'translate-y-full',
        )}
      >
        <div className="flex items-center justify-end">
          <button onClick={close} className="flex cursor-pointer items-center justify-center">
            <CloseIcon className="text-grey-9" />
          </button>
        </div>
        <div className="relative flex justify-between">
          {/* 38 = 25.5 + 7.5 (header height) + 5 (top padding) */}
          <div className="hide-scrollbar flex max-h-[calc(100vh-var(--spacing)_*_38))] flex-1 flex-col gap-7 overflow-y-auto pb-13.5">
            {Object.entries(sectionedData).map(([section, items]) => (
              <div key={section} ref={sectionRefs[section]} className="flex flex-col gap-3">
                <p className="text-caption-01 font-bold text-black">{section}</p>
                <div className="flex flex-col gap-4">
                  {items.map((item, idx) => (
                    <Link key={idx} href={`/artist/${item.profile.artistId}`} className="w-fit">
                      <div className="flex items-center gap-2">
                        <p className="text-subhead font-medium text-black">{item.profile.name}</p>
                        <p className="text-body-02 font-regular text-grey-5">{item.profile.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* scroll to section */}
          <div className="sticky top-0 right-0 z-10 flex flex-col items-center justify-center gap-2">
            {sections.map((s, idx) =>
              s !== '' ? (
                <button
                  key={idx}
                  onClick={() => handleScroll(s)}
                  className="flex cursor-pointer items-center justify-center"
                >
                  <span className="text-caption-01 font-bold text-black">
                    {s !== 'A...Z' ? (
                      s
                    ) : (
                      <div className="flex flex-col items-center">
                        <p>A</p>
                        <p className="rotate-90 pb-1.5">...</p>
                        <p>Z</p>
                      </div>
                    )}
                  </span>
                </button>
              ) : (
                <hr key={idx} className="border-grey-4 w-2.5 border" />
              ),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
