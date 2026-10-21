import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useTournament } from '../../hooks/useTournament';
import { CalendarPlus } from 'lucide-react';

export default function NewEditionModal() {
  const {
    isNewEditionModalOpen,
    setIsNewEditionModalOpen,
    editions,
    createEdition
  } = useTournament();

  const nextEdNumber = Object.keys(editions).length + 1;
  const [title, setTitle] = useState(`Edition ${nextEdNumber}`);
  const [date, setDate] = useState('');

  const handleClose = () => {
    setIsNewEditionModalOpen(false);
    setDate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) return;

    createEdition(title.trim(), date.trim());
    handleClose();
  };

  return (
    <Modal isOpen={isNewEditionModalOpen} onClose={handleClose} maxWidth="max-w-md">
      <div className="w-12 h-12 bg-indigo-50 text-[#2F2677] rounded-full flex items-center justify-center mx-auto text-xl mb-3 shadow-inner">
        <CalendarPlus className="w-6 h-6 text-[#2F2677]" />
      </div>

      <h3 className="text-lg font-black text-slate-900 font-heading">
        Roll Out New Tournament Edition
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        Configure date and schedule details
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-left">
        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 font-heading">
            Edition Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Edition 2"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] bg-white"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1 font-heading">
            Event Date (DD/MM/YYYY) *
          </label>
          <input
            type="text"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="e.g. 15/11/2026"
            className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2F2677] bg-white"
          />
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
          <strong>Default 30-Minute Schedule Initialized:</strong> Six 30-min slots from 8:00 PM to 11:00 PM with Pickleball (13 courts = 52 spots), Box Cricket (2 boxes = 28 spots), and Paddle Ball (2 courts = 8 spots). You can configure gender tags per slot after launching.
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 py-2.5 rounded-xl bg-[#2F2677] hover:bg-[#231b61] text-white text-xs font-bold transition cursor-pointer shadow-md"
          >
            Launch Edition
          </button>
        </div>
      </form>
    </Modal>
  );
}
