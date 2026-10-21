import React from 'react';
import { useTournament } from '../../hooks/useTournament';
import { exportMasterCSV } from '../../utils/csvExport';
import { CalendarPlus, Key, FileSpreadsheet, LogOut, ShieldAlert } from 'lucide-react';

export default function AdminHeader() {
  const {
    players,
    editions,
    activeEditionId,
    setIsNewEditionModalOpen,
    setIsChangePinModalOpen,
    logoutAdmin
  } = useTournament();

  const handleExport = () => {
    if (players.length === 0) {
      alert('No registered players to export.');
      return;
    }
    exportMasterCSV(players, editions, activeEditionId);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
      <div>
        <span className="px-2.5 py-0.5 rounded-lg bg-purple-100 text-[#2F2677] font-bold text-xs uppercase flex items-center gap-1.5 w-fit font-heading">
          <ShieldAlert className="w-3.5 h-3.5" />
          Authorized Organizer Portal
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 font-heading">
          Admin Control Center
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage tournament editions, per-slot gender criteria, and capacities
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setIsNewEditionModalOpen(true)}
          className="px-3.5 py-2 bg-[#2F2677] hover:bg-[#231b61] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>Launch Edition</span>
        </button>

        <button
          type="button"
          onClick={() => setIsChangePinModalOpen(true)}
          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-300 transition flex items-center gap-1 cursor-pointer"
        >
          <Key className="w-3.5 h-3.5 text-slate-500" />
          <span>Change PIN</span>
        </button>

        <button
          type="button"
          onClick={handleExport}
          className="px-4 py-2 bg-[#008F3D] hover:bg-[#007532] text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition cursor-pointer"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Export Master CSV</span>
        </button>

        <button
          type="button"
          onClick={logoutAdmin}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-slate-500" />
          <span>Exit Admin</span>
        </button>
      </div>
    </div>
  );
}
