'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import ItemPreview from '@/components/common/item/item-preview';
import HighlightedTextSpan from '@/components/common/utilities/highlighted-text-span';
import ImageWithEffect from '@/components/common/utilities/image-with-effect';
import chunkList from '@/lib/utils/chunk-list';
import GoToArtistIcon from '@/public/icons/search/go-to-artist.svg';
import { fetchSearch } from '@/services/api/home-controller';

interface SearchedResultProps {
  keyword: string;
}

export default function SearchedResult({ keyword: initialKeyword }: SearchedResultProps) {
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword') ?? initialKeyword;
  const isCommited = searchParams.get('commited') === 'true' ? true : false;

  const { data } = useSuspenseQuery({
    queryKey: ['search', keyword],
    queryFn: () => fetchSearch(keyword),
  });

  return (
    // 31.5 = 11.5 (header) + 20 (margin bottom)
    <div className="mx-5 mb-20 flex min-h-[calc(100vh-var(--spacing)*31.5)] flex-col gap-2.25">
      {/* 검색된 아티스트 리스트 */}
      {data.artists.length > 0 && (
        <div className="mt-2.5 flex flex-col">
          <div className="my-2.5">
            <p className="text-body-01 font-medium text-black">Artist</p>
          </div>
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
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-body-01 font-medium text-black">
                        <HighlightedTextSpan
                          text={art.profile.name}
                          keyword={!isCommited ? keyword : ''}
                          highlightedClassName="text-orange font-bold"
                        />
                      </p>
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
        <div className="mt-2.5 flex flex-col">
          <div className="my-2.5">
            <p className="text-body-01 font-medium text-black">Product</p>
          </div>
          {!isCommited ? (
            <div className="flex flex-col gap-1">
              {data.itemPreviews.map((item) => (
                <div key={item.itemId} className="my-2.5">
                  <p className="text-body-02 text-grey-9 font-medium">
                    <HighlightedTextSpan
                      text={item.itemName}
                      keyword={!isCommited ? keyword : ''}
                      highlightedClassName="text-orange font-bold"
                    />
                  </p>
                </div>
              ))}
            </div>
          ) : (
            // masonry item list
            <div className="flex flex-col gap-4">
              {chunkList(data.itemPreviews, 3).map((group, idx) => {
                const placeholders = Array(3 - group.length).fill(null);

                return (
                  <div key={idx} className="flex w-full gap-1.75">
                    {group.map((item, idx) => (
                      <ItemPreview key={idx} item={item} maxWidthClass="max-w-29" heightClass="h-62" />
                    ))}
                    {placeholders.map((_, idx) => (
                      <div key={idx} className="h-62 max-w-29 flex-1" />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
