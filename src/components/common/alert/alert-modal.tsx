'use client';

interface AlertModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export default function AlertModal({ visible, message, onClose }: AlertModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-80 rounded-sm bg-white p-6 shadow-md" onClick={(e) => e.stopPropagation()}>
        <p className="text-center text-gray-800">{message}</p>
        <button onClick={onClose} className="bg-orange mt-4 w-full cursor-pointer rounded-sm py-2 text-white">
          확인
        </button>
      </div>
    </div>
  );
}
