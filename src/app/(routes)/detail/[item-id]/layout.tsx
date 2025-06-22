import ClientDetailLayout from '@/components/client/layout/detail-layout';

export default function DetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientDetailLayout>{children}</ClientDetailLayout>;
}
