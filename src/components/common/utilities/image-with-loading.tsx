'use client';

import { useEffect, useState } from 'react';
import Image, { ImageProps } from 'next/image';

import { useImageLoadingStore } from '@/lib/store/use-image-loading-store';

function normalizeSrc(src: string | undefined): string {
  if (!src) return '';
  if (src.startsWith('/') || src.startsWith('http')) return src;
  return `/${src}`;
}

export default function ImageWithLoading({ src, alt, onLoad, ...rest }: ImageProps) {
  const startLoading = useImageLoadingStore((s) => s.startLoading);
  const endLoading = useImageLoadingStore((s) => s.endLoading);
  const [isClient, setIsClient] = useState(false);

  const safeSrc = normalizeSrc(src?.toString() ?? null);

  useEffect(() => {
    setIsClient(true);
    startLoading();
    return endLoading;
  }, [src, startLoading, endLoading]);

  if (!isClient) {
    return <div className="absolute inset-0 h-full w-full" />;
  }

  return (
    <Image
      src={safeSrc}
      alt={alt}
      onLoad={(e) => {
        endLoading();
        onLoad?.(e);
      }}
      {...rest}
      unoptimized // image transformation
    />
  );
}
