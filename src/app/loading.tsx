import LoadingAnimation from '@/components/layout/loading-animation';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <LoadingAnimation />
    </div>
  );
}
