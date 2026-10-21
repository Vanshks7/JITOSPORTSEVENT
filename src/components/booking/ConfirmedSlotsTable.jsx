import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { CalendarCheck, ShieldCheck } from 'lucide-react';

export default function ConfirmedSlotsTable() {
  const { loggedInPlayer, editions, activeEdition } = useTournament();

  if (!loggedInPlayer) return null;

  const slotsList = loggedInPlayer.confirmedSlots || [];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#008F3D] text-white flex items-center justify-center text-xs font-bold">
            <CalendarCheck className="w-3.5 h-3.5" />
          </span>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            My Confirmed Slots (Self + Partner Bookings)
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Live Registration Record
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-800 font-bold uppercase border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Edition & Date</th>
              <th className="py-2.5 px-3">Sport</th>
              <th className="py-2.5 px-3">30-Min Slot</th>
              <th className="py-2.5 px-3">Gender Tag</th>
              <th className="py-2.5 px-3">Squad / Captain</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {slotsList.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-400 italic">
                  No active slot booking yet. Select your slots below!
                </td>
              </tr>
            ) : (
              slotsList.map((item, idx) => {
                const edObj = editions[item.editionId] || {
                  title: item.editionTitle,
                  date: item.editionDate
                };
                const edLabel = `${edObj.title || 'Edition'} (${edObj.date || ''})`;
                const currInv = edObj.inventory || activeEdition?.inventory || {};
                const sportDisplayName = currInv[item.sport]?.name || item.sport;
                const squadText =
                  item.team && item.team.length > 0 ? item.team.join(', ') : 'Individual';
                const isLeadSelf = item.lead === loggedInPlayer.id;
                const captainText = !isLeadSelf
                  ? ` (Booked by Partner: ${item.lead})`
                  : ' (Lead: You)';
                const genderTag = item.genderTag || 'All';

                return (
                  <tr key={`confirmed-row-${idx}`} className="hover:bg-slate-50/60 transition">
                    <td className="py-2.5 px-3 font-bold text-[#2F2677]">{edLabel}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{sportDisplayName}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">{item.slot}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {genderTag}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px]">
                      {squadText}
                      <span className="text-slate-500 font-sans">{captainText}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Confirmed
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
