import ClientRoutesLayout from '@/components/layout/client/client-routes-layout';

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientRoutesLayout>{children}</ClientRoutesLayout>;
}
