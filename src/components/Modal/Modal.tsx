import React, { ReactNode, useEffect } from 'react';
import { ButtonClose } from '@/components/Button/Close'

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/75 z-40"
        onClick={onClose}
      />

      <div
        className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg"
      >
        {title && (
          <h2 className="text-primary text-2xl font-bold">
            {title}
          </h2>
        )}

        <div>{children}</div>

        <ButtonClose onClick={onClose} >Fechar</ButtonClose>
      </div>
    </>
  );
}
