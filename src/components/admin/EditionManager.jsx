import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

export default function EditionManager() {
  const { editions, activeEditionId, activeEdition, switchEdition } = useTournament();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Tournament Edition & Schedule Setup
          </h3>
          <p className="text-xs text-slate-500">
            Configure active edition, dates, and per-slot gender categories
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 font-heading">
            Active Edition:
          </label>
          <select
            value={activeEditionId}
            onChange={(e) => switchEdition(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#2F2677] focus:ring-2 focus:ring-[#2F2677] cursor-pointer"
          >
            {Object.keys(editions).map((key) => {
              const ed = editions[key];
              return (
                <option key={key} value={key}>
                  {ed.title} ({ed.date})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#2F2677]" />
          <span>Active Edition:</span>
          <span className="text-[#2F2677] font-bold font-mono text-sm ml-1">
            {activeEdition?.title}
          </span>
        </div>

        <div>
          <span>Scheduled Date:</span>
          <span className="font-bold text-slate-800 ml-1.5">
            {activeEdition?.date}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-indigo-700" />
          <span>Timing:</span>
          <span className="font-bold text-indigo-700 ml-1">
            8:00 PM - 11:00 PM (30-min intervals)
          </span>
        </div>

        <div>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px] flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Open for Booking
          </span>
        </div>
      </div>
    </div>
  );
}
