'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';

export default function ImageWithEffect({ src, alt, className, onLoad, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={clsx('relative h-full w-full overflow-hidden', className)}>
      {!loaded && <div className="bg-grey-2 absolute inset-0 z-0 animate-pulse" />}
      <Image
        src={src}
        alt={alt}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={clsx('z-10 transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
        {...rest}
      />
    </div>
  );
}
