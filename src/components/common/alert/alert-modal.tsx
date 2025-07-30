'use client';

interface AlertModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function AlertModal({
  visible,
  message,
  onClose,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText,
}: AlertModalProps) {
  if (!visible) return null;

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-80 rounded-sm bg-white p-6 shadow-md" onClick={(e) => e.stopPropagation()}>
        <p className="text-center text-gray-800">{message}</p>
        <div className="mt-4 flex gap-2">
          {cancelText && (
            <button onClick={handleCancel} className="w-1/2 rounded-sm bg-gray-300 py-2 text-white">
              {cancelText}
            </button>
          )}
          <button onClick={handleConfirm} className="bg-orange w-full rounded-sm py-2 text-white">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
