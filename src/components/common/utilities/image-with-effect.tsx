'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

export default function ImageWithEffect({ src, alt, onLoad, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

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
        src={src}
        alt={alt}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={clsx('z-1 transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
        {...rest}
      />
    </div>
  );
}
