import React from 'react';
import Modal from '../common/Modal';
import { useTournament } from '../../hooks/useTournament';

export default function BookingPassModal() {
  const { isPassModalOpen, setIsPassModalOpen, lastBookingPassData } = useTournament();

  if (!lastBookingPassData) return null;

  const { player, edition, selectedSports, playerSelections, pbPartners, paddlePartners } = lastBookingPassData;

  const handleClose = () => {
    setIsPassModalOpen(false);
  };

  return (
    <Modal isOpen={isPassModalOpen} onClose={handleClose} maxWidth="max-w-md">
      <div>
        <div className="w-14 h-14 bg-green-100 text-[#008F3D] rounded-full flex items-center justify-center mx-auto text-2xl mb-3">
          <i className="fa-solid fa-circle-check" />
        </div>

        <h3 className="text-xl font-black text-slate-900">
          Slots Successfully Reserved!
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Present this pass with your photo verification at the venue.
        </p>

        {/* Digital Pass Card */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5">
          <div className="flex items-center gap-3 border-b pb-2">
            <img
              src={player.photo || ''}
              alt="Pass Photo"
              className="w-12 h-12 rounded-full object-cover border border-[#2F2677]"
            />
            <div>
              <div className="font-black text-[#2F2677] font-mono text-sm">
                {player.id}
              </div>
              <div className="font-bold text-slate-900">
                {player.name}
              </div>
              <div className="text-[11px] text-emerald-700 font-bold">
                {edition.title} — {edition.date}
              </div>
            </div>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">Booked Slots:</span>
            <div className="space-y-1 font-semibold">
              {selectedSports.includes('pickleball') && (
                <div className="text-[#2F2677]">
                  • Pickleball: <strong>{playerSelections.pickleball?.join(', ')}</strong>
                  {pbPartners?.length > 0 && (
                    <span> (Squad: {[player.id, ...pbPartners].join(', ')})</span>
                  )}
                </div>
              )}

              {selectedSports.includes('cricket') && (
                <div className="text-[#E20111]">
                  • Box Cricket: <strong>{playerSelections.cricket?.join(', ')}</strong>
                </div>
              )}

              {selectedSports.includes('paddleball') && (
                <div className="text-[#008F3D]">
                  • Paddle Ball: <strong>{playerSelections.paddleball?.join(', ')}</strong>
                  {paddlePartners?.length > 0 && (
                    <span> (Squad: {[player.id, ...paddlePartners].join(', ')})</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleClose}
          className="w-full mt-5 py-3 bg-[#2F2677] text-white font-bold rounded-xl text-sm hover:bg-[#231b61] transition cursor-pointer"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}
