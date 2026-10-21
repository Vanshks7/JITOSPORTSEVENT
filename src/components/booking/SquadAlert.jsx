import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { getPlayerConfirmedSlotsInEdition } from '../../utils/validation';
import { Users } from 'lucide-react';

export default function SquadAlert() {
  const { loggedInPlayer, activeEdition, activeEditionId } = useTournament();

  if (!loggedInPlayer) return null;

  const currentEdSlots = getPlayerConfirmedSlotsInEdition(loggedInPlayer, activeEditionId);
  const squadBookings = currentEdSlots.filter(
    (s) => s.lead && s.lead.toUpperCase() !== loggedInPlayer.id.toUpperCase()
  );

  if (squadBookings.length === 0) return null;

  return (
    <div className="text-xs bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-4 sm:p-5 text-indigo-950 space-y-2 animate-in fade-in duration-200">
      <div className="flex items-center gap-2 font-black text-sm text-[#2F2677] font-heading">
        <Users className="w-5 h-5 text-[#2F2677] flex-shrink-0" />
        <span>Confirmed Partner / Squad Reservation Notice</span>
      </div>

      <div className="space-y-1.5 font-medium pl-7">
        {squadBookings.map((sb, idx) => {
          const sName = activeEdition?.inventory?.[sb.sport]?.name || sb.sport;
          return (
            <div key={`squad-alert-${idx}`} className="leading-relaxed">
              • <strong>{sName} ({sb.slot}):</strong> Reserved by Partner / Captain{' '}
              <span className="font-bold text-[#2F2677] font-mono">{sb.lead}</span>{' '}
              (Squad: {(sb.team || []).join(', ')})
            </div>
          );
        })}
        <div className="text-[11px] text-indigo-700 pt-1 italic font-normal">
          * This partner booking automatically counts against your 4-slot limit (and 2-slot sport limit). Conflicting hours are locked below.
        </div>
      </div>
    </div>
  );
}
