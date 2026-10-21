import React from 'react';
import Modal from '../common/Modal';
import { useTournament } from '../../hooks/useTournament';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function SignupSuccessModal() {
  const {
    isSignupSuccessOpen,
    setIsSignupSuccessOpen,
    newAssignedPlayer,
    navigateTo
  } = useTournament();

  const handleContinue = () => {
    setIsSignupSuccessOpen(false);
    navigateTo('booking');
  };

  if (!newAssignedPlayer) return null;

  return (
    <Modal isOpen={isSignupSuccessOpen} onClose={handleContinue} maxWidth="max-w-sm">
      <div className="relative inline-block mx-auto mb-2">
        <img
          src={newAssignedPlayer.photo || ''}
          alt={newAssignedPlayer.name}
          className="w-16 h-16 rounded-full object-cover border-3 border-[#008F3D] mx-auto shadow-md"
        />
        <div className="absolute -bottom-1 -right-1 bg-[#008F3D] text-white p-1 rounded-full shadow-sm">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>

      <h3 className="text-xl font-black text-slate-900 font-heading">
        Sign-Up Complete!
      </h3>
      <p className="text-xs text-slate-500 mt-0.5">
        Your permanent Player ID is:
      </p>

      <div className="my-3 py-2.5 px-4 bg-indigo-50 border-2 border-[#2F2677] rounded-2xl shadow-inner">
        <span className="text-2xl sm:text-3xl font-black text-[#2F2677] tracking-wider font-mono">
          {newAssignedPlayer.id}
        </span>
      </div>

      <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
        Please note down this ID. Your ID operates across all tournament editions and gives you instant access to reserved slots.
      </p>

      <button
        type="button"
        onClick={handleContinue}
        className="w-full py-3.5 bg-[#008F3D] hover:bg-[#007532] text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
      >
        <span>Continue to Slot Booking</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </Modal>
  );
}
