import Header from '@/components/layout/header';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="h-screen pt-11.5">{children}</div>
    </>
  );
}
