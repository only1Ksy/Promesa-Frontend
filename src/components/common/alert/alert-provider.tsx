'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { useEffect } from 'react';

import AlertModal from './alert-modal';

interface AlertContextType {
  showAlert: (message: string) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const showAlert = (msg: string) => {
    setMessage(msg);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setMessage('');
  };

  useEffect(() => {
    console.log('visible changed:', visible);
  }, [visible]);

  useEffect(() => {
    console.log('message changed:', message);
  }, [message]);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertModal message={message} visible={visible} onClose={handleClose} />
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlertContext must be used within AlertProvider');
  return ctx;
};
