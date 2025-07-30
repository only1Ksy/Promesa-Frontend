'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import AlertModal from './alert-modal';

interface AlertOptions {
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>();
  const [onCancel, setOnCancel] = useState<(() => void) | undefined>();
  const [confirmText, setConfirmText] = useState('확인');
  const [cancelText, setCancelText] = useState('');

  const showAlert = ({ message, onConfirm, onCancel, confirmText = '확인', cancelText = '' }: AlertOptions) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setOnCancel(() => onCancel);
    setConfirmText(confirmText);
    setCancelText(cancelText);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
    setMessage('');
    setOnConfirm(undefined);
    setOnCancel(undefined);
    setConfirmText('확인');
    setCancelText('');
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertModal
        visible={visible}
        message={message}
        onClose={handleClose}
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmText={confirmText}
        cancelText={cancelText}
      />
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlertContext must be used within AlertProvider');
  return ctx;
};
