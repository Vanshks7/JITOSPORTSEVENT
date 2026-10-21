import { MAX_TOTAL_SLOTS_PER_PLAYER, MAX_SLOTS_PER_SPORT } from '../constants/sportsConfig';

/**
 * Returns all confirmed slots for a player in a specific edition
 */
export function getPlayerConfirmedSlotsInEdition(player, editionId) {
  if (!player || !player.confirmedSlots) return [];
  return player.confirmedSlots.filter((item) => item.editionId === editionId);
}

/**
 * Returns total slots and breakdown per sport for a player in an edition
 */
export function getQuotaBreakdown(player, editionId) {
  const slots = getPlayerConfirmedSlotsInEdition(player, editionId);
  const total = slots.length;
  const bySport = { pickleball: 0, cricket: 0, paddleball: 0 };

  slots.forEach((s) => {
    if (bySport[s.sport] !== undefined) {
      bySport[s.sport]++;
    }
  });

  return { total, bySport };
}

/**
 * Validates partner squad IDs for a specific sport booking
 */
export function validatePartnerSquad(leadPlayer, sportKey, selectedSlots, rawPartnerIds, allPlayers, activeEdition) {
  const validPartners = [];
  const cleanIds = rawPartnerIds.map((id) => id?.trim().toUpperCase()).filter(Boolean);

  for (let i = 0; i < cleanIds.length; i++) {
    const pid = cleanIds[i];

    if (pid === leadPlayer.id.toUpperCase()) {
      return { error: "You do not need to add yourself as a partner in the squad fields." };
    }

    const partner = allPlayers.find((p) => p.id?.toUpperCase() === pid);
    if (!partner) {
      return {
        error: `Partner Player ID "${pid}" was not found in the registered player database. Please ensure they sign up first.`
      };
    }

    if (validPartners.includes(partner.id)) {
      return { error: `Duplicate partner ID entered: "${pid}"` };
    }

    // Gender check per slot
    for (const slotKey of selectedSlots) {
      const slotConfig = activeEdition?.inventory?.[sportKey]?.slots?.[slotKey] || { gender: "All" };
      if (slotConfig.gender === "Male Only" && partner.gender !== "Male") {
        return {
          error: `GENDER RESTRICTION: Slot "${slotKey}" is designated as MALE ONLY. Partner ${partner.name} (${partner.id}) is registered as Female and cannot be booked for this slot.`
        };
      }
      if (slotConfig.gender === "Female Only" && partner.gender !== "Female") {
        return {
          error: `GENDER RESTRICTION: Slot "${slotKey}" is designated as FEMALE ONLY. Partner ${partner.name} (${partner.id}) is registered as Male and cannot be booked for this slot.`
        };
      }
    }

    // Check partner quota limits
    const partnerQuota = getQuotaBreakdown(partner, activeEdition.id);
    const slotsAttemptingToBook = selectedSlots.length;

    if (partnerQuota.total + slotsAttemptingToBook > MAX_TOTAL_SLOTS_PER_PLAYER) {
      return {
        error: `PARTNER QUOTA EXCEEDED: Player ${partner.name} (${partner.id}) already has ${partnerQuota.total} slot(s) booked. Adding ${slotsAttemptingToBook} slot(s) would exceed their ${MAX_TOTAL_SLOTS_PER_PLAYER}-slot tournament maximum.`
      };
    }

    if (partnerQuota.bySport[sportKey] + slotsAttemptingToBook > MAX_SLOTS_PER_SPORT) {
      return {
        error: `PARTNER SPORT QUOTA EXCEEDED: Player ${partner.name} (${partner.id}) already has ${partnerQuota.bySport[sportKey]} slot(s) in ${activeEdition.inventory[sportKey]?.name || sportKey}. Maximum ${MAX_SLOTS_PER_SPORT} slots allowed per sport.`
      };
    }

    // Anti-clash check: Is partner already booked in any sport during these slots?
    const partnerConfirmedInEd = getPlayerConfirmedSlotsInEdition(partner, activeEdition.id);
    for (const slotKey of selectedSlots) {
      const collision = partnerConfirmedInEd.find((cs) => cs.slot === slotKey);
      if (collision) {
        const collisionSport = activeEdition.inventory[collision.sport]?.name || collision.sport;
        return {
          error: `COLLISION DETECTED: Partner ${partner.name} (${partner.id}) is already booked for ${collisionSport} at ${slotKey}! They cannot be added to your squad for this time slot.`
        };
      }
    }

    validPartners.push(partner.id);
  }

  return { validPartners };
}
