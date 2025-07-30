// components/features/order/bottom-fixed-bar.tsx
import clsx from 'clsx';

interface BottomFixedBarProps {
  handleUpload: () => void;
  barText: string;
  isUploadable: boolean;
}

export default function BottomFixedBar({ handleUpload, barText, isUploadable }: BottomFixedBarProps) {
  return (
    <div className="bg-pale-green home-shadow flex h-21 w-full px-5 py-3">
      <button
        className={clsx(
          'text-body-01 w-full rounded-xs py-2 font-bold',
          isUploadable ? 'cursor-pointer bg-black text-white' : 'bg-grey-4 cursor-not-allowed text-white',
        )}
        onClick={handleUpload}
      >
        {barText}
      </button>
    </div>
  );
}
