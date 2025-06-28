'use client';

import { useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

import { useImageLoadingStore } from '@/lib/store/use-image-loading-store';

export default function ImageWithLoading({ src, alt, onLoad, ...rest }: ImageProps) {
  const startLoading = useImageLoadingStore((s) => s.startLoading);
  const endLoading = useImageLoadingStore((s) => s.endLoading);

  useEffect(() => {
    startLoading();
    return endLoading;
  }, [src, startLoading, endLoading]);

  return (
    <Image
      src={src}
      alt={alt}
      onLoad={(e) => {
        endLoading();
        onLoad?.(e);
      }}
      {...rest}
    />
  );
}
