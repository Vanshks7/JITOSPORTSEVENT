import React from 'react';

export default function BrandLogo({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 group text-left cursor-pointer select-none"
    >
      <div className="flex flex-col items-center">
        <div className="flex rounded-lg overflow-hidden shadow-sm border border-slate-300">
          <div className="w-7 h-7 bg-[#2F2677] text-white flex items-center justify-center font-serif font-black text-base shadow-inner">
            J
          </div>
          <div className="w-7 h-7 bg-[#008F3D] text-white flex items-center justify-center font-serif font-black text-base shadow-inner">
            I
          </div>
          <div className="w-7 h-7 bg-[#FDD900] text-slate-900 flex items-center justify-center font-serif font-black text-base shadow-inner">
            T
          </div>
          <div className="w-7 h-7 bg-[#E20111] text-white flex items-center justify-center font-serif font-black text-base shadow-inner">
            O
          </div>
        </div>
        <span className="text-[9px] font-black tracking-widest text-[#2F2677] mt-0.5">
          AHMEDABAD
        </span>
      </div>
    </div>
  );
}
