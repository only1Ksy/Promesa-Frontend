'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { ParsedItemData } from '@/types/item-controller';

interface BottomFixedModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ParsedItemData;
}

export default function BottomFixedModal({ isOpen, onClose, item }: BottomFixedModalProps) {
  const [mounted, setMounted] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setInternalOpen(true);
      setQuantity(1);
    }
  }, [isOpen]);

  if (!mounted || !internalOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleExitComplete = () => {
    setInternalOpen(false);
  };

  // 단일 상품 구매하기 (order) API 호출
  const onGetItemClicked = () => {
    const query = new URLSearchParams({
      mode: 'one',
      id: item.itemId.toString(),
      num: quantity.toString(),
    });

    router.push(`/order?${query.toString()}`);
  };

  // 수량 조절
  const itemCount = item.stock;
  const isSoldOut = item.soldOut;
  const isMultiple = itemCount > 1;

  const handleQuantityDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleQuantityIncrease = () => {
    if (quantity < itemCount) setQuantity((prev) => prev + 1);
  };

  const totalPrice = (item.price * quantity).toLocaleString();

  return createPortal(
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center">
          {/* 배경 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50"
            onClick={handleClose}
          />

          {/* 모달 본체 */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="border-green bg-pale-green relative z-[10000] w-full max-w-101 border-t px-5 pb-4 shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-start gap-5 self-stretch py-5">
              <div className="flex w-full items-center justify-between gap-3">
                {isMultiple ? (
                  <div className="flex h-7 w-28 items-center justify-between rounded-[99px] border px-2">
                    <button
                      onClick={handleQuantityDecrease}
                      disabled={quantity <= 1}
                      className="text-grey-9 flex h-8 w-8 cursor-pointer items-center justify-center disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="text-body-02 text-grey-9 text-center font-medium">{quantity}</span>
                    <button
                      onClick={handleQuantityIncrease}
                      disabled={quantity >= itemCount}
                      className="text-grey-9 flex h-8 w-8 cursor-pointer items-center justify-center disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <div
                    className={clsx(
                      'text-subhead ml-5 flex items-center font-medium',
                      isSoldOut ? 'text-grey-9 opacity-40' : 'text-grey-6',
                    )}
                  >
                    {isSoldOut ? '품절' : '단품'}
                  </div>
                )}

                <div className={clsx('text-grey-9 flex items-center gap-2', isSoldOut ? 'opacity-40' : '')}>
                  {!isSoldOut && <span className="text-subhead font-medium">총</span>}
                  <span className="text-headline-04 font-medium">{totalPrice}원</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch">
              <button
                disabled={isSoldOut}
                className={clsx(
                  'text-body-01 border-grey-9 flex h-12 w-59 items-center justify-center rounded-xs border font-bold',
                  isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
              >
                장바구니
              </button>
              <button
                disabled={isSoldOut}
                onClick={onGetItemClicked}
                className={clsx(
                  'text-body-01 bg-grey-9 flex h-12 w-full items-center justify-center rounded-xs font-bold text-white',
                  isSoldOut ? 'cursor-not-allowed' : 'cursor-pointer',
                )}
              >
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
