'use client';

import Header from '@/components/layout/header';

export default function ClientAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
