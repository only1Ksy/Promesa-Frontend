import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function Routes({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-pale-green fixed top-0 left-1/2 z-900 w-full max-w-[402px] -translate-x-1/2">
        <Header />
      </div>
      {children}
      <Footer />
    </>
  );
}
