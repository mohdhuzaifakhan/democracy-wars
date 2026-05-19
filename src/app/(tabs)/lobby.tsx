import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';
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
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

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
              {tab === 'quick' ? 'TACTICAL MATCH' : (tab === 'browser' ? 'ROOM FINDER' : 'HOST CAMPAIGN')}
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
          {/* Radar Ring Visuals */}
          <View style={[styles.radarOuterCircle, isSearching && styles.radarOuterSearching]}>
            <View style={[styles.radarInnerCircle, isSearching && styles.radarInnerSearching]}>
              <MaterialCommunityIcons 
                name="radar" 
                size={54} 
                color={isSearching ? COLORS.primary : COLORS.textMuted} 
                style={isSearching ? { textShadowColor: COLORS.primary, textShadowRadius: 10 } : null}
              />
            </View>
          </View>
          <Text style={styles.matchTitle}>{isSearching ? "SCANNING SPECTRUMS..." : "READY TO ENGAGE?"}</Text>
          <Text style={styles.matchDesc}>
            {isSearching
              ? "Connecting with high-level strategists across secure servers..."
              : "Jump into an immediate 1v1 battleground with players of equal ELO rank."}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.actionButtonWrapper}
          activeOpacity={0.8}
          onPress={handleQuickMatch}
        >
          <LinearGradient 
            colors={isSearching ? ['#334155', '#1E293B'] : ['#E11D48', '#9F1239']} 
            style={styles.actionButton}
          >
            <Text style={styles.actionButtonText}>
              {isSearching ? "ABORT SEARCH" : "INITIATE MATCHMAKING"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>3.4k</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>30s</Text>
            <Text style={styles.statLabel}>Est Time</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>18ms</Text>
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
          <MaterialCommunityIcons name="magnify" size={20} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Room Code or Host Advocate..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={roomCodeInput}
            onChangeText={setRoomCodeInput}
          />
          {roomCodeInput.length > 0 && (
            <TouchableOpacity onPress={handleJoinByCode} style={styles.goBtn} activeOpacity={0.8}>
              <Text style={styles.goText}>ENTER</Text>
            </TouchableOpacity>
          )}
        </View>

        {publicRooms.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="server-off" size={48} color={COLORS.surfaceBorder} />
            <Text style={styles.emptyText}>No active campaigns hosted.</Text>
            <TouchableOpacity onPress={handleCreate} activeOpacity={0.7}>
              <Text style={styles.createLink}>Create a custom campaign now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          publicRooms.map((room, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.roomCard}
              activeOpacity={0.8}
              onPress={() => joinRoom(room.code).then(() => router.push('/lobby-waiting'))}
            >
              <View style={styles.roomCardLeft}>
                <View style={styles.codeBadge}>
                  <Text style={styles.roomCode}>{room.code}</Text>
                </View>
                <Text style={styles.roomHost}>Host: {room.players[room.hostId]?.name || 'Advocate Leader'}</Text>
              </View>
              <View style={styles.roomCardRight}>
                <View style={styles.capacityBar}>
                  <View style={[styles.capacityFill, { width: `${(Object.keys(room.players).length / 6) * 100}%` }]} />
                </View>
                <Text style={styles.playerCount}>{Object.keys(room.players).length}/6</Text>
                <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.primary} />
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
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Strategic Map</Text>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.8}>
            <Text style={styles.dropdownText}>{map}</Text>
            <MaterialCommunityIcons name="map-marker-radius" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Advocate Cap</Text>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.8}>
            <Text style={styles.dropdownText}>{players}</Text>
            <MaterialCommunityIcons name="account-group" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Difficulty Matrix</Text>
          <TouchableOpacity style={styles.dropdown} activeOpacity={0.8}>
            <Text style={styles.dropdownText}>{difficulty}</Text>
            <MaterialCommunityIcons name="sword" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Fill Empty with AI bots</Text>
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
            <Text style={styles.actionButtonText}>LAUNCH DEPLOYMENT ROOM</Text>
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
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 1.5,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.md,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    borderRadius: 12,
    padding: 4,
    marginVertical: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(31, 41, 55, 0.7)',
  },
  tabText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  content: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 40,
  },
  panel: {
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 20,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingLabel: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#CBD5E1',
    letterSpacing: 0.5,
  },
  dropdown: {
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    minWidth: 150,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#F8FAFC',
  },
  toggle: {
    width: 48,
    height: 26,
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    borderRadius: 13,
    padding: 2,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  toggleActive: {
    backgroundColor: COLORS.success,
  },
  toggleThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#94A3B8',
    borderRadius: 10,
  },
  toggleThumbActive: {
    backgroundColor: '#FFF',
    transform: [{ translateX: 22 }],
  },
  actionButtonWrapper: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 10,
  },
  actionButton: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 1.5,
  },
  matchmakingInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  radarOuterCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarOuterSearching: {
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  radarInnerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarInnerSearching: {
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
  matchTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: '#F8FAFC',
    marginTop: 20,
    letterSpacing: 1.5,
  },
  matchDesc: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    paddingHorizontal: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  statItem: {
    alignItems: 'center',
  },
  statVal: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
  },
  statLabel: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: SPACING.lg,
  },
  browserContainer: {
    gap: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#F8FAFC',
    marginLeft: 8,
  },
  goBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  goText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  roomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  roomCardLeft: {
    flex: 1,
  },
  codeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roomCode: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
    letterSpacing: 1,
  },
  roomHost: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 6,
  },
  roomCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  capacityBar: {
    width: 60,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  playerCount: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#F8FAFC',
    minWidth: 30,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 12,
  },
  createLink: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 6,
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
});
