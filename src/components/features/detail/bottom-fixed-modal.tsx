'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

import { fetchItemDetail } from '@/services/api/item';
import { Item } from '@/types/item.dto';

interface BottomFixedModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: Item['itemId'];
}

export default function BottomFixedModal({ isOpen, onClose, itemId }: BottomFixedModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 슬라이드 다운 관리용 상태
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setQuantity(1); // 모달 열릴 때마다 수량 초기화
    }
  }, [isOpen]);

  const { data: item } = useQuery({
    queryKey: ['itemDetail', itemId],
    queryFn: () => fetchItemDetail(itemId),
    select: (res) => res.data,
  });

  if (!item) return null;

  const handleClose = () => {
    setIsAnimating(false);
  };

  const handleAnimationComplete = () => {
    if (!isAnimating) {
      onClose();
    }
  };

  if (!mounted) return null;

  // 단품 / 여러 개 조건 (API 응답에 따라 수정)
  const itemCount = 1;
  const isMultiple = itemCount > 1;

  // 수량 조절 함수
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityIncrease = () => {
    if (quantity < itemCount) {
      setQuantity((prev) => prev + 1);
    }
  };

  // 총 가격 계산
  const totalPrice = (item.price * quantity).toLocaleString();

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
              <div className="flex w-full items-center justify-between gap-3">
                {/* 단품 / 수량 조절 버튼 */}
                {isMultiple ? (
                  <div className="flex h-7 w-28 items-center justify-between rounded-[99px] border px-2">
                    <button
                      onClick={handleQuantityDecrease}
                      disabled={quantity <= 1}
                      className="text-grey-9 flex h-8 w-8 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="text-body-02 text-grey-9 text-center font-medium">{quantity}</span>
                    <button
                      onClick={handleQuantityIncrease}
                      disabled={quantity >= itemCount}
                      className="text-grey-9 flex h-8 w-8 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div className="text-grey-6 text-subhead ml-5 flex items-center font-medium">단품</div>
                )}

                {/* 총 가격 */}
                <div className="text-grey-9 flex items-center gap-2">
                  <span className="text-subhead font-medium">총</span>
                  <span className="text-headline-04 font-medium">{totalPrice}원</span>
                </div>
              </div>
            </div>

            {/* 하단 버튼들 */}
            <div className="flex items-center gap-2 self-stretch">
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
