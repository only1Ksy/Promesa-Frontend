'use client';

import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import sortItemsWithSection from '@/lib/utils/sort-items-with-section';
import BookmarkEmptyIcon from '@/public/icons/artist/bookmark-empty.svg';
import BookmarkFilledIcon from '@/public/icons/artist/bookmark-filled.svg';
import { fetchArtistList } from '@/services/api/artist-controller';

import ArtistProfileListWithoutImage from './artist-profile-list-without-image';
import ArtistProfileWithImage from './artist-profile-with-image';
import NoWishArtist from './no-wish-artist';

export default function SortedArtistList() {
  const [openNameList, setOpenNameList] = useState(false);
  const [isWishedList, setIsWishedList] = useState(false);

  const { data } = useSuspenseQuery({
    queryKey: ['artistList'],
    queryFn: fetchArtistList,
  });

  const sortedDataWithSection = useMemo(() => {
    return sortItemsWithSection(data, 'profile.name');
  }, [data]);

  // sort with name + wish-/not-wish-list
  const sortedWishDataWithSection = sortedDataWithSection.filter((item) => item.wish.isWishlisted);
  const sortedNotWishDataWithSection = sortedDataWithSection.filter((item) => !item.wish.isWishlisted);
  const displayData = isWishedList
    ? sortedWishDataWithSection
    : [...sortedWishDataWithSection, ...sortedNotWishDataWithSection];

  return (
    <>
      <div className="mx-5 flex flex-col gap-5 pt-5 pb-20">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <p className="text-headline-06 text-black">Artist</p>
          <div className="mr-1 flex items-center gap-2">
            <button onClick={() => setOpenNameList(true)} className="flex cursor-pointer items-center justify-center">
              <p className="text-caption-02 text-grey-6 font-medium underline">Name List</p>
            </button>
            <button
              onClick={() => setIsWishedList((prev) => !prev)}
              className="flex cursor-pointer items-center justify-center"
            >
              {isWishedList ? (
                <BookmarkFilledIcon className="text-grey-8" />
              ) : (
                <BookmarkEmptyIcon className="text-grey-6" />
              )}
            </button>
          </div>
        </div>
        {/* 작가 목록 */}
        {/* 49 = 11.5 (header height) + 5 (padding top) + 7.5 (title height) + 5 (gap) + 20 (padding bottom) */}
        <div className="relative flex min-h-[calc(100vh-var(--spacing)*49)] flex-col gap-3">
          {displayData.length > 0 ? (
            displayData.map((item) => (
              <ArtistProfileWithImage key={item.profile.artistId} artistProfileWithSection={item} />
            ))
          ) : (
            <NoWishArtist />
          )}
        </div>
      </div>
      {/* 작가 이름 목록 */}
      <ArtistProfileListWithoutImage
        sortedDataWithSection={sortedDataWithSection}
        open={openNameList}
        close={() => setOpenNameList(false)}
      />
    </>
  );
}
