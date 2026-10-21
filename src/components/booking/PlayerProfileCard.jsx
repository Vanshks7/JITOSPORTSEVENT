import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { getQuotaBreakdown } from '../../utils/validation';

export default function PlayerProfileCard() {
  const { loggedInPlayer, activeEditionId } = useTournament();

  if (!loggedInPlayer) return null;

  const quota = getQuotaBreakdown(loggedInPlayer, activeEditionId);
  const isAtLimit = quota.total >= 4;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={loggedInPlayer.photo || ''}
            alt={loggedInPlayer.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-[#2F2677] shadow-sm flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-[#2F2677] text-white text-xs font-black tracking-wider font-mono">
                {loggedInPlayer.id}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                {loggedInPlayer.name}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded font-bold ${
                  loggedInPlayer.gender === 'Male'
                    ? 'bg-indigo-50 text-[#2F2677]'
                    : 'bg-pink-50 text-pink-700'
                }`}
              >
                {loggedInPlayer.gender}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span>Mobile: <strong className="font-mono text-slate-700">{loggedInPlayer.mobile}</strong></span>
              <span>•</span>
              <span>Age: <strong className="text-slate-700">{loggedInPlayer.age}</strong></span>
              <span>•</span>
              <span>Chapter: <strong className="text-slate-700">{loggedInPlayer.membership}</strong></span>
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right flex flex-col items-start sm:items-end gap-1">
          <span
            className={`text-xs font-extrabold px-3 py-1 rounded-xl border font-mono ${
              isAtLimit
                ? 'text-rose-800 bg-rose-50 border-rose-200'
                : 'text-emerald-800 bg-emerald-50 border-emerald-200'
            }`}
          >
            Slots Used: {quota.total} / 4
          </span>
          <span className="text-[10px] text-slate-400">
            Max 4 slots overall • Max 2 slots per sport
          </span>
        </div>
      </div>
    </div>
  );
}
