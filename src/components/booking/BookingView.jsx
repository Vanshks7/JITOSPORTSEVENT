import React from 'react';
import PlayerProfileCard from './PlayerProfileCard';
import SquadAlert from './SquadAlert';
import ConfirmedSlotsTable from './ConfirmedSlotsTable';
import SlotBookingForm from './SlotBookingForm';
import BookingPassModal from './BookingPassModal';

export default function BookingView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <PlayerProfileCard />
      <SquadAlert />
      <ConfirmedSlotsTable />
      <SlotBookingForm />
      <BookingPassModal />
    </div>
  );
}
