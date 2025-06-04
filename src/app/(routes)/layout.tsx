import ClientRoutesLayout from './client-layout';

export default function RoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientRoutesLayout>{children}</ClientRoutesLayout>;
}
