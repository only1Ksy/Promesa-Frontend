import LoadingAnimation from '@/components/common/utilities/loading-animation';

export default function Loading() {
  return (
    <div className="bg-pale-green flex min-h-screen w-full items-center justify-center">
      <LoadingAnimation />
    </div>
  );
}
