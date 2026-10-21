import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { IdCard, CalendarCheck, ArrowRight } from 'lucide-react';

export default function ActionCards() {
  const { openAuth } = useTournament();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      {/* Sign Up Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition group">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#2F2677] flex items-center justify-center text-xl font-black group-hover:scale-105 transition-transform">
            <IdCard className="w-6 h-6 text-[#2F2677]" />
          </div>
          <h3 className="text-xl font-black text-slate-900 font-heading">
            One-Time Sign-Up
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Don't have an ID yet? Register once with your compulsory photo verification. The system generates an unguessable randomized permanent Player ID (MP for Male, FP for Female) valid across all editions.
          </p>
        </div>
        <div className="pt-6">
          <button
            type="button"
            onClick={() => openAuth('signup')}
            className="w-full py-3.5 rounded-xl bg-[#2F2677] hover:bg-[#231b61] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:shadow"
          >
            <span>Create Player Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition group">
        <div className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#008F3D] flex items-center justify-center text-xl font-black group-hover:scale-105 transition-transform">
            <CalendarCheck className="w-6 h-6 text-[#008F3D]" />
          </div>
          <h3 className="text-xl font-black text-slate-900 font-heading">
            Registered Player Login
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Already registered? Sign in with your Player ID or Mobile to view your dashboard, check partner reservations, and book up to 4 total slots across non-conflicting 30-minute intervals.
          </p>
        </div>
        <div className="pt-6">
          <button
            type="button"
            onClick={() => openAuth('login')}
            className="w-full py-3.5 rounded-xl bg-[#008F3D] hover:bg-[#007532] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer group-hover:shadow"
          >
            <span>Sign In & Book Slots</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
