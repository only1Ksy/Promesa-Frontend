'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import Link from 'next/link';

import stringToMultilineTSX from '@/lib/utils/string-to-multiline-tsx';
import LinkToHomePageIcon from '@/public/icons/artist/link-to-home-page.svg';
import LinkToInstagramProfileIcon from '@/public/icons/artist/link-to-instagram-profile.svg';
import LinkIcon from '@/public/icons/common/link.svg';
import type { Artist } from '@/services/api/artist';
import { fetchArtistInformation } from '@/services/api/artist';

interface ArtistInformationSectionProps {
  artistId: Artist['artistId'];
}

export default function ArtistInformationSection({ artistId }: ArtistInformationSectionProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: information, isLoading } = useQuery({
    queryKey: ['artistInformation', artistId],
    queryFn: () => fetchArtistInformation(artistId),
    select: (res) => res.data,
  });

  useEffect(() => {
    const el = contentRef.current;

    if (!el) return;

    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    if (open) {
      const scrollHeight = el.scrollHeight;
      el.style.maxHeight = scrollHeight / rootFontSize + 'rem';
    } else {
      el.style.maxHeight = 'calc(var(--spacing) * 50)';
    }
  }, [open]);

  if (!information) return null;

  if (isLoading) return null;

  const { artistName, artistDescription } = information;

  return (
    <div
      ref={contentRef}
      className={clsx('relative mx-5 flex flex-col gap-5 overflow-hidden transition-all ease-in-out', !open && 'h-50')}
    >
      <div className="flex flex-col gap-1">
        <div className="text-grey-5 text-caption-01 flex items-center gap-1.5 font-medium">
          <span>Artist</span>
          <LinkIcon />
          <span>{artistName}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-headline-04 text-grey-9 flex items-end gap-1">
            <span>{artistName}</span>
            <span className="font-light">작가</span>
          </div>
          <div className="text-grey-6 flex gap-2">
            <Link href="https://ceos-sinchon.com/" target="_blank" rel="noopener noreferrer">
              <LinkToHomePageIcon />
            </Link>
            <Link href="https://www.instagram.com/promesa_ceramic/" target="_blank" rel="noopener noreferrer">
              <LinkToInstagramProfileIcon />
            </Link>
          </div>
        </div>
      </div>

      <span className="custom-break-words text-caption-01 text-grey-7 font-medium">
        {stringToMultilineTSX(artistDescription)}
      </span>

      {/* 작가 설명 더보기 */}
      {!open && (
        <>
          <div className="to-pale-green from-pale-green/0 absolute bottom-0 left-0 z-5 h-25 w-full bg-gradient-to-b from-40% to-80%" />
          <div className="text-caption-01 text-grey-6 bg-pale-green absolute bottom-0 left-0 z-10 flex h-5 w-full items-end font-medium">
            <button onClick={() => setOpen(true)} className="cursor-pointer">
              <span className="underline">작가 설명 더보기</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
