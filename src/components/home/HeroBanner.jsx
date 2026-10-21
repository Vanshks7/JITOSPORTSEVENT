import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { Shield, CalendarCheck, UserPlus, LogIn, FileText, Trophy } from 'lucide-react';

export default function HeroBanner() {
  const { activeEdition, openAuth } = useTournament();

  const scrollToRules = () => {
    const el = document.getElementById('section-rules');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-gradient-to-br from-[#2F2677] via-[#231b61] to-[#120d36] rounded-3xl p-6 sm:p-12 text-white shadow-xl overflow-hidden border border-indigo-900/40">
      {/* Decorative Glow & Trophy watermark */}
      <div className="absolute -right-8 -bottom-10 opacity-10 text-white pointer-events-none select-none">
        <Trophy className="w-72 h-72 sm:w-96 sm:h-96" />
      </div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3.5 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-black tracking-wide text-amber-300 border border-white/20 flex items-center gap-1.5 font-heading">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            JITO AHMEDABAD CHAPTER
          </span>
          <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/40 rounded-full text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>
              {activeEdition?.title || 'Edition 1'}: {activeEdition?.date || '29th Oct 2026'} (8:00 PM - 11:00 PM)
            </span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white drop-shadow-sm font-heading">
          JITO AHMEDABAD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FDD900] via-amber-200 to-white">
            CCG SPORTS 2026-27
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
          Welcome to the premier community multi-sports extravaganza. Reserve your court and arena slots in{' '}
          <strong className="text-white">30-minute intervals</strong> for Pickleball, Box Cricket, and Paddle Ball.
          One-time permanent Player ID, mandatory photo identity, and instant squad reservations.
        </p>

        {/* Main Call to Actions */}
        <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-3.5">
          <button
            type="button"
            onClick={() => openAuth('signup')}
            className="px-5 sm:px-6 py-3.5 rounded-2xl bg-[#008F3D] hover:bg-[#007532] text-white font-black text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2.5 cursor-pointer"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>New Player Registration</span>
          </button>

          <button
            type="button"
            onClick={() => openAuth('login')}
            className="px-5 sm:px-6 py-3.5 rounded-2xl bg-white text-[#2F2677] hover:bg-slate-100 font-black text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2.5 cursor-pointer"
          >
            <LogIn className="w-4 h-4 sm:w-5 sm:h-5 text-[#2F2677]" />
            <span>Player Login & Dashboard</span>
          </button>

          <button
            type="button"
            onClick={scrollToRules}
            className="px-4 sm:px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Terms & Guidelines</span>
          </button>
        </div>
      </div>
    </div>
  );
}
