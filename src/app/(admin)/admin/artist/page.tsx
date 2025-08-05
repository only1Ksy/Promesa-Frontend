'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { createArtist, updateArtistInfo, updateArtistProfileImage } from '@/services/api/admin/admin-artist-controller';

export default function AdminArtistPage() {
  // mock code
  console.log(useSuspenseQuery);
  console.log(createArtist);
  console.log(updateArtistInfo);
  console.log(updateArtistProfileImage);

  return (
    <div className="flex flex-col">
      <div className="mb-5 pl-5">
        <p className="text-headline-04">아티스트 등록/수정</p>
      </div>
      {/* code */}
    </div>
  );
}
