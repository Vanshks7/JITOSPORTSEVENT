import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { getQuotaBreakdown } from '../../utils/validation';

export default function MasterPlayerTable() {
  const { players, editions, activeEditionId } = useTournament();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-base font-bold text-slate-900 mb-1">
        Master Player Registrations & Squad Bookings
      </h3>
      <p className="text-xs text-slate-500 mb-4">
        Registry of all registered participants, random IDs, and allocated 30-min slots
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-800 font-bold uppercase border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Photo</th>
              <th className="py-2.5 px-3">Player ID</th>
              <th className="py-2.5 px-3">Full Name</th>
              <th className="py-2.5 px-3">Mobile</th>
              <th className="py-2.5 px-3">Gender</th>
              <th className="py-2.5 px-3">Membership</th>
              <th className="py-2.5 px-3">Slots Used</th>
              <th className="py-2.5 px-3">Confirmed Bookings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {players.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-4 text-center text-slate-400">
                  No players registered yet.
                </td>
              </tr>
            ) : (
              players.map((p) => {
                const pSlots = p.confirmedSlots || [];
                const quotaUsed = getQuotaBreakdown(p, activeEditionId).total;

                return (
                  <tr key={p.id}>
                    <td className="py-2.5 px-3">
                      {p.photo ? (
                        <img
                          src={p.photo}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover border border-slate-300"
                        />
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td
                      className={`py-2.5 px-3 font-mono font-black ${
                        p.gender === 'Male' ? 'text-[#2F2677]' : 'text-pink-600'
                      }`}
                    >
                      {p.id}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3 font-mono">{p.mobile}</td>
                    <td className="py-2.5 px-3">{p.gender}</td>
                    <td className="py-2.5 px-3">{p.membership}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-indigo-900">
                      {quotaUsed} / 4
                    </td>
                    <td className="py-2.5 px-3">
                      {pSlots.length === 0 ? (
                        <span>-</span>
                      ) : (
                        pSlots.map((s, sIdx) => {
                          const ed =
                            editions[s.editionId]?.title || s.editionTitle || 'Ed';
                          const sp =
                            s.sport === 'pickleball'
                              ? 'Pickleball'
                              : s.sport === 'cricket'
                              ? 'Cricket'
                              : 'Paddle';
                          const leadTag =
                            s.lead && s.lead !== p.id ? ` (by ${s.lead})` : '';
                          const gTag = s.genderTag ? ` [${s.genderTag}]` : '';

                          return (
                            <span
                              key={`badge-${p.id}-${sIdx}`}
                              className="inline-block px-1.5 py-0.5 mr-1 mb-1 rounded bg-indigo-50 text-[#2F2677] font-semibold text-[10px] border border-indigo-200"
                            >
                              {ed}: {sp} ({s.slot}){gTag}{leadTag}
                            </span>
                          );
                        })
                      )}
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
