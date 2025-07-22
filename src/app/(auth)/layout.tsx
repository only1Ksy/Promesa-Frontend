import ClientAuthLayout from '@/components/client/layout/auth-layout';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientAuthLayout>{children}</ClientAuthLayout>;
}
