'use client';

import React from 'react';
// import clsx from 'clsx';

interface AlertModalProps {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function AlertModal({ message, onConfirm, onClose }: AlertModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="w-80 rounded-xl bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 text-center text-base text-gray-800">{message}</div>
        <button
          onClick={onConfirm}
          className="mt-4 w-full rounded-md bg-orange-500 py-2 text-white hover:bg-orange-600"
        >
          확인
        </button>
      </div>
    </div>
  );
}
