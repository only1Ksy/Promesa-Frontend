'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import stringToMultilineTSX from '@/lib/utils/string-to-multiline-tsx';
import PromesaTextMediumIcon from '@/public/icons/logo/text-md.svg';
import { fetchBrandInfo } from '@/services/api/home-controller';

export default function BrandStory() {
  const { data } = useSuspenseQuery({
    queryKey: ['brandInfo'],
    queryFn: fetchBrandInfo,
  });

  const { brandStory } = data;

  return (
    <div className="mt-2.5 mb-27.5 flex flex-col gap-8">
      <div className="text-body-02 font-regular text-grey-9 flex flex-col items-center gap-1">
        <p>About</p>
        <PromesaTextMediumIcon className="text-black" />
      </div>
      <p className="text-caption-01 text-center font-medium text-black">{stringToMultilineTSX(brandStory)}</p>
    </div>
  );
}
