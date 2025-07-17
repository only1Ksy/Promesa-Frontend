import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';

import QueryProvider from '@/services/query/client';

import '@/styles/globals.css';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  style: 'normal',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '프로메사 - 도예 전공자들의 작품을 전시하고 판매하는 플랫폼',
  description:
    '프로메사는 도예 전공자들의 작품을 전시하고 판매하는 플랫폼입니다. 이 플랫폼은 도예과 학생들이 온라인에서 작품을 판매해 볼 수 있는 소중한 경험을 제공하며, 소비자에게는 오직 하나뿐인 핸드메이드 제품으로 일상을 더 사랑스럽고 특별하게 만들어 줄 수 있습니다. 이곳에서 우리는 예술과 일상이 만나는 교차로를 만들고, 핸드메이드 제품의 가치를 더욱 감각적으로 느낄 수 있도록 지원합니다.',
  manifest: '/manifest.json',
  metadataBase: new URL('https://ceos-promesa.vercel.app'),
  keywords: [],
  openGraph: {
    title: '프로메사 - 도예 전공자들의 작품을 전시하고 판매하는 플랫폼',
    description:
      '프로메사는 도예 전공자들의 작품을 전시하고 판매하는 플랫폼입니다. 이 플랫폼은 도예과 학생들이 온라인에서 작품을 판매해 볼 수 있는 소중한 경험을 제공하며, 소비자에게는 오직 하나뿐인 핸드메이드 제품으로 일상을 더 사랑스럽고 특별하게 만들어 줄 수 있습니다. 이곳에서 우리는 예술과 일상이 만나는 교차로를 만들고, 핸드메이드 제품의 가치를 더욱 감각적으로 느낄 수 있도록 지원합니다.',
    type: 'website',
    siteName: '프로메사',
    url: 'https://promesa.co.kr',
    locale: 'ko_KR',
    countryName: '대한민국',
    images: [
      {
        url: 'https://promesa.co.kr/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: '프로메사 - 도예 전공자들의 작품을 전시하고 판매하는 플랫폼',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '프로메사 - 도예 전공자들의 작품을 전시하고 판매하는 플랫폼',
    description:
      '프로메사는 도예 전공자들의 작품을 전시하고 판매하는 플랫폼입니다. 이 플랫폼은 도예과 학생들이 온라인에서 작품을 판매해 볼 수 있는 소중한 경험을 제공하며, 소비자에게는 오직 하나뿐인 핸드메이드 제품으로 일상을 더 사랑스럽고 특별하게 만들어 줄 수 있습니다. 이곳에서 우리는 예술과 일상이 만나는 교차로를 만들고, 핸드메이드 제품의 가치를 더욱 감각적으로 느낄 수 있도록 지원합니다.',
    images: ['https://promesa.co.kr/icons/icon-512x512.png'],
    creator: undefined,
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Promesa', url: 'https://promesa.co.kr' }],
  creator: 'Promesa',
  publisher: 'Promesa',
  category: null,
  applicationName: '프로메사',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icons/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="beforeInteractive" />
      </head>
      <body className={pretendard.className}>
        <QueryProvider>
          <div className="h-screen w-full">
            <div className="mx-auto max-w-[var(--frame-width)]">{children}</div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
