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

  const showToast = (msg: string) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <div className="text-body-02 fixed bottom-40 left-1/2 z-9999 -translate-x-1/2 rounded-sm bg-black/70 px-4 py-2 text-white transition-opacity duration-500">
          {message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
