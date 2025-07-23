// hooks/useImageZoomModal.tsx
import { useState } from 'react';

export const useImageZoomModal = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const openModal = (src: string) => setImageSrc(src);
  const closeModal = () => setImageSrc(null);

  return {
    imageSrc,
    openModal,
    closeModal,
    isOpen: !!imageSrc,
  };
};
