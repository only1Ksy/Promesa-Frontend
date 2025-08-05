import ClientAuthLayout from '@/components/client/layout/auth-layout';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientAuthLayout>{children}</ClientAuthLayout>;
}
