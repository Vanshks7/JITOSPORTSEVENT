import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTournament } from '../../hooks/useTournament';
import { ArrowLeft, LogIn, UserPlus } from 'lucide-react';

export default function AuthView() {
  const { authInitialTab, navigateTo } = useTournament();
  const [activeTab, setActiveTab] = useState(authInitialTab || 'login');

  useEffect(() => {
    if (authInitialTab) {
      setActiveTab(authInitialTab);
    }
  }, [authInitialTab]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Back to Home Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="text-xs font-bold text-[#2F2677] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home Page</span>
        </button>
        <span className="text-xs font-bold text-slate-400">
          JITO CCG Sports 2026-27
        </span>
      </div>

      {/* Authentication Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-10">
        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`pb-3 px-6 text-sm font-black transition-all flex items-center gap-2 cursor-pointer font-heading ${
              activeTab === 'login'
                ? 'border-b-2 border-[#2F2677] text-[#2F2677]'
                : 'border-b-2 border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Player Login</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`pb-3 px-6 text-sm font-bold transition-all flex items-center gap-2 cursor-pointer font-heading ${
              activeTab === 'signup'
                ? 'border-b-2 border-[#008F3D] text-[#008F3D] font-black'
                : 'border-b-2 border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>New Player Sign-Up</span>
          </button>
        </div>

        {activeTab === 'login' ? (
          <LoginForm onSwitchToSignup={() => setActiveTab('signup')} />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
}
