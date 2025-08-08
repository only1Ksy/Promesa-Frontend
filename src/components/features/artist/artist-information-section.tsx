'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';

import Expandable from '@/components/common/utilities/expandable';
import stringToMultilineTSX from '@/lib/utils/string-to-multiline-tsx';
import LinkToInstagramProfileIcon from '@/public/icons/artist/link-to-instagram-profile.svg';
import LinkIcon from '@/public/icons/common/link.svg';
import { fetchArtist } from '@/services/api/artist-controller';

interface ArtistInformationSectionProps {
  artistId: number;
}

export default function ArtistInformationSection({ artistId }: ArtistInformationSectionProps) {
  const [open, setOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const { data } = useSuspenseQuery({
    queryKey: ['artist', artistId],
    queryFn: () => fetchArtist(artistId),
  });

  const { profile } = data;

  const { name, bio, instagramUrl } = profile;

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const spacing = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing'));
    const collapsedPx = 22.5 / spacing;

    setShowToggle(el.scrollHeight > collapsedPx);
  }, [bio]);

  return (
    <section className="mx-5 flex flex-col gap-5">
      {/* 작가 설명 */}
      <div className="flex flex-col gap-1">
        <p className="text-grey-5 text-caption-01 flex items-center gap-1.5 font-medium">
          <span>Artist</span>
          <LinkIcon />
          <span>{name}</span>
        </p>
        <div className="flex items-center justify-between">
          <h4 className="text-headline-04 text-grey-9 flex items-end gap-1">
            <span>{name}</span>
            <span className="font-light">작가</span>
          </h4>
          {instagramUrl && instagramUrl.split('/')[3] !== 'null' && (
            <div className="text-grey-6 flex gap-2">
              <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <LinkToInstagramProfileIcon />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Expandable flag={open} collapsedMaxHeight={22.5}>
        <p
          ref={textRef}
          className="custom-break-words text-body-02 text-grey-7 font-regular"
          style={{ lineHeight: 'var(--tw-leading, 160%)' }} // design change
        >
          {stringToMultilineTSX(bio)}
        </p>
      </Expandable>
      {/* 작가 설명 더보기 / 간략하게 */}
      {showToggle &&
        (open ? (
          <>
            <div className="text-caption-01 text-grey-6 font-medium">
              <button onClick={() => setOpen(false)} className="cursor-pointer">
                <span className="underline">간략하게</span>
              </button>
            </div>
          </>
        ) : (
          <div className="relative -mt-3">
            <div className="to-pale-green from-pale-green/0 absolute bottom-3 left-0 h-25 w-full bg-gradient-to-b from-40% to-90%" />
            <div className="text-caption-01 text-grey-6 bg-pale-green relative z-5 font-medium">
              <button onClick={() => setOpen(true)} className="cursor-pointer">
                <span className="underline">작가 설명 더보기</span>
              </button>
            </div>
          </div>
        ))}
    </section>
  );
}
