'use client';

import { createContext, useContext, useState } from 'react';

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

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setIsHiding(false);

    setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => {
        setVisible(false);
        setMessage('');
      }, 500);
    }, 1800);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div
          className={`text-body-02 fixed bottom-40 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-black/70 px-4 py-2 text-white transition-opacity duration-500 ${
            isHiding ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
