import React from 'react';
import BrandLogo from './BrandLogo';
import { useTournament } from '../../hooks/useTournament';
import { Home, LogIn, UserPlus, LogOut } from 'lucide-react';

export default function Header() {
  const {
    activeEdition,
    loggedInPlayer,
    logoutPlayer,
    navigateTo,
    openAuth,
    activeView
  } = useTournament();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-2.5 z-40 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <BrandLogo onClick={() => navigateTo('home')} />

          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer group hidden xs:block"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-sm sm:text-lg font-black text-slate-900 leading-tight group-hover:text-[#2F2677] transition font-heading">
                CCG SPORTS 2026-27
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase tracking-wide border border-emerald-200">
                {activeEdition?.title || 'Edition 1'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 hidden sm:block">
              JITO Ahmedabad Chapter Sports Meet
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Home button */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeView === 'home'
                ? 'border-[#2F2677] bg-indigo-50/70 text-[#2F2677]'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </button>

          {/* User profile if logged in */}
          {loggedInPlayer ? (
            <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl py-1 px-1.5 sm:px-3">
              <div
                onClick={() => navigateTo('booking')}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <img
                  src={loggedInPlayer.photo || ''}
                  alt={loggedInPlayer.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-[#2F2677] shadow-sm flex-shrink-0"
                />
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-black text-[#2F2677] font-mono leading-tight">
                    {loggedInPlayer.id}
                  </div>
                  <div className="text-[11px] font-bold text-slate-600 truncate max-w-[110px]">
                    {loggedInPlayer.name}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={logoutPlayer}
                title="Log Out"
                className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Log Out</span>
              </button>
            </div>
          ) : (
            /* Auth buttons if logged out */
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => openAuth('login')}
                className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#2F2677] hover:bg-[#231b61] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm hover:shadow cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
              <button
                type="button"
                onClick={() => openAuth('signup')}
                className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-[#008F3D] hover:bg-[#007532] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm hover:shadow cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Register</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
