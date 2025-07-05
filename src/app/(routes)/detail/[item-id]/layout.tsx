export default function DetailLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const isModal = modal !== null && modal !== undefined;

  return (
    <>
      {children}
      {isModal && modal}
    </>
  );
}
