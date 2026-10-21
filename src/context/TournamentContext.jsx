import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  FRESH_DEFAULT_EDITIONS,
  DEFAULT_ADMIN_PIN,
  createDefaultInventory30Min
} from '../constants/defaultData';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { generateRandomPlayerId } from '../utils/idGenerator';
import { validatePartnerSquad, getQuotaBreakdown, getPlayerConfirmedSlotsInEdition } from '../utils/validation';

const STORAGE_KEYS = {
  EDITIONS: 'jito_editions_v21',
  ACTIVE_EDITION: 'jito_active_edition_id_v21',
  PLAYERS: 'jito_players_v21',
  ADMIN_PIN: 'jito_admin_pin'
};

export const TournamentContext = createContext(null);

export function TournamentProvider({ children }) {
  // Editions state
  const [editions, setEditions] = useState(() =>
    getStorageItem(STORAGE_KEYS.EDITIONS, FRESH_DEFAULT_EDITIONS)
  );

  const [activeEditionId, setActiveEditionId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_EDITION) || 'ed_1';
    return editions[saved] ? saved : Object.keys(editions)[0] || 'ed_1';
  });

  // Players state - strictly starts empty as given in original HTML
  const [players, setPlayers] = useState(() =>
    getStorageItem(STORAGE_KEYS.PLAYERS, [])
  );

  const [loggedInPlayer, setLoggedInPlayer] = useState(null);

  const [adminPin, setAdminPin] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || DEFAULT_ADMIN_PIN
  );

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [authInitialTab, setAuthInitialTab] = useState('login');

  // Modals
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isSignupSuccessOpen, setIsSignupSuccessOpen] = useState(false);
  const [newAssignedPlayer, setNewAssignedPlayer] = useState(null);
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [lastBookingPassData, setLastBookingPassData] = useState(null);
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isNewEditionModalOpen, setIsNewEditionModalOpen] = useState(false);
  const [isChangePinModalOpen, setIsChangePinModalOpen] = useState(false);

  // Sync to localStorage exactly with original keys
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.EDITIONS, editions);
  }, [editions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_EDITION, activeEditionId);
  }, [activeEditionId]);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.PLAYERS, players);
    if (loggedInPlayer) {
      const refreshed = players.find((p) => p.id === loggedInPlayer.id);
      if (refreshed) {
        setLoggedInPlayer(refreshed);
      }
    }
  }, [players]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, adminPin);
  }, [adminPin]);

  // Navigation
  const navigateTo = useCallback((viewName) => {
    setActiveView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openAuth = useCallback((tab = 'login') => {
    if (loggedInPlayer) {
      navigateTo('booking');
      return;
    }
    setAuthInitialTab(tab);
    navigateTo('auth');
  }, [loggedInPlayer, navigateTo]);

  // Helper: Active Edition Object
  const getActiveEdition = useCallback(() => {
    return editions[activeEditionId] || Object.values(editions)[0];
  }, [editions, activeEditionId]);

  // 1. REGISTER PLAYER
  const registerPlayer = useCallback((formData) => {
    const { name, mobile, gender, age, membership, freq_pickleball, freq_cricket, freq_paddle, password, photo } = formData;

    const existing = players.find((p) => p.mobile === mobile);
    if (existing) {
      return {
        success: false,
        error: `Mobile number (+91 ${mobile}) is already registered with Player ID: ${existing.id}. Please log in.`
      };
    }

    const assignedId = generateRandomPlayerId(gender, players);

    const newPlayer = {
      id: assignedId,
      photo,
      name,
      mobile,
      gender,
      age,
      membership,
      freq_pickleball,
      freq_cricket,
      freq_paddle,
      password,
      registeredAt: new Date().toLocaleString(),
      confirmedSlots: []
    };

    setPlayers((prev) => [...prev, newPlayer]);
    setLoggedInPlayer(newPlayer);
    setNewAssignedPlayer(newPlayer);
    setIsSignupSuccessOpen(true);

    return { success: true, player: newPlayer };
  }, [players]);

  // 2. LOGIN PLAYER
  const loginPlayer = useCallback((identifier, password) => {
    const cleanId = identifier.trim().toUpperCase();
    const player = players.find(
      (p) => p.id?.toUpperCase() === cleanId || p.mobile === cleanId
    );

    if (!player) {
      return { success: false, error: 'No player found with that Player ID or Mobile Number.' };
    }

    if (player.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setLoggedInPlayer(player);
    navigateTo('booking');
    return { success: true, player };
  }, [players, navigateTo]);

  // 3. LOGOUT PLAYER
  const logoutPlayer = useCallback(() => {
    setLoggedInPlayer(null);
    navigateTo('home');
  }, [navigateTo]);

  // 4. RESET PASSWORD
  const resetPassword = useCallback((identifier, newPassword) => {
    const cleanId = identifier.trim().toUpperCase();
    const playerIndex = players.findIndex(
      (p) => p.id?.toUpperCase() === cleanId || p.mobile === cleanId
    );

    if (playerIndex === -1) {
      return { success: false, error: 'No player found with that Player ID or Mobile Number.' };
    }

    const updated = [...players];
    updated[playerIndex] = {
      ...updated[playerIndex],
      password: newPassword
    };

    setPlayers(updated);
    alert(`Password updated successfully for ${updated[playerIndex].name} (${updated[playerIndex].id})! You can now log in.`);
    return { success: true };
  }, [players]);

  // 5. BOOK SLOTS
  const bookSlots = useCallback(({ selectedSports, playerSelections, pbPartners, paddlePartners }) => {
    if (!loggedInPlayer) return { success: false };

    const currentEd = getActiveEdition();
    const inv = JSON.parse(JSON.stringify(currentEd.inventory));

    // Partner validations using exact alert messages
    let validPbPartners = [];
    if (selectedSports.includes('pickleball') && pbPartners?.length) {
      const pbRes = validatePartnerSquad(loggedInPlayer, 'pickleball', playerSelections.pickleball, pbPartners, players, currentEd);
      if (pbRes.error) {
        alert(pbRes.error);
        return { success: false, error: pbRes.error };
      }
      validPbPartners = pbRes.validPartners;
    }

    let validPaddlePartners = [];
    if (selectedSports.includes('paddleball') && paddlePartners?.length) {
      const padRes = validatePartnerSquad(loggedInPlayer, 'paddleball', playerSelections.paddleball, paddlePartners, players, currentEd);
      if (padRes.error) {
        alert(padRes.error);
        return { success: false, error: padRes.error };
      }
      validPaddlePartners = padRes.validPartners;
    }

    const pbSpotsPerSlot = 1 + validPbPartners.length;
    const paddleSpotsPerSlot = 1 + validPaddlePartners.length;
    const cricketSpotsPerSlot = 1;

    // Check capacity for Pickleball
    if (selectedSports.includes('pickleball')) {
      for (let pIdx = 0; pIdx < playerSelections.pickleball.length; pIdx++) {
        const pSlot = playerSelections.pickleball[pIdx];
        const pRemaining = inv.pickleball.slots[pSlot].cap - inv.pickleball.slots[pSlot].booked;
        if (pRemaining < pbSpotsPerSlot) {
          alert(`Not enough spots in Pickleball ${pSlot} for your squad (${pbSpotsPerSlot} needed, only ${pRemaining} available).`);
          return { success: false };
        }
      }
    }

    // Check capacity for Box Cricket
    if (selectedSports.includes('cricket')) {
      for (let cIdx = 0; cIdx < playerSelections.cricket.length; cIdx++) {
        const crSlot = playerSelections.cricket[cIdx];
        const crRemaining = inv.cricket.slots[crSlot].cap - inv.cricket.slots[crSlot].booked;
        if (crRemaining < cricketSpotsPerSlot) {
          alert(`The ${crSlot} slot for Box Cricket is full.`);
          return { success: false };
        }
      }
    }

    // Check capacity for Paddle Ball
    if (selectedSports.includes('paddleball')) {
      for (let pdIdx = 0; pdIdx < playerSelections.paddleball.length; pdIdx++) {
        const pdSlot = playerSelections.paddleball[pdIdx];
        const pdRemaining = inv.paddleball.slots[pdSlot].cap - inv.paddleball.slots[pdSlot].booked;
        if (pdRemaining < paddleSpotsPerSlot) {
          alert(`Not enough spots in Paddle Ball ${pdSlot} for your squad (${paddleSpotsPerSlot} needed, only ${pdRemaining} available).`);
          return { success: false };
        }
      }
    }

    const currentTimestamp = new Date().toLocaleString();
    const updatedPlayers = JSON.parse(JSON.stringify(players));

    const findOrCreateConfirmed = (pid) => {
      const p = updatedPlayers.find((item) => item.id === pid);
      if (!p) return null;
      if (!p.confirmedSlots) p.confirmedSlots = [];
      return p;
    };

    const currentLead = findOrCreateConfirmed(loggedInPlayer.id);

    // Apply Pickleball Bookings
    if (selectedSports.includes('pickleball')) {
      const squad = [loggedInPlayer.id, ...validPbPartners];
      playerSelections.pickleball.forEach((slotName) => {
        inv.pickleball.slots[slotName].booked += pbSpotsPerSlot;
        const slotGender = inv.pickleball.slots[slotName].gender || 'All';

        const rec = {
          editionId: currentEd.id,
          editionTitle: currentEd.title,
          editionDate: currentEd.date,
          sport: 'pickleball',
          slot: slotName,
          genderTag: slotGender,
          lead: loggedInPlayer.id,
          team: squad,
          timestamp: currentTimestamp
        };

        currentLead.confirmedSlots.push(rec);

        validPbPartners.forEach((pid) => {
          const partnerObj = findOrCreateConfirmed(pid);
          if (partnerObj) partnerObj.confirmedSlots.push({ ...rec });
        });
      });
    }

    // Apply Cricket Bookings
    if (selectedSports.includes('cricket')) {
      playerSelections.cricket.forEach((slotName) => {
        inv.cricket.slots[slotName].booked += cricketSpotsPerSlot;
        const slotGender = inv.cricket.slots[slotName].gender || 'All';

        const rec = {
          editionId: currentEd.id,
          editionTitle: currentEd.title,
          editionDate: currentEd.date,
          sport: 'cricket',
          slot: slotName,
          genderTag: slotGender,
          lead: loggedInPlayer.id,
          team: [loggedInPlayer.id],
          timestamp: currentTimestamp
        };

        currentLead.confirmedSlots.push(rec);
      });
    }

    // Apply Paddle Ball Bookings
    if (selectedSports.includes('paddleball')) {
      const squad = [loggedInPlayer.id, ...validPaddlePartners];
      playerSelections.paddleball.forEach((slotName) => {
        inv.paddleball.slots[slotName].booked += paddleSpotsPerSlot;
        const slotGender = inv.paddleball.slots[slotName].gender || 'All';

        const rec = {
          editionId: currentEd.id,
          editionTitle: currentEd.title,
          editionDate: currentEd.date,
          sport: 'paddleball',
          slot: slotName,
          genderTag: slotGender,
          lead: loggedInPlayer.id,
          team: squad,
          timestamp: currentTimestamp
        };

        currentLead.confirmedSlots.push(rec);

        validPaddlePartners.forEach((pid) => {
          const partnerObj = findOrCreateConfirmed(pid);
          if (partnerObj) partnerObj.confirmedSlots.push({ ...rec });
        });
      });
    }

    // Update editions inventory
    setEditions((prev) => ({
      ...prev,
      [currentEd.id]: {
        ...prev[currentEd.id],
        inventory: inv
      }
    }));

    // Update players
    setPlayers(updatedPlayers);
    setLoggedInPlayer(currentLead);

    // Prepare pass modal
    const passData = {
      player: currentLead,
      edition: currentEd,
      selectedSports,
      playerSelections,
      pbPartners: validPbPartners,
      paddlePartners: validPaddlePartners,
      timestamp: currentTimestamp
    };
    setLastBookingPassData(passData);
    setIsPassModalOpen(true);

    return { success: true };
  }, [loggedInPlayer, getActiveEdition, players]);

  // 6. ADMIN ACTIONS
  const verifyAdminPinAction = useCallback((enteredPin) => {
    if (enteredPin === adminPin) {
      setIsAdminAuthenticated(true);
      setIsAdminAuthModalOpen(false);
      navigateTo('admin');
      return true;
    }
    return false;
  }, [adminPin, navigateTo]);

  const changeAdminPinAction = useCallback((currentPin, newPin) => {
    if (currentPin !== adminPin) {
      return { success: false, error: 'Current PIN is incorrect.' };
    }
    setAdminPin(newPin);
    localStorage.setItem('jito_admin_pin', newPin);
    setIsChangePinModalOpen(false);
    alert('Admin PIN updated successfully!');
    return { success: true };
  }, [adminPin]);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    if (loggedInPlayer) {
      navigateTo('booking');
    } else {
      navigateTo('home');
    }
  }, [loggedInPlayer, navigateTo]);

  const createEdition = useCallback((title, date) => {
    const newId = `ed_${Object.keys(editions).length + 1}`;
    const newEd = {
      id: newId,
      title,
      date,
      status: 'open',
      inventory: createDefaultInventory30Min()
    };

    setEditions((prev) => ({
      ...prev,
      [newId]: newEd
    }));
    setActiveEditionId(newId);
    setIsNewEditionModalOpen(false);
    alert(`Successfully created ${title}! It is now the active tournament edition.`);
  }, [editions]);

  const switchEdition = useCallback((newId) => {
    if (editions[newId]) {
      setActiveEditionId(newId);
    }
  }, [editions]);

  const updateSlotCapacity = useCallback((sportKey, slotKey, newCapValue) => {
    const val = parseInt(newCapValue, 10);
    if (isNaN(val) || val < 0) return;

    setEditions((prev) => {
      const ed = prev[activeEditionId];
      if (!ed) return prev;
      const updatedInv = { ...ed.inventory };
      if (!updatedInv[sportKey]?.slots?.[slotKey]) return prev;

      updatedInv[sportKey].slots[slotKey].cap = val;
      return {
        ...prev,
        [activeEditionId]: {
          ...ed,
          inventory: updatedInv
        }
      };
    });
  }, [activeEditionId]);

  const updateSlotGender = useCallback((sportKey, slotKey, newGenderValue) => {
    setEditions((prev) => {
      const ed = prev[activeEditionId];
      if (!ed) return prev;
      const updatedInv = { ...ed.inventory };
      if (!updatedInv[sportKey]?.slots?.[slotKey]) return prev;

      updatedInv[sportKey].slots[slotKey].gender = newGenderValue;
      return {
        ...prev,
        [activeEditionId]: {
          ...ed,
          inventory: updatedInv
        }
      };
    });
  }, [activeEditionId]);

  // Global key listener for Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminAuthenticated) {
          navigateTo('admin');
        } else {
          setIsAdminAuthModalOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated, navigateTo]);

  return (
    <TournamentContext.Provider
      value={{
        editions,
        activeEditionId,
        activeEdition: getActiveEdition(),
        players,
        loggedInPlayer,
        adminPin,
        isAdminAuthenticated,
        activeView,
        authInitialTab,
        // Modal states & setters
        isResetPasswordOpen,
        setIsResetPasswordOpen,
        isSignupSuccessOpen,
        setIsSignupSuccessOpen,
        newAssignedPlayer,
        isPassModalOpen,
        setIsPassModalOpen,
        lastBookingPassData,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        isNewEditionModalOpen,
        setIsNewEditionModalOpen,
        isChangePinModalOpen,
        setIsChangePinModalOpen,
        // Methods
        navigateTo,
        openAuth,
        registerPlayer,
        loginPlayer,
        logoutPlayer,
        resetPassword,
        bookSlots,
        verifyAdminPin: verifyAdminPinAction,
        changeAdminPin: changeAdminPinAction,
        logoutAdmin,
        createEdition,
        switchEdition,
        updateSlotCapacity,
        updateSlotGender
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
}
