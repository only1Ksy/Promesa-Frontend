'use client';

import { createRef, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { EN_SECTION, EXTRA_SECTION, KO_SECTION } from '@/lib/constants/artist-home-section';
import CloseIcon from '@/public/icons/layout/close.svg';

const sections = [...KO_SECTION, '', ...EN_SECTION, '', ...EXTRA_SECTION] as const;
const execSections = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'A...Z'] as const;

interface ListWithoutImageProps {
  open: boolean;
  close: () => void;
}

export default function ListWithoutImage({ open, close }: ListWithoutImageProps) {
  const sectionRefs = useMemo(() => {
    return Object.fromEntries(sections.map((s) => [s, createRef<HTMLDivElement>()])) as Record<
      string,
      React.RefObject<HTMLDivElement>
    >;
  }, []);

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
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const MockArtistComponent = ({ artistId }: { artistId: number }) => {
    return (
      <Link href={`/artist/${artistId}`}>
        <div className="flex items-center gap-2">
          <p className="text-subhead font-medium text-black">아티스트</p>
          <p className="text-body-02 font-regular text-grey-5">Artist</p>
        </div>
      </Link>
    );
  };

  return (
    <>
      {open && <div onClick={close} className="fixed-component max-z-index top-0 h-25.5" />}
      <div
        className={clsx(
          'fixed-component max-z-index bg-pale-green outline-green top-25.5 flex-col rounded-t-[20px] px-5 pt-5 shadow-[0px_-4px_60px_0px_rgba(0,0,0,0.2)] outline',
          'transition-transform duration-500',
          open ? 'translate-y-0' : 'translate-y-full',
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
            <div ref={sectionRefs['ㄱ']} className="flex flex-col gap-3">
              <p className="text-caption-01 font-bold text-black">ㄱ</p>
              <div className="flex flex-col gap-4">
                <MockArtistComponent artistId={1} />
                <MockArtistComponent artistId={2} />
              </div>
            </div>
            <div ref={sectionRefs['ㄴ']} className="flex flex-col gap-3">
              <p className="text-caption-01 font-bold text-black">ㄴ</p>
              <div className="flex flex-col gap-4">
                <MockArtistComponent artistId={3} />
                <MockArtistComponent artistId={4} />
              </div>
            </div>
            <div ref={sectionRefs['ㄷ']} className="flex flex-col gap-3">
              <p className="text-caption-01 font-bold text-black">ㄷ</p>
              <div className="flex flex-col gap-4">
                <MockArtistComponent artistId={5} />
                <MockArtistComponent artistId={6} />
              </div>
            </div>
            <div ref={sectionRefs['ㄹ']} className="flex flex-col gap-3">
              <p className="text-caption-01 font-bold text-black">ㄹ</p>
              <div className="flex flex-col gap-4">
                <MockArtistComponent artistId={7} />
                <MockArtistComponent artistId={8} />
              </div>
            </div>
            <div ref={sectionRefs['ㅁ']} className="flex flex-col gap-3">
              <p className="text-caption-01 font-bold text-black">ㅁ</p>
              <div className="flex flex-col gap-4">
                <MockArtistComponent artistId={9} />
                <MockArtistComponent artistId={10} />
              </div>
            </div>
            <div ref={sectionRefs['ㅂ']} className="flex flex-col gap-3">
              <p className="text-caption-01 font-bold text-black">ㅂ</p>
              <div className="flex flex-col gap-4">
                <MockArtistComponent artistId={11} />
                <MockArtistComponent artistId={12} />
              </div>
            </div>
            <div ref={sectionRefs['A...Z']} className="flex flex-col gap-3">
              <p className="text-caption-01 font-bold text-black">A...Z</p>
              <div className="flex flex-col gap-4">
                <MockArtistComponent artistId={13} />
                <MockArtistComponent artistId={14} />
              </div>
            </div>
          </div>
          {/* scroll to section */}
          <div className="sticky top-0 right-0 z-10 flex flex-col items-center justify-center gap-2">
            {sections.map((s, idx) =>
              s !== '' ? (
                <button
                  key={idx}
                  onClick={() => handleScroll(s)}
                  className={clsx(
                    'flex items-center justify-center',
                    execSections.includes(s as (typeof execSections)[number]) && 'cursor-pointer',
                  )}
                >
                  <span className={clsx('text-caption-01 font-bold text-black')}>
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
