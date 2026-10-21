import React, { useState } from 'react';
import SportSlotCard from './SportSlotCard';
import { SPORTS_CONFIG } from '../../constants/sportsConfig';
import { useTournament } from '../../hooks/useTournament';
import { getQuotaBreakdown, getPlayerConfirmedSlotsInEdition } from '../../utils/validation';

export default function SlotBookingForm() {
  const {
    loggedInPlayer,
    activeEdition,
    activeEditionId,
    bookSlots
  } = useTournament();

  const [enabledSports, setEnabledSports] = useState({
    pickleball: false,
    cricket: false,
    paddleball: false
  });

  const [playerSelections, setPlayerSelections] = useState({
    pickleball: [],
    cricket: [],
    paddleball: []
  });

  const [groupBooking, setGroupBooking] = useState({
    pickleball: false,
    paddleball: false
  });

  const [partnerIds, setPartnerIds] = useState({
    pickleball: ['', '', ''],
    paddleball: ['', '', '']
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  if (!loggedInPlayer) return null;

  const currentQuota = getQuotaBreakdown(loggedInPlayer, activeEditionId);
  const confirmedInEd = getPlayerConfirmedSlotsInEdition(loggedInPlayer, activeEditionId).map((s) => ({
    ...s,
    playerId: loggedInPlayer.id
  }));

  const getConflictingSportsMap = (currentSportKey) => {
    const map = {};
    Object.keys(playerSelections).forEach((sKey) => {
      if (sKey !== currentSportKey && enabledSports[sKey]) {
        playerSelections[sKey].forEach((slot) => {
          map[slot] = activeEdition?.inventory?.[sKey]?.name || sKey;
        });
      }
    });
    return map;
  };

  const handleToggleSport = (sportKey) => {
    setEnabledSports((prev) => {
      const willEnable = !prev[sportKey];
      if (!willEnable) {
        setPlayerSelections((sel) => ({ ...sel, [sportKey]: [] }));
      }
      return { ...prev, [sportKey]: willEnable };
    });
  };

  const handleToggleSlot = (sportKey, slotKey) => {
    const selectedList = playerSelections[sportKey] || [];
    const idx = selectedList.indexOf(slotKey);

    if (idx !== -1) {
      setPlayerSelections((prev) => ({
        ...prev,
        [sportKey]: prev[sportKey].filter((s) => s !== slotKey)
      }));
    } else {
      // Enforce Max 2 slots per sport
      const alreadyConfirmedInSport = currentQuota.bySport[sportKey] || 0;
      if (alreadyConfirmedInSport + selectedList.length >= 2) {
        alert(
          "RULE ENFORCED:\nYou can book a maximum of 2 slots for " +
            activeEdition.inventory[sportKey].name +
            ".\nYou already have " +
            alreadyConfirmedInSport +
            " confirmed slot(s) in this sport."
        );
        return;
      }

      // Enforce Max 4 slots total across tournament
      const totalSelectedAcrossAll =
        playerSelections.pickleball.length +
        playerSelections.cricket.length +
        playerSelections.paddleball.length;

      if (currentQuota.total + totalSelectedAcrossAll >= 4) {
        alert(
          "RULE ENFORCED:\nMaximum of 4 total slots allowed per player for " +
            activeEdition.title +
            ".\nYou already have " +
            currentQuota.total +
            " confirmed slot(s)."
        );
        return;
      }

      // Check if this time slot is selected in another sport in the current form
      for (const s in playerSelections) {
        if (s !== sportKey && playerSelections[s].includes(slotKey)) {
          alert(
            "TIME CONFLICT:\nYou have already selected " +
              slotKey +
              " in " +
              activeEdition.inventory[s].name +
              "."
          );
          return;
        }
      }

      setPlayerSelections((prev) => ({
        ...prev,
        [sportKey]: [...prev[sportKey], slotKey]
      }));
    }
  };

  const handleToggleGroup = (sportKey) => {
    setGroupBooking((prev) => ({ ...prev, [sportKey]: !prev[sportKey] }));
  };

  const handlePartnerIdChange = (sportKey, index, value) => {
    setPartnerIds((prev) => {
      const arr = [...prev[sportKey]];
      arr[index] = value;
      return { ...prev, [sportKey]: arr };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert(
        "Please accept and tick the JITO CCG Sports 2026-27 Terms & Conditions checkbox before confirming your booking."
      );
      return;
    }

    const selectedSports = Object.keys(enabledSports).filter((k) => enabledSports[k]);

    if (selectedSports.length === 0) {
      alert("Please select at least one sport to play.");
      return;
    }

    for (let i = 0; i < selectedSports.length; i++) {
      const s = selectedSports[i];
      if (!playerSelections[s] || playerSelections[s].length === 0) {
        alert(
          "Please select at least one 30-minute time slot for " +
            activeEdition.inventory[s].name +
            "."
        );
        return;
      }
    }

    const res = bookSlots({
      selectedSports,
      playerSelections,
      pbPartners: groupBooking.pickleball ? partnerIds.pickleball : [],
      paddlePartners: groupBooking.paddleball ? partnerIds.paddleball : []
    });

    if (res.success) {
      setEnabledSports({ pickleball: false, cricket: false, paddleball: false });
      setPlayerSelections({ pickleball: [], cricket: [], paddleball: [] });
      setGroupBooking({ pickleball: false, paddleball: false });
      setPartnerIds({ pickleball: ['', '', ''], paddleball: ['', '', ''] });
      setTermsAccepted(false);
    }
  };

  return (
    <form
      id="form-slot-booking"
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6"
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Book Sports & 30-Minute Time Slots
            </h3>
            <p className="text-xs text-slate-500">
              Pick individual slots or tag partners. All time slots are <strong>30 minutes</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span
              id="booking-edition-tag"
              className="px-3 py-1 rounded-xl bg-indigo-100 text-[#2F2677] font-black text-xs font-mono"
            >
              {activeEdition?.title} ({activeEdition?.date})
            </span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-950">
            <i className="fa-solid fa-circle-exclamation text-amber-600" />
            <span>Booking Rules Enforced:</span>
          </div>
          <div>• Maximum <strong>4 slots total</strong> per player across the event (including partner bookings made for you).</div>
          <div>• Maximum <strong>2 slots per sport</strong> (e.g. max two 30-minute intervals in Pickleball).</div>
          <div>• <strong>Gender Restrictions:</strong> Male and Female players can only view and book slots matching their gender or tagged 'All'.</div>
        </div>

        <div className="space-y-5 mt-5">
          {/* Pickleball */}
          <SportSlotCard
            sportConfig={SPORTS_CONFIG.pickleball}
            inventorySport={activeEdition?.inventory?.pickleball}
            isChecked={enabledSports.pickleball}
            onToggleSport={handleToggleSport}
            selectedSlots={playerSelections.pickleball}
            onToggleSlot={handleToggleSlot}
            isGroupBooking={groupBooking.pickleball}
            onToggleGroupBooking={handleToggleGroup}
            partnerIds={partnerIds.pickleball}
            onPartnerIdChange={(idx, val) => handlePartnerIdChange('pickleball', idx, val)}
            quotaUsedInSport={currentQuota.bySport.pickleball}
            playerGender={loggedInPlayer.gender}
            confirmedSlotsInEdition={confirmedInEd}
            activeSelectionsByOtherSports={getConflictingSportsMap('pickleball')}
          />

          {/* Box Cricket */}
          <SportSlotCard
            sportConfig={SPORTS_CONFIG.cricket}
            inventorySport={activeEdition?.inventory?.cricket}
            isChecked={enabledSports.cricket}
            onToggleSport={handleToggleSport}
            selectedSlots={playerSelections.cricket}
            onToggleSlot={handleToggleSlot}
            isGroupBooking={false}
            onToggleGroupBooking={() => {}}
            partnerIds={[]}
            onPartnerIdChange={() => {}}
            quotaUsedInSport={currentQuota.bySport.cricket}
            playerGender={loggedInPlayer.gender}
            confirmedSlotsInEdition={confirmedInEd}
            activeSelectionsByOtherSports={getConflictingSportsMap('cricket')}
          />

          {/* Paddle Ball */}
          <SportSlotCard
            sportConfig={SPORTS_CONFIG.paddleball}
            inventorySport={activeEdition?.inventory?.paddleball}
            isChecked={enabledSports.paddleball}
            onToggleSport={handleToggleSport}
            selectedSlots={playerSelections.paddleball}
            onToggleSlot={handleToggleSlot}
            isGroupBooking={groupBooking.paddleball}
            onToggleGroupBooking={handleToggleGroup}
            partnerIds={partnerIds.paddleball}
            onPartnerIdChange={(idx, val) => handlePartnerIdChange('paddleball', idx, val)}
            quotaUsedInSport={currentQuota.bySport.paddleball}
            playerGender={loggedInPlayer.gender}
            confirmedSlotsInEdition={confirmedInEd}
            activeSelectionsByOtherSports={getConflictingSportsMap('paddleball')}
          />
        </div>
      </div>

      {/* Terms Acceptance Checkbox */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            id="booking-terms-checkbox"
            required
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-[#2F2677] focus:ring-[#2F2677]"
          />
          <span className="text-xs text-slate-700 font-semibold leading-relaxed">
            I have read, understood, and agree to abide by all the <strong>JITO Ahmedabad CCG Sports 2026-27 Terms & Conditions</strong>, non-marking shoe rules, and 4-slot tournament quota limits.
          </span>
        </label>
      </div>

      <button
        type="submit"
        id="btn-save-slot"
        className="w-full py-4 bg-[#2F2677] hover:bg-[#231b61] text-white font-black text-base rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <span id="btn-save-slot-text">Confirm Slot Booking</span>
        <i className="fa-solid fa-arrow-right" />
      </button>
    </form>
  );
}
