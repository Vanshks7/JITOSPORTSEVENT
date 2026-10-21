import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useTournament } from '../../hooks/useTournament';
import { Key } from 'lucide-react';

export default function ChangePinModal() {
  const { isChangePinModalOpen, setIsChangePinModalOpen, changeAdminPin } = useTournament();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClose = () => {
    setIsChangePinModalOpen(false);
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPin !== confirmPin) {
      setErrorMsg('New PIN and Confirm PIN do not match.');
      return;
    }

    if (newPin.length < 4) {
      setErrorMsg('PIN must be at least 4 digits.');
      return;
    }

    const res = changeAdminPin(currentPin, newPin);
    if (!res.success) {
      setErrorMsg(res.error || 'Failed to update PIN.');
    } else {
      handleClose();
    }
  };

  return (
    <Modal isOpen={isChangePinModalOpen} onClose={handleClose} maxWidth="max-w-sm">
      <div className="w-12 h-12 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto text-xl mb-3 shadow-inner">
        <Key className="w-6 h-6 text-[#2F2677]" />
      </div>

      <h3 className="text-lg font-black text-slate-900 font-heading">
        Change Admin PIN
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        Update organizer authorization pass-key
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-left">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 font-heading">
            Current PIN *
          </label>
          <input
            type="password"
            required
            maxLength={8}
            value={currentPin}
            onChange={(e) => setCurrentPin(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 font-heading">
            New PIN *
          </label>
          <input
            type="password"
            required
            minLength={4}
            maxLength={8}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 font-heading">
            Confirm New PIN *
          </label>
          <input
            type="password"
            required
            minLength={4}
            maxLength={8}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] bg-white"
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2 rounded-lg border border-rose-200">
            {errorMsg}
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
            className="w-1/2 py-2.5 rounded-xl bg-[#008F3D] hover:bg-[#007532] text-white text-xs font-bold transition cursor-pointer shadow-md"
          >
            Save PIN
          </button>
        </div>
      </form>
    </Modal>
  );
}
