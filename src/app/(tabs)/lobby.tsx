import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { useGameStore } from '../../store/gameStore';

export default function LobbyScreen() {
  const router = useRouter();
  const { createRoom, joinRoom, publicRooms, fetchPublicRooms, startMatchmaking } = useGameStore();
  const [activeTab, setActiveTab] = useState<'quick' | 'browser' | 'create'>('quick');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchPublicRooms();
  }, []);

  // Create Lobby State
  const [map, setMap] = useState('India (543 Seats)');
  const [players, setPlayers] = useState('6 Players');
  const [difficulty, setDifficulty] = useState('Normal');
  const [aiFill, setAiFill] = useState(true);

  // Join Lobby State
  const [roomCodeInput, setRoomCodeInput] = useState('');

  const handleQuickMatch = async () => {
    setIsSearching(true);
    await startMatchmaking('Global', 'Normal');
    // startMatchmaking will handle navigation internally in my simulation
    // but in real app we'd wait for match:found
    setTimeout(() => {
      setIsSearching(false);
      router.push('/lobby-waiting');
    }, 3000);
  };

  const handleCreate = async () => {
    await createRoom();
    router.push('/lobby-waiting');
  };

  const handleJoinByCode = async () => {
    if (await joinRoom(roomCodeInput)) {
      router.push('/lobby-waiting');
    } else {
      alert('Invalid Room Code');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WAR ROOM LOBBY</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.tabContainer}>
        {['quick', 'browser', 'create'].map((tab) => (
          <TouchableOpacity
            key={tab}
            activeOpacity={0.8}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'quick' && renderQuickMatch()}
        {activeTab === 'browser' && renderBrowser()}
        {activeTab === 'create' && renderCreateLobby()}
      </ScrollView>
    </View>
  );

  function renderQuickMatch() {
    return (
      <View style={styles.panel}>
        <View style={styles.matchmakingInfo}>
          <MaterialCommunityIcons name="radar" size={80} color={isSearching ? "#FACC15" : "#64748B"} />
          <Text style={styles.matchTitle}>{isSearching ? "SEARCHING..." : "READY FOR BATTLE?"}</Text>
          <Text style={styles.matchDesc}>
            {isSearching
              ? "Finding best opponents based on your ELO rank..."
              : "Jump into a game instantly with players of your skill level."}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.actionButtonWrapper}
          activeOpacity={0.8}
          onPress={handleQuickMatch}
          disabled={isSearching}
        >
          <LinearGradient colors={isSearching ? ['#475569', '#1E293B'] : ['#B91C1C', '#7F1D1D']} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{isSearching ? "CANCEL SEARCH" : "FIND MATCH"}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>1.2k</Text>
            <Text style={styles.statLabel}>Online</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>45s</Text>
            <Text style={styles.statLabel}>Avg Time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>24ms</Text>
            <Text style={styles.statLabel}>Ping</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderBrowser() {
    return (
      <View style={styles.browserContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Room Code or Host..."
            placeholderTextColor="#64748B"
            value={roomCodeInput}
            onChangeText={setRoomCodeInput}
          />
          {roomCodeInput.length > 0 && (
            <TouchableOpacity onPress={handleJoinByCode} style={styles.goBtn}>
              <Text style={styles.goText}>GO</Text>
            </TouchableOpacity>
          )}
        </View>

        {publicRooms.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="server-off" size={48} color="#334155" />
            <Text style={styles.emptyText}>No public rooms found.</Text>
            <TouchableOpacity onPress={handleCreate}>
              <Text style={styles.createLink}>Be the first to host!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          publicRooms.map((room, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.roomCard}
              onPress={() => joinRoom(room.code).then(() => router.push('/lobby-waiting'))}
            >
              <View style={styles.roomCardLeft}>
                <Text style={styles.roomCode}>{room.code}</Text>
                <Text style={styles.roomHost}>Host: {room.players[room.hostId]?.name || 'Unknown'}</Text>
              </View>
              <View style={styles.roomCardRight}>
                <View style={styles.capacityBar}>
                  <View style={[styles.capacityFill, { width: `${(Object.keys(room.players).length / 6) * 100}%` }]} />
                </View>
                <Text style={styles.playerCount}>{Object.keys(room.players).length}/6</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#FACC15" />
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    );
  }

  function renderCreateLobby() {
    return (
      <View style={styles.panel}>
        {/* Setting Row */}
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Select Map</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{map}</Text>
            <MaterialCommunityIcons name="map-marker-radius" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Max Players</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{players}</Text>
            <MaterialCommunityIcons name="account-group" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Difficulty</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{difficulty}</Text>
            <MaterialCommunityIcons name="sword" size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Allow AI Fill</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.toggle, aiFill && styles.toggleActive]}
            onPress={() => setAiFill(!aiFill)}
          >
            <View style={[styles.toggleThumb, aiFill && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.actionButtonWrapper}
          activeOpacity={0.8}
          onPress={handleCreate}
        >
          <LinearGradient colors={['#D97706', '#92400E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>CREATE ROOM</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    padding: 4,
    marginBottom: SPACING.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(51, 65, 85, 0.8)',
  },
  tabText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  activeTabText: {
    color: COLORS.text,
    fontFamily: FONTS.bold,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 40,
  },
  panel: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 24,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  roomCodeBox: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.xl,
  },
  label: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 8,
  },
  labelCenter: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: 'center',
  },
  roomCodeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomCodeText: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: '#F8FAFC',
    letterSpacing: 2,
  },
  copyButton: {
    backgroundColor: 'rgba(22, 163, 74, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.5)',
  },
  copyButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#4ADE80',
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  settingLabel: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#CBD5E1',
  },
  dropdown: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    minWidth: 140,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontFamily: FONTS.regular,
    fontSize: 13,
    color: '#F8FAFC',
  },
  toggle: {
    width: 50,
    height: 28,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#16A34A',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    backgroundColor: '#94A3B8',
    borderRadius: 12,
  },
  toggleThumbActive: {
    backgroundColor: '#FFF',
    transform: [{ translateX: 22 }],
  },
  inputContainer: {
    marginBottom: SPACING.xl,
  },
  codeInputBox: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  placeholderText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: '#64748B',
  },
  codeText: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: '#F8FAFC',
    letterSpacing: 4,
  },
  numpad: {
    marginBottom: SPACING.xl,
  },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  numpadKey: {
    width: '22%',
    aspectRatio: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  numpadKeyDark: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
  },
  numpadText: {
    fontFamily: FONTS.medium,
    fontSize: 24,
    color: '#F8FAFC',
  },
  numpadTextDark: {
    color: '#94A3B8',
  },
  actionButtonWrapper: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
    marginTop: SPACING.md,
  },
  actionButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFF',
    letterSpacing: 1,
  },
  // New Styles
  matchmakingInfo: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  matchTitle: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: '#F8FAFC',
    marginTop: SPACING.lg,
    letterSpacing: 1,
  },
  matchDesc: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  statItem: {
    alignItems: 'center',
  },
  statVal: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FACC15',
  },
  statLabel: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: '#64748B',
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    mx: SPACING.lg,
    marginHorizontal: SPACING.lg,
  },
  browserContainer: {
    gap: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#F8FAFC',
    marginLeft: 8,
  },
  goBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  goText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
  },
  roomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  roomCardLeft: {
    flex: 1,
  },
  roomCode: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#F8FAFC',
    letterSpacing: 1,
  },
  roomHost: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  roomCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  capacityBar: {
    width: 60,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    backgroundColor: '#FACC15',
  },
  playerCount: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#F8FAFC',
    minWidth: 35,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#64748B',
    marginTop: 12,
  },
  createLink: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FACC15',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});
