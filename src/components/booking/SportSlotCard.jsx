import React from 'react';
import TimeSlotPill from './TimeSlotPill';
import { TIME_SLOTS_30MIN } from '../../constants/timeSlots';
import { Users } from 'lucide-react';

export default function SportSlotCard({
  sportConfig,
  inventorySport,
  isChecked,
  onToggleSport,
  selectedSlots,
  onToggleSlot,
  isGroupBooking,
  onToggleGroupBooking,
  partnerIds,
  onPartnerIdChange,
  quotaUsedInSport,
  playerGender,
  confirmedSlotsInEdition,
  activeSelectionsByOtherSports
}) {
  const sportKey = sportConfig.id;
  const slotsData = inventorySport?.slots || {};

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isChecked
          ? 'bg-white border-[#2F2677] shadow-sm'
          : 'bg-slate-50 border-slate-200'
      }`}
    >
      <label className="flex items-center justify-between cursor-pointer select-none">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onToggleSport(sportKey)}
            className="w-5 h-5 rounded text-[#2F2677] cursor-pointer"
          />
          <div>
            <span className="font-extrabold text-slate-900 text-base font-heading">
              {sportConfig.name}
            </span>
            <span className={`ml-2 text-xs px-2.5 py-0.5 rounded-lg font-bold ${sportConfig.badgeColor}`}>
              {sportConfig.description}
            </span>
            <span className="ml-1.5 text-[11px] text-slate-500 font-bold">
              (Used: {quotaUsedInSport}/2)
            </span>
          </div>
        </div>
        <div className="text-xl" style={{ color: sportConfig.primaryColor }}>
          <i className={`fa-solid ${sportConfig.iconClass}`} />
        </div>
      </label>

      {isChecked && (
        <div className="mt-4 pt-3 border-t border-slate-200 space-y-4 animate-in fade-in duration-200">
          {/* Squad / Partner Booking Box (For Pickleball and Paddle Ball) */}
          {sportConfig.allowSquad && (
            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl space-y-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-indigo-950">
                <input
                  type="checkbox"
                  checked={isGroupBooking}
                  onChange={() => onToggleGroupBooking(sportKey)}
                  className="rounded text-[#2F2677] cursor-pointer"
                />
                <Users className="w-4 h-4 text-[#2F2677]" />
                <span>Book with Partners / Squad (Max 4 Players including yourself)</span>
              </label>

              {isGroupBooking && (
                <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                  <p className="text-[11px] text-slate-600">
                    Enter up to 3 teammate Player IDs. Each selected slot will count towards their quota:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={partnerIds[0] || ''}
                      onChange={(e) => onPartnerIdChange(0, e.target.value)}
                      placeholder="Partner 2 ID (e.g. MP7412)"
                      className="uppercase px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white focus:outline-none focus:ring-1 focus:ring-[#2F2677]"
                    />
                    <input
                      type="text"
                      value={partnerIds[1] || ''}
                      onChange={(e) => onPartnerIdChange(1, e.target.value)}
                      placeholder="Partner 3 ID (Optional)"
                      className="uppercase px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white focus:outline-none focus:ring-1 focus:ring-[#2F2677]"
                    />
                    <input
                      type="text"
                      value={partnerIds[2] || ''}
                      onChange={(e) => onPartnerIdChange(2, e.target.value)}
                      placeholder="Partner 4 ID (Optional)"
                      className="uppercase px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold bg-white focus:outline-none focus:ring-1 focus:ring-[#2F2677]"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Time Slots Grid */}
          <div>
            <p className="text-xs font-bold text-slate-700 mb-2 font-heading">
              Select {sportConfig.name} 30-Min Slots (Max 2 slots for this sport):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {TIME_SLOTS_30MIN.map((slotKey) => {
                const slotData = slotsData[slotKey] || { cap: 0, booked: 0, gender: 'All' };
                const isChosen = selectedSlots.includes(slotKey);

                // Confirmed record in database
                const matchedRecord = confirmedSlotsInEdition.find((s) => s.slot === slotKey);
                const playerConfirmedRecord = matchedRecord
                  ? {
                      isThisSport: matchedRecord.sport === sportKey,
                      sportName: matchedRecord.sport,
                      isLead: matchedRecord.lead === matchedRecord.playerId,
                      lead: matchedRecord.lead
                    }
                  : null;

                // Collision with another sport selected in the current unconfirmed form
                const conflictingSportInActiveForm = activeSelectionsByOtherSports[slotKey] || null;

                return (
                  <TimeSlotPill
                    key={`${sportKey}-${slotKey}`}
                    slotKey={slotKey}
                    slotData={slotData}
                    playerGender={playerGender}
                    isChosen={isChosen}
                    playerConfirmedRecord={playerConfirmedRecord}
                    conflictingSportInActiveForm={conflictingSportInActiveForm}
                    onToggle={() => onToggleSlot(sportKey, slotKey)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
