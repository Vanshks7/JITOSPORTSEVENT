import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { Lock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { navigateTo, setIsAdminAuthModalOpen, isAdminAuthenticated } = useTournament();

  const handleAdminTrigger = () => {
    if (isAdminAuthenticated) {
      navigateTo('admin');
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  const handleTermsClick = () => {
    navigateTo('home');
    setTimeout(() => {
      const el = document.getElementById('section-rules');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          © 2026-27 JITO Ahmedabad Chapter. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <button
            type="button"
            onClick={handleTermsClick}
            className="hover:text-[#2F2677] transition cursor-pointer"
          >
            Terms & Conditions
          </button>
          <span>•</span>
          {/* Discrete Organizer Access */}
          <button
            type="button"
            onClick={handleAdminTrigger}
            className="text-slate-400 hover:text-slate-700 flex items-center gap-1.5 transition cursor-pointer group"
            title="Authorized Organizer Access (Shortcut: Ctrl+Shift+A)"
          >
            <Lock className="w-3 h-3 text-slate-400 group-hover:text-[#2F2677] transition" />
            <span className="group-hover:text-slate-800">Organizer Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
