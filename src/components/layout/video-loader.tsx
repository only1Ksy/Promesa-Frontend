'use client';

import { useEffect, useRef } from 'react';

export default function VideoLoader() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryAutoplay = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn('Autoplay failed:', error);
      }
    };

    tryAutoplay();
  }, []);

  return <video ref={videoRef} src="/videos/loader.webm" width={160} height={160} loop muted autoPlay playsInline />;
}
