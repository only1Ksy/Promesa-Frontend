'use client';

import { useState } from 'react';

import ListWithImage from '@/components/features/home/artists/list-with-image';
import ListWithoutImage from '@/components/features/home/artists/list-without-image';
import BookmarkEmptyIcon from '@/public/icons/artist/bookmark-empty.svg';
import BookmarkFilledIcon from '@/public/icons/artist/bookmark-filled.svg';

export default function ClientHomeArtistsPage() {
  const [showNameList, setShowNameList] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [mockToggleWIshList, setMockToggleWishList] = useState([false, true, false, false, false]);

  const toggleWish = (artistId: number) => {
    const idx = artistId - 1;
    setMockToggleWishList((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  const mockArtistList = [
    {
      artistId: 1,
      koName: '0=',
      enName: 'Young Eun',
      src: '/images/mock/artist-1.png',
      isWishListed: mockToggleWIshList[0],
      wishCount: 28,
    },
    {
      artistId: 2,
      koName: '홍길동',
      enName: 'Hong Gildong',
      src: '/images/mock/artist-2.png',
      isWishListed: mockToggleWIshList[1],
      wishCount: 144,
    },
    {
      artistId: 3,
      koName: '이호영',
      enName: 'Lee Hoyoung',
      src: '/images/mock/artist-3-5.png',
      isWishListed: mockToggleWIshList[2],
      wishCount: 28,
    },
    {
      artistId: 4,
      koName: '이호영',
      enName: 'Lee Hoyoung',
      src: '/images/mock/artist-3-5.png',
      isWishListed: mockToggleWIshList[3],
      wishCount: 28,
    },
    {
      artistId: 5,
      koName: '이호영',
      enName: 'Lee Hoyoung',
      src: '/images/mock/artist-3-5.png',
      isWishListed: mockToggleWIshList[4],
      wishCount: 28,
    },
  ];

  return (
    <div className="-mt-11.5 min-h-screen">
      <div className="mx-5 flex flex-col gap-5 pt-16.5 pb-8.5">
        <div className="flex items-center justify-between">
          <p className="text-headline-06 text-black">ARTIST</p>
          <div className="mr-1 flex items-center gap-2">
            <button
              onClick={() => setShowNameList((prev) => !prev)}
              className="flex cursor-pointer items-center justify-center"
            >
              <p className="text-caption-02 text-grey-6 font-medium underline">Name List</p>
            </button>
            <button
              onClick={() => setFiltered((prev) => !prev)}
              className="flex cursor-pointer items-center justify-center"
            >
              {filtered ? (
                <BookmarkFilledIcon className="text-grey-8" />
              ) : (
                <BookmarkEmptyIcon className="text-grey-6" />
              )}
            </button>
          </div>
        </div>
        {/* mock artist list */}
        {mockArtistList.map((data, idx) => {
          if (filtered && !data.isWishListed) return;

          return (
            <ListWithImage
              key={idx}
              artistId={data.artistId}
              koName={data.koName}
              enName={data.enName}
              src={data.src}
              isWishListed={data.isWishListed}
              wishCount={data.wishCount}
              toggleWish={toggleWish}
            />
          );
        })}
      </div>
      <ListWithoutImage open={showNameList} close={() => setShowNameList(false)} />
    </div>
  );
}
