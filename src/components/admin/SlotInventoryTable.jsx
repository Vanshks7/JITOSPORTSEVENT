import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { TIME_SLOTS_30MIN } from '../../constants/timeSlots';

export default function SlotInventoryTable() {
  const { activeEdition, updateSlotCapacity, updateSlotGender } = useTournament();
  const inv = activeEdition?.inventory || {};

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            Live 30-Minute Slot Inventory & Gender Configuration
          </h3>
          <p className="text-xs text-slate-500">
            Adjust capacity and set Gender Eligibility (All / Male Only / Female Only) per time interval
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-[#2F2677] font-bold text-xs font-mono border border-indigo-200 w-fit">
          {activeEdition?.title}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase">
              <th className="py-2.5 px-2">Sport</th>
              <th className="py-2.5 px-2">30-Min Interval</th>
              <th className="py-2.5 px-2">Max Capacity</th>
              <th className="py-2.5 px-2">Gender Criteria</th>
              <th className="py-2.5 px-2">Booked</th>
              <th className="py-2.5 px-2">Available</th>
              <th className="py-2.5 px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {Object.keys(inv).map((sKey) => {
              const sport = inv[sKey];
              return TIME_SLOTS_30MIN.map((slotKey) => {
                const data = sport.slots?.[slotKey] || { cap: 0, booked: 0, gender: 'All' };
                const remaining = data.cap - data.booked;
                const isFull = remaining <= 0;
                const currGender = data.gender || 'All';

                return (
                  <tr key={`${sKey}-${slotKey}`} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-2 font-bold text-slate-800">{sport.name}</td>
                    <td className="py-2.5 px-2 font-mono font-medium text-slate-700">{slotKey}</td>
                    <td className="py-2.5 px-2">
                      <input
                        type="number"
                        min="0"
                        value={data.cap}
                        onChange={(e) => updateSlotCapacity(sKey, slotKey, e.target.value)}
                        className="w-16 px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-1 focus:ring-[#2F2677]"
                      />
                    </td>
                    <td className="py-2.5 px-2">
                      <select
                        value={currGender}
                        onChange={(e) => updateSlotGender(sKey, slotKey, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold bg-white focus:outline-none focus:ring-1 focus:ring-[#2F2677] cursor-pointer"
                      >
                        <option value="All">All (Male & Female)</option>
                        <option value="Male Only">Male Only</option>
                        <option value="Female Only">Female Only</option>
                      </select>
                    </td>
                    <td className="py-2.5 px-2 font-bold font-mono text-slate-900">{data.booked}</td>
                    <td className={`py-2.5 px-2 font-bold font-mono ${remaining <= 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {remaining}
                    </td>
                    <td className="py-2.5 px-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          isFull
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {isFull ? 'BLINDED (FULL)' : 'OPEN'}
                      </span>
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
