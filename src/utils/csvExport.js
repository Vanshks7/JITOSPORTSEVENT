import { getQuotaBreakdown } from './validation';

/**
 * Generates and triggers download of the complete tournament master database CSV
 */
export function exportMasterCSV(players, editions, activeEditionId) {
  if (!players || players.length === 0) {
    return { success: false, message: 'No registered players to export.' };
  }

  const headers = [
    "Player ID",
    "Sign-Up Date",
    "Full Name",
    "Mobile Number",
    "Gender",
    "Age Group",
    "Membership",
    "Frequency PB",
    "Frequency Cricket",
    "Frequency Paddle",
    "Active Edition Slots Count",
    "Booked Slots Details"
  ];

  let csv = headers.join(",") + "\n";

  players.forEach((p) => {
    const pSlots = p.confirmedSlots || [];
    const slotDetails = pSlots
      .map((s) => {
        const ed = editions[s.editionId]?.title || s.editionTitle || 'Edition';
        const edDate = editions[s.editionId]?.date || s.editionDate || '';
        const sp =
          s.sport === 'pickleball'
            ? 'Pickleball'
            : s.sport === 'cricket'
            ? 'Box Cricket'
            : 'Paddle Ball';
        const squadInfo = s.team && s.team.length > 1 ? ` Squad: ${s.team.join(' ')}` : '';
        const bookedBy = s.lead && s.lead !== p.id ? ` (Booked by Partner: ${s.lead})` : '';
        const gTag = s.genderTag ? ` [${s.genderTag}]` : '';
        return `[${ed} (${edDate}) - ${sp} ${s.slot}${gTag}${squadInfo}${bookedBy}]`;
      })
      .join('; ');

    const currentEdSlotsCount = getQuotaBreakdown(p, activeEditionId).total;

    const row = [
      `"${p.id || ''}"`,
      `"${p.registeredAt || ''}"`,
      `"${p.name || ''}"`,
      `"${p.mobile || ''}"`,
      `"${p.gender || ''}"`,
      `"${p.age || ''}"`,
      `"${p.membership || ''}"`,
      `"${p.freq_pickleball || ''}"`,
      `"${p.freq_cricket || ''}"`,
      `"${p.freq_paddle || ''}"`,
      `"${currentEdSlotsCount}"`,
      `"${slotDetails.replace(/"/g, '""')}"`
    ];

    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `JITO_CCG_Sports_Master_Database_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  return { success: true };
}
