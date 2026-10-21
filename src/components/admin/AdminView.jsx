import React from 'react';
import AdminHeader from './AdminHeader';
import EditionManager from './EditionManager';
import SlotInventoryTable from './SlotInventoryTable';
import MasterPlayerTable from './MasterPlayerTable';
import NewEditionModal from './NewEditionModal';
import ChangePinModal from './ChangePinModal';

export default function AdminView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <AdminHeader />
      <EditionManager />
      <SlotInventoryTable />
      <MasterPlayerTable />
      <NewEditionModal />
      <ChangePinModal />
    </div>
  );
}
