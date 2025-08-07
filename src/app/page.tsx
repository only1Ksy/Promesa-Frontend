'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PromesaLoginSymbolIcon from '@/public/icons/logo/login-symbol.svg';
import PromesaTextMediumIcon from '@/public/icons/logo/text-md.svg';
import { fetchCarts } from '@/services/api/cart-controller';
import { fetchParentCategories } from '@/services/api/category-controller';
import { fetchExhibitions } from '@/services/api/exhibition-controller';
import { fetchBrandInfo } from '@/services/api/home-controller';
import { fetchNowPopularItems } from '@/services/api/item-controller';

export default function RootSplashPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    router.prefetch('/home');

    const wait = new Promise((resolve) => setTimeout(resolve, 2500));

    const prefetch = async () => {
      await Promise.all([
        wait,
        // home
        queryClient.prefetchQuery({ queryKey: ['brandInfo'], queryFn: fetchBrandInfo }),
        queryClient.prefetchQuery({
          queryKey: ['onGoingExhibitions'],
          queryFn: async () => {
            const data = await fetchExhibitions('ONGOING');
            return data.map((item) => item.summary);
          },
        }),
        queryClient.prefetchQuery({ queryKey: ['nowPopularItems'], queryFn: fetchNowPopularItems }),
        // (routes)/layout
        queryClient.prefetchQuery({
          queryKey: ['itemCategories'],
          queryFn: fetchParentCategories,
        }),
        queryClient.prefetchQuery({
          queryKey: ['carts'],
          queryFn: fetchCarts,
        }),
      ]);

      router.replace('/home');
    };

    prefetch();
  }, [queryClient, router]);

  return (
    <div className="bg-pale-green relative h-screen w-full">
      <Image
        src="/images/splash-background.png"
        alt="스플래시 스크린"
        fill
        priority
        loading="eager"
        className="object-cover"
        onLoad={() => setImageLoaded(true)}
      />
      <div
        className={clsx(
          'relative flex h-full w-full items-center justify-center transition-opacity duration-1000',
          imageLoaded ? 'opacity-100' : 'opacity-0',
        )}
      >
        {imageLoaded && (
          <>
            <div className="absolute top-0 left-0 h-full w-full bg-black/50" />
            <div className="z-999 flex flex-col items-center gap-2 text-white">
              <PromesaLoginSymbolIcon />
              <PromesaTextMediumIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
