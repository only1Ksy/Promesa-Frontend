'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import ImageWithLoading from '@/components/common/utilities/image-with-loading';
import { fetchExhibition } from '@/services/api/exhibition-controller';

interface ExhibitionBackgroundProps {
  exhibitionId: number;
}

export default function ExhibitionBackground({ exhibitionId }: ExhibitionBackgroundProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['exhibition', exhibitionId],
    queryFn: () => fetchExhibition(exhibitionId),
  });

  return (
    <div className="bg-green relative h-114 w-full overflow-hidden">
      <ImageWithLoading
        src={data.summary.thumbnailImageUrl}
        alt={`기획전 ${data.summary.title} 의 대표 이미지.`}
        fill
        priority
      />
    </div>
  );
}
