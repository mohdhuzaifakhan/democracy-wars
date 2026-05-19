export const PARTIES = [
  { id: '1', name: 'Jan Shakti Party', color: '#B91C1C', icon: 'hand-back-fist' },
  { id: '2', name: 'Nav Vikas Party', color: '#1D4ED8', icon: 'dharmachakra' },
  { id: '3', name: 'Aam Jan Morcha', color: '#15803D', icon: 'leaf' },
  { id: '4', name: 'Bharat Progress Party', color: '#6D28D9', icon: 'target' },
];

export const CANDIDATE_AVATARS = [
  'https://ui-avatars.com/api/?name=Arjun+Verma&background=0D8ABC&color=fff',
  'https://ui-avatars.com/api/?name=Rohan+Mehta&background=EF4444&color=fff',
  'https://ui-avatars.com/api/?name=Kavya+Iyer&background=22C55E&color=fff',
  'https://ui-avatars.com/api/?name=Aditya+Singh&background=8B5CF6&color=fff',
];

export const USER_PROFILE = {
  id: 'u1',
  name: 'Arjun Verma',
  rankTitle: 'Rising Leader',
  level: 12,
  coins: 12450,
  diamonds: 245,
  wins: 125,
  winPercentage: 68,
  globalRank: 12,
  avatar: 'https://ui-avatars.com/api/?name=Arjun+Verma&background=0D8ABC&color=fff'
};

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'Arjun Verma', wins: 125, winPercentage: 68, avatar: 'https://ui-avatars.com/api/?name=Arjun+Verma&background=0D8ABC&color=fff', isUser: true },
  { rank: 2, name: 'Rohan Mehta', wins: 98, winPercentage: 64, avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=EF4444&color=fff', isUser: false },
  { rank: 3, name: 'Kavya Iyer', wins: 85, winPercentage: 62, avatar: 'https://ui-avatars.com/api/?name=Kavya+Iyer&background=22C55E&color=fff', isUser: false },
  { rank: 4, name: 'Aditya Singh', wins: 72, winPercentage: 58, avatar: 'https://ui-avatars.com/api/?name=Aditya+Singh&background=8B5CF6&color=fff', isUser: false },
  { rank: 5, name: 'Zoya Khan', wins: 60, winPercentage: 55, avatar: 'https://ui-avatars.com/api/?name=Zoya+Khan&background=FACC15&color=fff', isUser: false },
];

export const ACTION_CARDS = [
  {
    id: 'c1',
    title: 'MEGA RALLY',
    description: 'Organize a huge rally in a selected region.',
    effect: '+15% votes in target region',
    cost: 2000,
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=500&q=80',
  },
  {
    id: 'c2',
    title: 'MEDIA CAMPAIGN',
    description: 'Increase your influence through TV and social media.',
    effect: '+10% media reach',
    cost: 1500,
    image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500&q=80',
  },
  {
    id: 'c3',
    title: 'ATTACK RIVAL',
    description: 'Decrease opponent approval in a key region.',
    effect: '-10% rival approval',
    cost: 1200,
    image: 'https://images.unsplash.com/photo-1529107386315-e1c701de49c9?w=500&q=80',
  }
];

export const REGIONS = [
  { id: 'r1', name: 'North', seats: 120, currentLeader: '1', voteShare: { '1': 52, '2': 30, '3': 18 } },
  { id: 'r2', name: 'South', seats: 130, currentLeader: '2', voteShare: { '1': 20, '2': 60, '3': 20 } },
  { id: 'r3', name: 'East', seats: 90, currentLeader: '3', voteShare: { '1': 25, '2': 25, '3': 50 } },
  { id: 'r4', name: 'West', seats: 110, currentLeader: '1', voteShare: { '1': 45, '2': 40, '3': 15 } },
  { id: 'r5', name: 'Central', seats: 93, currentLeader: '2', voteShare: { '1': 35, '2': 45, '3': 20 } },
];
