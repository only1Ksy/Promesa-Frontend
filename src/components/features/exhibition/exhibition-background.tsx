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
    <div className="flex flex-col gap-6">
      <div className="bg-green relative h-114 w-full overflow-hidden">
        <ImageWithLoading
          src={data.summary.thumbnailImageUrl}
          alt={`기획전 ${data.summary.title} 의 대표 이미지.`}
          fill
          priority
        />
      </div>
      <div className="mx-5 flex flex-col gap-4">
        <span className="custom-break-words text-grey-9 text-[2.5rem] leading-[125%] font-medium tracking-[-0.1%]">
          {data.summary.title}
        </span>
        <p className="text-subhead text-grey-9 custom-break-words font-medium">{data.summary.description}</p>
      </div>
    </div>
  );
}
