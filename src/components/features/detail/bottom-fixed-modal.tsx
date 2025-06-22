'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface BottomFixedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BottomFixedModal({ isOpen, onClose }: BottomFixedModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // 브라우저 렌더링 이후에만 포탈 렌더링
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-end justify-center">
      {/* 배경 */}
      <div className="fixed inset-0 h-screen w-screen" onClick={onClose} />

      {/* 모달 본체 */}
      <div
        className="border-green bg-pale-green relative z-[9999] w-full max-w-101 border-t px-5 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-start gap-5 self-stretch py-5">
          <div className="flex w-full items-center justify-between gap-3 pl-5">
            <div className="text-grey-6 text-subhead flex items-center font-medium">단품</div>
            <div className="text-grey-9 text-headline-04 font-medium">총 27,000원</div>
          </div>
        </div>
        <div className="flex items-center gap-2 self-stretch">
          <button className="text-body-01 border-grey-9 flex h-12 w-59 items-center justify-center gap-[10px] border font-bold">
            장바구니
          </button>
          <button className="text-body-01 bg-grey-9 flex h-12 w-full items-center justify-center gap-[10px] font-bold text-white">
            구매하기
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
