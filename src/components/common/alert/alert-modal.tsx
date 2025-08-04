'use client';

import clsx from 'clsx';

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
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-pale-green/90 w-80 rounded-xs px-3.5 pt-7 pb-5 shadow-md" onClick={(e) => e.stopPropagation()}>
        <p className="text-body-02 text-center font-medium">{message}</p>
        <div className="mt-4 flex gap-2">
          {cancelText && (
            <button
              onClick={handleCancel}
              className="text-body-01 h-12 w-38 cursor-pointer rounded-xs border-[1.5px] py-2 font-bold text-black"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={handleConfirm}
            className={clsx(
              'text-body-01 text-grey-1 h-12 cursor-pointer rounded-xs bg-black py-2 font-bold',
              cancelText ? 'w-38' : 'w-full',
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
