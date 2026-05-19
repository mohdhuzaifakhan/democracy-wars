import { create } from 'zustand';
import { auth, db, rtdb } from '../config/firebase';
import { ref, set as dbSet, onValue, push, get as dbGet, update as dbUpdate } from 'firebase/database';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { firebaseService } from '../services/firebase';



interface VoterBlocs {
  youth: number;
  farmers: number;
  business: number;
  women: number;
  minorities: number;
  seniors: number;
}

interface PlayerProfile {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  diamonds: number;
  rankTitle: string;
  avatar: string;
}

interface GameState {
  // Auth State
  user: User | null;
  loading: boolean;

  // Global User Data
  profile: PlayerProfile;
  
  // Lobby State
  roomCode: string | null;
  playersList: any[]; // Updated to hold more than just names
  isHost: boolean;
  
  // Current Game Session Data
  currentRound: number;
  totalRounds: number;
  selectedPartyId: string | null;
  selectedAvatarIndex: number;
  selectedManifestoIds: string[];
  ideology: {
    economy: number;
    social: number;
    diplomacy: number;
  };
  
  // Advanced Simulation Stats
  blocApproval: VoterBlocs;
  trustScore: number;
  momentum: number;
  corruptionRisk: number;
  budget: number;
  
  // Opponent Stats
  opponentApproval: VoterBlocs;
  
  // Auth Actions
  initAuth: () => void;
  signInGuest: () => Promise<void>;
  
  // Actions
  updateProfile: (data: Partial<PlayerProfile>) => Promise<void>;
  setGameSession: (data: Partial<GameState>, sync?: boolean) => void;
  syncGameState: () => Promise<void>;
  
  // Public Rooms & Matchmaking
  publicRooms: any[];
  fetchPublicRooms: () => void;
  startMatchmaking: (region: string, mode: string) => Promise<void>;
  cancelMatchmaking: () => void;
  
  nextRound: () => void;
  resetGame: () => void;
  
  // Lobby Actions
  createRoom: () => Promise<void>;
  joinRoom: (code: string) => Promise<boolean>;
  leaveRoom: () => void;
  
  // Advanced Gameplay Logic
  applyAction: (actionType: 'rally' | 'scheme' | 'tax_cut' | 'safety' | 'expose' | 'fake_news') => void;
  resolveEvent: (impact: Partial<VoterBlocs> & { trust?: number; budget?: number; corruption?: number }) => void;
  calculateWinner: () => { playerVotes: number; opponentVotes: number; winner: string };
}

// Helper to bound values between 0 and 100
const bound = (val: number) => Math.max(0, Math.min(100, val));

export const useGameStore = create<GameState>((set, get) => ({
  user: null,
  loading: true,

  profile: {
    name: 'Arjun Verma',
    level: 1,
    xp: 0,
    maxXp: 1000,
    coins: 500,
    diamonds: 10,
    rankTitle: 'Newcomer',
    avatar: 'https://ui-avatars.com/api/?name=Guest&background=0F172A&color=fff',
  },
  
  roomCode: null,
  playersList: [],
  isHost: false,
  
  currentRound: 1,
  totalRounds: 10,
  selectedPartyId: null,
  selectedAvatarIndex: 0,
  selectedManifestoIds: [],
  ideology: {
    economy: 50,
    social: 50,
    diplomacy: 50,
  },
  
  budget: 100,
  trustScore: 80,
  momentum: 0,
  corruptionRisk: 0,
  
  blocApproval: {
    youth: 40,
    farmers: 30,
    business: 35,
    women: 45,
    minorities: 25,
    seniors: 50,
  },

  opponentApproval: {
    youth: 35,
    farmers: 45,
    business: 40,
    women: 30,
    minorities: 40,
    seniors: 30,
  },

  initAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      set({ user, loading: false });
      if (user) {
        // Load profile from Firestore
        const profileRef = doc(db, 'users', user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          set({ profile: profileSnap.data() as PlayerProfile });
        } else {
          // Create initial profile
          const initialProfile = get().profile;
          await setDoc(profileRef, initialProfile);
        }
      }
    });
  },

  signInGuest: async () => {
    try {
      set({ loading: true });
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Guest Sign-in Error:", error);
      set({ loading: false });
    }
  },

  updateProfile: async (data) => {
    const { user, profile } = get();
    const newProfile = { ...profile, ...data };
    set({ profile: newProfile });
    
    if (user) {
      const profileRef = doc(db, 'users', user.uid);
      await updateDoc(profileRef, data as any);
    }
  },

  setGameSession: (data, sync = false) => {
    set((state) => ({ ...state, ...data }));
    if (sync) {
      get().syncGameState();
    }
  },

  syncGameState: async () => {
    const { roomCode, user } = get();
    if (roomCode && user) {
      await dbUpdate(ref(rtdb, `rooms/${roomCode}/players/${user.uid}/state`), {
        selectedPartyId: get().selectedPartyId,
        selectedAvatarIndex: get().selectedAvatarIndex,
        ideology: get().ideology,
      });
    }
  },

  publicRooms: [],

  fetchPublicRooms: () => {
    const roomsRef = ref(rtdb, 'rooms');
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const publicList = Object.values(data).filter((room: any) => 
          room.status === 'waiting' && !room.isPrivate
        );
        set({ publicRooms: publicList });
      } else {
        set({ publicRooms: [] });
      }
    });
  },

  startMatchmaking: async (region, mode) => {
    const { user, profile } = get();
    if (!user) return;

    const queueRef = ref(rtdb, `matchmaking/queue/${region}/${mode}/${user.uid}`);
    await dbSet(queueRef, {
      uid: user.uid,
      name: profile.name,
      avatar: profile.avatar,
      elo: profile.level * 100, // Simple ELO based on level
      joinedAt: Date.now()
    });

    // In a real app, a Cloud Function would watch this and pair players.
    // For this mockup, we'll simulate finding a room or creating one.
    setTimeout(async () => {
      const roomsRef = ref(rtdb, 'rooms');
      const snapshot = await dbGet(roomsRef);
      const rooms = snapshot.val();
      
      let foundRoom = null;
      if (rooms) {
        foundRoom = Object.values(rooms).find((r: any) => 
          r.status === 'waiting' && r.region === region && Object.keys(r.players).length < 6
        );
      }

      if (foundRoom) {
        await get().joinRoom((foundRoom as any).code);
      } else {
        await get().createRoom();
        // Set region for the new room
        const { roomCode } = get();
        await dbUpdate(ref(rtdb, `rooms/${roomCode}`), { region, mode });
      }
      
      // Remove from queue
      await dbSet(queueRef, null);
    }, 3000);
  },

  cancelMatchmaking: () => {
    const { user } = get();
    if (user) {
      // Logic to remove from all queues
      dbSet(ref(rtdb, `matchmaking/queue`), null); // Simplified for demo
    }
  },

  createRoom: async () => {
    const { profile, user } = get();
    if (!user) return;

    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const roomRef = ref(rtdb, `rooms/${code}`);
    
    const initialRoomData = {
      code,
      hostId: user.uid,
      status: 'waiting',
      createdAt: Date.now(),
      players: {
        [user.uid]: {
          name: profile.name,
          avatar: profile.avatar,
          isHost: true
        }
      }
    };

    await dbSet(roomRef, initialRoomData);
    set({ roomCode: code, isHost: true });

    // Listen for player updates
    onValue(ref(rtdb, `rooms/${code}/players`), (snapshot) => {
      const players = snapshot.val();
      if (players) {
        set({ playersList: Object.values(players) });
      }
    });
  },

  joinRoom: async (code) => {
    const { profile, user } = get();
    if (!user) return false;

    const roomRef = ref(rtdb, `rooms/${code}`);
    const snapshot = await dbGet(roomRef);

    if (snapshot.exists()) {
      // Add player to room
      await dbUpdate(ref(rtdb, `rooms/${code}/players`), {
        [user.uid]: {
          name: profile.name,
          avatar: profile.avatar,
          isHost: false
        }
      });

      set({ roomCode: code, isHost: false });

      // Listen for player updates
      onValue(ref(rtdb, `rooms/${code}/players`), (snapshot) => {
        const players = snapshot.val();
        if (players) {
          set({ playersList: Object.values(players) });
        }
      });

      return true;
    }
    return false;
  },

  leaveRoom: () => {
    const { roomCode, user } = get();
    if (roomCode && user) {
      dbSet(ref(rtdb, `rooms/${roomCode}/players/${user.uid}`), null);
      set({ roomCode: null, playersList: [], isHost: false });
    }
  },

  nextRound: () => set((state) => {
    const nextR = Math.min(state.currentRound + 1, state.totalRounds);
    const nextMomentum = state.momentum + (state.currentRound > 5 ? 2 : 1);
    
    // Auto-trigger background session backup sync
    firebaseService.saveSession({
      coins: state.profile.coins,
      diamonds: state.profile.diamonds,
      level: state.profile.level,
      rankTitle: state.profile.rankTitle,
      selectedPartyId: state.selectedPartyId || '',
      selectedAvatarIndex: state.selectedAvatarIndex,
      currentRound: nextR,
      budget: state.budget,
      trustScore: state.trustScore,
    });

    return { 
      currentRound: nextR,
      momentum: nextMomentum
    };
  }),

  resetGame: () => {
    const { roomCode, user, isHost } = get();
    if (roomCode && isHost) {
      // Host resets the room in RTDB
      dbUpdate(ref(rtdb, `rooms/${roomCode}`), { status: 'waiting' });
    }
    
    set({
      currentRound: 1,
      budget: 100,
      trustScore: 80,
      momentum: 0,
      corruptionRisk: 0,
      ideology: { economy: 50, social: 50, diplomacy: 50 },
      blocApproval: { youth: 40, farmers: 30, business: 35, women: 45, minorities: 25, seniors: 50 },
      opponentApproval: { youth: 35, farmers: 45, business: 40, women: 30, minorities: 40, seniors: 30 },
    });
  },

  applyAction: (type) => set((state) => {
    let newBlocs = { ...state.blocApproval };
    let newOpponent = { ...state.opponentApproval };
    let newBudget = state.budget;
    let newTrust = state.trustScore;
    let newCorruption = state.corruptionRisk;

    switch(type) {
      case 'rally':
        newBudget -= 15;
        newBlocs.youth = bound(newBlocs.youth + 10);
        break;
      case 'scheme':
        newBudget -= 20;
        newBlocs.farmers = bound(newBlocs.farmers + 15);
        break;
      case 'tax_cut':
        newBudget -= 25;
        newBlocs.business = bound(newBlocs.business + 12);
        break;
      case 'safety':
        newBudget -= 10;
        newBlocs.women = bound(newBlocs.women + 12);
        break;
      case 'expose':
        newBudget -= 15;
        newOpponent.farmers = bound(newOpponent.farmers - 15);
        newTrust = bound(newTrust - 5);
        newCorruption = bound(newCorruption + 10);
        break;
      case 'fake_news':
        newBudget -= 10;
        newOpponent.youth = bound(newOpponent.youth - 20);
        newTrust = bound(newTrust - 15);
        newCorruption = bound(newCorruption + 25);
        break;
    }

    const nextState = { 
      blocApproval: newBlocs, 
      opponentApproval: newOpponent,
      budget: newBudget,
      trustScore: newTrust,
      corruptionRisk: newCorruption
    };

    // Auto-trigger background session backup sync
    firebaseService.saveSession({
      coins: state.profile.coins,
      diamonds: state.profile.diamonds,
      level: state.profile.level,
      rankTitle: state.profile.rankTitle,
      selectedPartyId: state.selectedPartyId || '',
      selectedAvatarIndex: state.selectedAvatarIndex,
      currentRound: state.currentRound,
      budget: newBudget,
      trustScore: newTrust,
    });

    return nextState;
  }),

  resolveEvent: (impact) => set((state) => ({
    blocApproval: {
      youth: bound(state.blocApproval.youth + (impact.youth || 0)),
      farmers: bound(state.blocApproval.farmers + (impact.farmers || 0)),
      business: bound(state.blocApproval.business + (impact.business || 0)),
      women: bound(state.blocApproval.women + (impact.women || 0)),
      minorities: bound(state.blocApproval.minorities + (impact.minorities || 0)),
      seniors: bound(state.blocApproval.seniors + (impact.seniors || 0)),
    },
    trustScore: bound(state.trustScore + (impact.trust || 0)),
    budget: Math.max(0, state.budget + (impact.budget || 0)),
    corruptionRisk: bound(state.corruptionRisk + (impact.corruption || 0))
  })),

  calculateWinner: () => {
    const state = get();
    const pop = { youth: 25000, farmers: 20000, business: 15000, women: 15000, minorities: 15000, seniors: 10000 };
    
    const calculateVotes = (approval: VoterBlocs) => {
      return (pop.youth * (approval.youth/100)) +
             (pop.farmers * (approval.farmers/100)) +
             (pop.business * (approval.business/100)) +
             (pop.women * (approval.women/100)) +
             (pop.minorities * (approval.minorities/100)) +
             (pop.seniors * (approval.seniors/100));
    };

    const playerVotes = Math.floor(calculateVotes(state.blocApproval));
    const opponentVotes = Math.floor(calculateVotes(state.opponentApproval));
    
    return {
      playerVotes,
      opponentVotes,
      winner: playerVotes > opponentVotes ? 'Player' : 'Opponent'
    };
  }

}));

