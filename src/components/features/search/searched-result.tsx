'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import GoToArtistIcon from '@/public/icons/search/go-to-artist.svg';
import { fetchSearch } from '@/services/api/home-controller';

interface SearchedResultProps {
  keyword: string;
}

export default function SearchedResult({ keyword: initialKeyword }: SearchedResultProps) {
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') ?? initialKeyword;

  const { data } = useSuspenseQuery({
    queryKey: ['search', keyword],
    queryFn: () => fetchSearch(keyword),
  });

  return (
    <div className="mx-5 flex min-h-[calc(100vh-var(--spacing)*11.5)] flex-col gap-3.5">
      {/* 검색된 아티스트 리스트 */}
      {data.artists.length > 0 && (
        <div className="mt-2.5 flex flex-col gap-2.5">
          <div className="flex flex-col">
            {data.artists.map((art) => (
              <Link key={art.profile.artistId} href={`/artist/${art.profile.artistId}`}>
                <div className="my-2 flex h-12 justify-between">
                  <div className="flex gap-4">
                    <div className="bg-green h-full w-12 overflow-hidden rounded-full">
                      <ImageWithEffect
                        src={art.profile.profileImageUrl}
                        alt={`아티스트 ${art.profile.name} 의 프로필 이미지`}
                        fill
                      />
                    </div>
                    <div className="flex flex-col justify-end">
                      <p className="text-body-01 font-medium text-black">{art.profile.name}</p>
                      <p className="text-caption-01 text-grey-5 font-medium">Artist</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <GoToArtistIcon className="text-grey-9" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {/* 구분선 */}
      {data.artists.length > 0 && data.itemPreviews.length > 0 && <hr className="border-t-grey-2 border-t" />}
      {/* 검색된 작품 리스트 */}
      {data.itemPreviews.length > 0 && (
        <div className="mt-2.5 flex flex-col gap-2.5">
          <div className="my-2.5">
            <p className="text-body-01 font-medium text-black">Product</p>
          </div>
          <div className="flex flex-col gap-5">
            {data.itemPreviews.map((item) => (
              <p key={item.itemId} className="text-body-01 font-medium text-black">
                {item.itemName}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
