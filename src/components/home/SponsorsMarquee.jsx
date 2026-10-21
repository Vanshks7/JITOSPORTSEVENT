import React from 'react';
import { SPONSORS } from '../../constants/sponsors';

export default function SponsorsMarquee() {
  // Duplicate for seamless infinite loop
  const marqueeItems = [...SPONSORS, ...SPONSORS];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E20111] animate-ping" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 font-heading">
            Official Partners & Sponsors
          </span>
        </div>
        <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
          JITO CCG Sports 2026-27
        </span>
      </div>

      <div className="overflow-hidden relative w-full py-2">
        <div className="animate-marquee items-center gap-5 sm:gap-6">
          {marqueeItems.map((sponsor, index) => (
            <div
              key={`${sponsor.name}-${index}`}
              className="flex items-center gap-3 px-4 sm:px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 min-w-[210px] sm:min-w-[230px] shadow-sm hover:shadow transition"
            >
              <div
                className={`w-10 h-10 rounded-xl ${sponsor.bgColor} ${sponsor.textColor} flex items-center justify-center font-black text-base shadow-inner flex-shrink-0 font-serif`}
              >
                {sponsor.letter}
              </div>
              <div>
                <div className="text-xs font-black text-slate-900 leading-tight font-heading">
                  {sponsor.name}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {sponsor.tier}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
