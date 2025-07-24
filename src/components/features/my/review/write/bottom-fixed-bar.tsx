// components/features/order/bottom-fixed-bar.tsx
interface BottomFixedBarProps {
  handleUpload: () => void;
}

export default function BottomFixedBar({ handleUpload }: BottomFixedBarProps) {
  return (
    <div className="bg-pale-green home-shadow flex h-21 w-full px-5 py-3">
      <button
        className="text-body-01 w-full cursor-pointer rounded-xs bg-black py-2 font-bold text-white"
        onClick={handleUpload}
      >
        등록하기
      </button>
    </div>
  );
}
