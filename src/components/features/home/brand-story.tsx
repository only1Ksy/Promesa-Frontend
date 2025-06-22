'use client';

import { useQuery } from '@tanstack/react-query';

import stringToMultilineTSX from '@/lib/utils/string-to-multiline-tsx';
import PromesaTextMediumIcon from '@/public/icons/logo/text-md.svg';
import { fetchBrandInfo } from '@/services/api/home-controller';

export default function BrandStory() {
  const { data, isLoading } = useQuery({
    queryKey: ['brandInfo'],
    queryFn: fetchBrandInfo,
  });

  if (!data) return null;

  if (isLoading) {
    return (
      <div className="my-12.5 flex w-full gap-15">
        <div className="bg-green my-10.75 h-38.5 w-5.25" />
        <div className="bg-green h-60 w-60" />
        <div className="bg-green my-10.75 h-38.5 w-5.25" />
      </div>
    );
  }

  const brandStory = data.brandStory;

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
