import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, children, maxWidth = 'max-w-md', showCloseButton = false }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative bg-white rounded-3xl ${maxWidth} w-full p-6 shadow-2xl text-center z-10 my-8 transform transition-all animate-in zoom-in-95 duration-200 border border-slate-100`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
