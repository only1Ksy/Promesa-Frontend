'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

function normalizeSrc(src: string | undefined): string {
  if (!src) return '';
  if (src.startsWith('/') || src.startsWith('http')) return src;
  return `/${src}`;
}

export default function ImageWithEffect({ src, alt, onLoad, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const safeSrc = normalizeSrc(src.toString());

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="absolute inset-0 h-full w-full" />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!loaded && <div className="shimmer absolute inset-0 z-0" />}
      <Image
        src={safeSrc}
        alt={alt}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={clsx('z-1 transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
        {...rest}
        unoptimized // image transformation
      />
    </div>
  );
}
