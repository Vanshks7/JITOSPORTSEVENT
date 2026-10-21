import { TIME_SLOTS_30MIN } from './timeSlots';

export function createDefaultInventory30Min() {
  const inv = {
    pickleball: { name: "Pickleball", slots: {} },
    cricket: { name: "Box Cricket", slots: {} },
    paddleball: { name: "Paddle Ball", slots: {} }
  };

  TIME_SLOTS_30MIN.forEach((slot) => {
    inv.pickleball.slots[slot] = { cap: 52, booked: 0, gender: "All" };
    inv.cricket.slots[slot] = { cap: 28, booked: 0, gender: "All" };
    inv.paddleball.slots[slot] = { cap: 8, booked: 0, gender: "All" };
  });

  return inv;
}

export const FRESH_DEFAULT_EDITIONS = {
  "ed_1": {
    id: "ed_1",
    title: "Edition 1",
    date: "29/10/2026",
    status: "open",
    inventory: createDefaultInventory30Min()
  }
};

export const DEFAULT_ADMIN_PIN = "1926";
