import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useTournament } from '../../hooks/useTournament';
import { ShieldCheck } from 'lucide-react';

export default function AdminAuthModal() {
  const { isAdminAuthModalOpen, setIsAdminAuthModalOpen, verifyAdminPin } = useTournament();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  const handleClose = () => {
    setIsAdminAuthModalOpen(false);
    setPin('');
    setErrorMsg(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = verifyAdminPin(pin);
    if (!ok) {
      setErrorMsg(true);
    } else {
      handleClose();
    }
  };

  return (
    <Modal isOpen={isAdminAuthModalOpen} onClose={handleClose} maxWidth="max-w-sm">
      <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto text-xl mb-3 shadow-inner">
        <ShieldCheck className="w-6 h-6 text-[#2F2677]" />
      </div>

      <h3 className="text-lg font-black text-slate-900 font-heading">
        Admin Authorization
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        Enter organizer PIN to unlock control center
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input
          type="password"
          required
          maxLength={8}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setErrorMsg(false);
          }}
          placeholder="••••"
          className="w-full px-4 py-2.5 text-center text-xl tracking-widest font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] bg-white"
        />

        {errorMsg && (
          <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-lg border border-rose-200">
            Invalid PIN. Default PIN is 1926.
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 py-2.5 rounded-xl bg-[#2F2677] hover:bg-[#231b61] text-white text-xs font-bold transition cursor-pointer shadow-md"
          >
            Unlock
          </button>
        </div>
      </form>
    </Modal>
  );
}
