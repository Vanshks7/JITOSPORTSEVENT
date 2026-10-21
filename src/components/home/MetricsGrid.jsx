import React from 'react';
import { Clock } from 'lucide-react';

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
      {/* Pickleball */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4 hover:border-indigo-300 hover:shadow-md transition">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-50 text-[#2F2677] flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
          <i className="fa-solid fa-table-tennis-paddle-ball" />
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 font-heading">
            13 Courts
          </div>
          <div className="text-[11px] sm:text-xs font-bold text-slate-500">
            Pickleball Arena
          </div>
        </div>
      </div>

      {/* Box Cricket */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4 hover:border-rose-300 hover:shadow-md transition">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-50 text-[#E20111] flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
          <i className="fa-solid fa-baseball-bat-ball" />
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 font-heading">
            2 Boxes
          </div>
          <div className="text-[11px] sm:text-xs font-bold text-slate-500">
            Box Cricket Arena
          </div>
        </div>
      </div>

      {/* Paddle Ball */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4 hover:border-emerald-300 hover:shadow-md transition">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 text-[#008F3D] flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
          <i className="fa-solid fa-racquet" />
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 font-heading">
            2 Courts
          </div>
          <div className="text-[11px] sm:text-xs font-bold text-slate-500">
            Paddle Ball Arena
          </div>
        </div>
      </div>

      {/* 30-min Intervals */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-3 sm:gap-4 hover:border-amber-300 hover:shadow-md transition">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
          <Clock className="w-6 h-6 text-amber-600" />
        </div>
        <div>
          <div className="text-lg sm:text-2xl font-black text-slate-900 font-heading">
            30 Mins
          </div>
          <div className="text-[11px] sm:text-xs font-bold text-slate-500">
            Slot Intervals
          </div>
        </div>
      </div>
    </div>
  );
}
