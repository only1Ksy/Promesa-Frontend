'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import AlertModal from './alert-modal';

interface AlertContextType {
  showAlert: (message: string, onConfirm?: () => void) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const showAlert = (msg: string, callback?: () => void) => {
    setMessage(msg);
    setOnConfirm(() => callback || (() => {}));
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setMessage('');
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {visible && <AlertModal message={message} onConfirm={handleConfirm} onClose={handleClose} />}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlertContext must be used within AlertProvider');
  return ctx;
};
