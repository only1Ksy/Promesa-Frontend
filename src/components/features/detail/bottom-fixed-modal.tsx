'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

interface BottomFixedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BottomFixedModal({ isOpen, onClose }: BottomFixedModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 슬라이드 다운 관리용 상태
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
  };

  const handleAnimationComplete = () => {
    if (!isAnimating) {
      onClose();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          {/* 배경 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isAnimating ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 h-screen w-screen bg-black/50"
            onClick={handleClose}
          />

          {/* 모달 본체 */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: isAnimating ? 0 : '100%' }}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            onAnimationComplete={handleAnimationComplete}
            className="border-green bg-pale-green relative z-[10000] w-full max-w-101 border-t px-5 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-start gap-5 self-stretch py-5">
              <div className="flex w-full items-center justify-between gap-3 pl-5">
                <div className="text-grey-6 text-subhead flex items-center font-medium">단품</div>
                <div className="text-grey-9 text-headline-04 font-medium">총 27,000원</div>
              </div>
            </div>
            <div className="flex items-center gap-2 self-stretch pb-5">
              <button className="text-body-01 border-grey-9 flex h-12 w-59 cursor-pointer items-center justify-center gap-2.5 border font-bold">
                장바구니
              </button>
              <button className="text-body-01 bg-grey-9 flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 font-bold text-white">
                구매하기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
