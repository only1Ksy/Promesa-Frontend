// components/ImageZoomModal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';

interface ImageZoomModalProps {
  src: string;
  onClose: () => void;
}

export default function ImageZoomModal({ src, onClose }: ImageZoomModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);

  // ESC 키 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  // 마우스 휠 줌
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 1), 3)); // 1~3배 제한
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/90">
      <div ref={modalRef} onWheel={handleWheel}>
        <Image
          ref={imageRef}
          src={src}
          alt="확대 이미지"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            maxWidth: '804px',
            width: '402px',
            height: 'auto',
            transform: `scale(${scale})`,
            transition: 'transform 0.2s',
            transformOrigin: 'center center',
          }}
          className="cursor-zoom-in"
        />
      </div>
    </div>,
    document.body,
  );
}
