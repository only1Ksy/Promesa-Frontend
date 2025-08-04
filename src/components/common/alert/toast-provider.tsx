'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('ToastProvider not found');
  return ctx;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback(
    (msg: string) => {
      if (visible && msg === message) return;

      setMessage(msg);
      setVisible(true);
      setIsHiding(false);

      // clear old timers
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideRef.current) clearTimeout(hideRef.current);

      timeoutRef.current = setTimeout(() => {
        setIsHiding(true);
        hideRef.current = setTimeout(() => {
          setVisible(false);
          setMessage('');
        }, 500);
      }, 1800);
    },
    [message, visible],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideRef.current) clearTimeout(hideRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div
          className={`fixed-component max-z-index bottom-40 transition-opacity duration-500 ${
            isHiding ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center justify-center">
            <p className="text-body-02 rounded-sm bg-black/70 px-4 py-2 text-center text-white">{message}</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
