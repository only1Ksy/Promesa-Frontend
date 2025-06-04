'use client';

import { useEffect, useRef } from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function ClientRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current = document.getElementById('frame') as HTMLDivElement;
  }, []);

  return (
    <>
      <div className="bg-pale-green fixed top-0 left-1/2 z-900 w-full max-w-[402px] -translate-x-1/2">
        <Header />
      </div>
      <div className="mt-11.5">{children}</div>
      <Footer scrollRef={scrollRef} />
    </>
  );
}
