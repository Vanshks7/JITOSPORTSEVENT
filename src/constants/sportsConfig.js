export const SPORTS_CONFIG = {
  pickleball: {
    id: 'pickleball',
    name: 'Pickleball',
    courts: 13,
    spotsPerCourt: 4,
    defaultCapacity: 52,
    maxSlotsPerPlayer: 2,
    allowSquad: true,
    maxSquadSize: 4,
    badgeColor: 'bg-indigo-100 text-[#2F2677] border-indigo-200',
    primaryColor: '#2F2677',
    iconClass: 'fa-table-tennis-paddle-ball',
    lucideIcon: 'TableTennis',
    description: '13 Courts (52 spots per 30-min slot)'
  },
  cricket: {
    id: 'cricket',
    name: 'Box Cricket',
    courts: 2,
    spotsPerCourt: 14,
    defaultCapacity: 28,
    maxSlotsPerPlayer: 2,
    allowSquad: false,
    maxSquadSize: 1,
    badgeColor: 'bg-rose-100 text-[#E20111] border-rose-200',
    primaryColor: '#E20111',
    iconClass: 'fa-baseball-bat-ball',
    lucideIcon: 'CircleDot',
    description: '2 Boxes (28 spots per 30-min slot)'
  },
  paddleball: {
    id: 'paddleball',
    name: 'Paddle Ball',
    courts: 2,
    spotsPerCourt: 4,
    defaultCapacity: 8,
    maxSlotsPerPlayer: 2,
    allowSquad: true,
    maxSquadSize: 4,
    badgeColor: 'bg-emerald-100 text-[#008F3D] border-emerald-200',
    primaryColor: '#008F3D',
    iconClass: 'fa-racquet',
    lucideIcon: 'Trophy',
    description: '2 Courts (8 spots per 30-min slot)'
  }
};

export const MAX_TOTAL_SLOTS_PER_PLAYER = 4;
export const MAX_SLOTS_PER_SPORT = 2;
