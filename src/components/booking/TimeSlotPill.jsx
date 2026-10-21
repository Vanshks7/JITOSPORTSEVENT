import React from 'react';
import { Clock, CheckCircle2, Ban, Lock } from 'lucide-react';

export default function TimeSlotPill({
  slotKey,
  slotData,
  playerGender,
  isChosen,
  playerConfirmedRecord,
  conflictingSportInActiveForm,
  onToggle
}) {
  const cap = slotData?.cap || 0;
  const booked = slotData?.booked || 0;
  const remaining = cap - booked;
  const slotGender = slotData?.gender || 'All';
  const isCapacityFull = remaining <= 0;

  // Gender mismatch logic for this specific time slot
  let isGenderMismatch = false;
  if (slotGender === 'Male Only' && playerGender !== 'Male') isGenderMismatch = true;
  if (slotGender === 'Female Only' && playerGender !== 'Female') isGenderMismatch = true;

  // 1. Confirmed booking in database
  if (playerConfirmedRecord) {
    const isThisSport = playerConfirmedRecord.isThisSport;
    if (isThisSport) {
      return (
        <div className="p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-50/90 cursor-not-allowed select-none shadow-sm">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-1">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Confirmed
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold">
              Booked
            </span>
          </div>
          <div className="font-black text-xs sm:text-sm text-emerald-950 font-mono">
            {slotKey}
          </div>
          <div className="text-[10px] text-emerald-800 font-bold mt-1">
            {playerConfirmedRecord.isLead ? 'Booked by You' : `Partner: ${playerConfirmedRecord.lead}`}
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-3 rounded-2xl border border-rose-200 bg-rose-50/70 text-rose-900 cursor-not-allowed select-none">
          <div className="flex items-center justify-between text-[11px] font-bold text-rose-700 mb-1">
            <span className="flex items-center gap-1">
              <Ban className="w-3.5 h-3.5 text-rose-600" />
              Conflict
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-200 font-black">
              Occupied
            </span>
          </div>
          <div className="font-extrabold text-xs sm:text-sm line-through text-slate-500 font-mono">
            {slotKey}
          </div>
          <div className="text-[10px] text-rose-800 font-semibold mt-1">
            Playing {playerConfirmedRecord.sportName}
          </div>
        </div>
      );
    }
  }

  // 2. Gender mismatch
  if (isGenderMismatch) {
    return (
      <div className="p-3 rounded-2xl border border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed select-none">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[10px] font-bold uppercase flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            Restricted
          </span>
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded">
            {slotGender}
          </span>
        </div>
        <div className="font-black text-xs sm:text-sm text-slate-500 line-through font-mono">
          {slotKey}
        </div>
        <div className="text-[10px] text-rose-500 font-bold mt-1">
          {slotGender} Slot
        </div>
      </div>
    );
  }

  // 3. Chosen for another sport in active form
  if (conflictingSportInActiveForm) {
    return (
      <div className="p-3 rounded-2xl border border-amber-200 bg-amber-50/70 text-amber-900 cursor-not-allowed select-none">
        <div className="flex items-center justify-between text-[11px] font-bold text-amber-700 mb-1">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Conflict
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-200">
            Selected
          </span>
        </div>
        <div className="font-extrabold text-xs sm:text-sm line-through text-slate-500 font-mono">
          {slotKey}
        </div>
        <div className="text-[10px] text-amber-800 font-semibold mt-1">
          Chosen for {conflictingSportInActiveForm}
        </div>
      </div>
    );
  }

  // 4. Capacity Full
  if (isCapacityFull && !isChosen) {
    return (
      <div className="p-3 rounded-2xl border border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed select-none">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-bold uppercase flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            Blinded
          </span>
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-slate-200 rounded">
            Full
          </span>
        </div>
        <div className="font-black text-xs sm:text-sm text-slate-400 line-through font-mono">
          {slotKey}
        </div>
        <div className="text-[10px] text-rose-500 font-bold mt-1">
          0 Spots Left
        </div>
      </div>
    );
  }

  // 5. Available / Selected
  const genderBadgeClass =
    slotGender === 'Male Only'
      ? 'bg-indigo-100 text-[#2F2677]'
      : slotGender === 'Female Only'
      ? 'bg-pink-100 text-pink-700'
      : 'bg-slate-100 text-slate-600';

  return (
    <div
      onClick={onToggle}
      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
        isChosen
          ? 'border-[#008F3D] bg-emerald-50 ring-2 ring-[#008F3D] shadow-sm transform scale-[1.01]'
          : 'border-slate-200 hover:border-slate-400 bg-white hover:shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between text-slate-500 mb-1">
        <span className="text-[10px] font-bold uppercase flex items-center gap-1">
          <Clock className="w-3 h-3" />
          30 Min
        </span>
        <div className="flex items-center gap-1">
          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${genderBadgeClass}`}>
            {slotGender}
          </span>
          <span
            className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
              isChosen ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {isChosen ? 'Selected' : `${remaining} Left`}
          </span>
        </div>
      </div>
      <div className="font-black text-xs sm:text-sm text-slate-900 font-mono">
        {slotKey}
      </div>
      <div className="text-[10px] text-emerald-600 font-semibold mt-1">
        {booked} / {cap} filled
      </div>
    </div>
  );
}
