import ClientRoutesLayout from '@/components/client/layout/routes-layout';

export default async function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientRoutesLayout>{children}</ClientRoutesLayout>;
}
