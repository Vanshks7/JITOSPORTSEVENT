import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useTournament } from '../../hooks/useTournament';
import { KeyRound } from 'lucide-react';

export default function ResetPasswordModal() {
  const { isResetPasswordOpen, setIsResetPasswordOpen, resetPassword } = useTournament();
  const [identifier, setIdentifier] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClose = () => {
    setIsResetPasswordOpen(false);
    setIdentifier('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match.');
      return;
    }

    if (newPassword.length < 4) {
      setErrorMsg('Password should be at least 4 characters.');
      return;
    }

    const res = resetPassword(identifier, newPassword);
    if (!res.success) {
      setErrorMsg(res.error || 'Password update failed.');
    } else {
      handleClose();
    }
  };

  return (
    <Modal isOpen={isResetPasswordOpen} onClose={handleClose} maxWidth="max-w-sm">
      <div className="w-12 h-12 bg-indigo-50 text-[#2F2677] rounded-full flex items-center justify-center mx-auto text-xl mb-3 shadow-inner">
        <KeyRound className="w-6 h-6 text-[#2F2677]" />
      </div>
      <h3 className="text-lg font-black text-slate-900 font-heading">
        Reset Player Password
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        Verify your Player ID or mobile to set a new password
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-left">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 font-heading">
            Player ID or Registered Mobile *
          </label>
          <input
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. MP4821 or 10-digit mobile"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 font-heading">
            New Password *
          </label>
          <input
            type="password"
            required
            minLength={4}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Min 4 characters"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 font-heading">
            Confirm New Password *
          </label>
          <input
            type="password"
            required
            minLength={4}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-type new password"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677]"
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
            className="w-1/2 py-2.5 rounded-xl bg-[#2F2677] text-white text-xs font-bold hover:bg-[#231b61] transition cursor-pointer"
          >
            Update Password
          </button>
        </div>
      </form>
    </Modal>
  );
}
