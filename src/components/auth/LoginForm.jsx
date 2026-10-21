import React, { useState } from 'react';
import { useTournament } from '../../hooks/useTournament';
import { IdCard, KeyRound, ArrowRight } from 'lucide-react';

export default function LoginForm({ onSwitchToSignup }) {
  const { loginPlayer, setIsResetPasswordOpen } = useTournament();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    const res = loginPlayer(identifier, password);
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.error || 'Login failed. Please check credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-heading">
          Player ID or Registered Mobile *
        </label>
        <div className="relative">
          <IdCard className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. MP4821 or 10-digit mobile"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] text-sm font-semibold bg-white"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 font-heading">
            Account Password *
          </label>
          <button
            type="button"
            onClick={() => setIsResetPasswordOpen(true)}
            className="text-xs text-[#2F2677] font-bold hover:underline cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative">
          <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] text-sm bg-white"
          />
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs text-rose-600 font-bold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-[#2F2677] hover:bg-[#231b61] text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
      >
        <span>{isSubmitting ? 'Logging In...' : 'Log In & Open Dashboard'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-center text-xs text-slate-500 pt-2">
        First time playing?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-[#2F2677] font-bold underline cursor-pointer"
        >
          Create your Player ID
        </button>
      </p>
    </form>
  );
}
