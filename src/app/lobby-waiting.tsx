import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const PLAYERS = [
  { id: '1', name: 'Arjun Verma', isHost: true, status: 'Ready', avatar: 'https://ui-avatars.com/api/?name=Arjun+Verma&background=D97706&color=fff' },
  { id: '2', name: 'Rohan Mehta', isHost: false, status: 'Ready', avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=3B82F6&color=fff' },
  { id: '3', name: 'Kavya Iyer', isHost: false, status: 'Ready', avatar: 'https://ui-avatars.com/api/?name=Kavya+Iyer&background=10B981&color=fff' },
  { id: '4', name: 'Aditya Singh', isHost: false, status: 'Ready', avatar: 'https://ui-avatars.com/api/?name=Aditya+Singh&background=8B5CF6&color=fff' },
  { id: '5', name: 'Neha Patil', isHost: false, status: 'Ready', avatar: 'https://ui-avatars.com/api/?name=Neha+Patil&background=F43F5E&color=fff' },
  { id: '6', name: 'Vivek Rao', isHost: false, status: 'Ready', avatar: 'https://ui-avatars.com/api/?name=Vivek+Rao&background=64748B&color=fff' },
];

import { useGameStore } from '../store/gameStore';

export default function LobbyWaitingScreen() {
  const router = useRouter();
  const { roomCode, playersList, isHost } = useGameStore();
  const [chatMessage, setChatMessage] = useState('');

  const slots = Array(6).fill(null).map((_, i) => playersList[i] || null);

  const renderSlot = (player: any, index: number) => (
    <View key={index} style={[styles.slotCard, player ? styles.slotOccupied : styles.slotEmpty]}>
      {player ? (
        <>
          <View style={styles.slotAvatarContainer}>
            <Image
              source={{ uri: player.avatar || `https://ui-avatars.com/api/?name=${player.name}&background=random&color=fff` }}
              style={styles.slotAvatar}
            />
            {player.isHost && (
              <View style={styles.hostBadgeIcon}>
                <MaterialCommunityIcons name="crown" size={12} color="#000" />
              </View>
            )}
          </View>
          <Text style={styles.slotName} numberOfLines={1}>{player.name}</Text>
          <View style={styles.readyIndicator}>
            <View style={[styles.readyDot, { backgroundColor: '#22C55E' }]} />
            <Text style={styles.readyText}>READY</Text>
          </View>
        </>
      ) : (
        <>
          <MaterialCommunityIcons name="account-plus-outline" size={24} color="#334155" />
          <Text style={styles.emptySlotText}>WAITING...</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>WAR ROOM: {roomCode}</Text>
          <View style={styles.statusBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.statusBadgeText}>LIVE LOBBY</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsBtn}>
          <MaterialCommunityIcons name="cog-outline" size={24} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.slotGrid}>
          {slots.map((player, idx) => renderSlot(player, idx))}
        </View>

        <View style={styles.factionBalanceSection}>
          <Text style={styles.sectionTitle}>PARTY BALANCE</Text>
          <View style={styles.balanceBarContainer}>
            <View style={[styles.balancePart, { width: '40%', backgroundColor: '#3B82F6' }]} />
            <View style={[styles.balancePart, { width: '30%', backgroundColor: '#EF4444' }]} />
            <View style={[styles.balancePart, { width: '30%', backgroundColor: '#10B981' }]} />
          </View>
          <View style={styles.balanceLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={styles.legendText}>LIBERAL (2)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
              <Text style={styles.legendText}>CONSERVATIVE (1)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>NEUTRAL (1)</Text>
            </View>
          </View>
        </View>

        <View style={styles.chatSection}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>STRATEGY CHAT</Text>
            <Text style={styles.onlineCount}>4 online</Text>
          </View>
          <View style={styles.chatInputWrapper}>
            <TextInput
              style={styles.chatInput}
              placeholder="Coordinate your alliance..."
              placeholderTextColor="#64748B"
              value={chatMessage}
              onChangeText={setChatMessage}
            />
            <TouchableOpacity style={styles.sendButton}>
              <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.sendBtnGradient}>
                <MaterialCommunityIcons name="send" size={18} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {!isHost && (
          <View style={styles.waitingNotice}>
            <Text style={styles.waitingNoticeText}>Waiting for Host to initiate the campaign...</Text>
          </View>
        )}

        {isHost && (
          <TouchableOpacity
            style={styles.actionButtonWrapper}
            activeOpacity={0.8}
            onPress={() => router.push('/candidate-selection')}
            disabled={playersList.length < 2}
          >
            <LinearGradient
              colors={playersList.length < 2 ? ['#334155', '#1E293B'] : ['#B91C1C', '#7F1D1D']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.actionButton}
            >
              <Text style={styles.actionButtonText}>
                {playersList.length < 2 ? 'WAITING FOR PLAYERS' : 'COMMENCE CAMPAIGN'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  mainPanel: {
    flex: 1,
    marginHorizontal: SPACING.lg,
    marginBottom: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 32,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  playerList: {
    paddingBottom: SPACING.md,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  nameContainer: {
    marginLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerName: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#F8FAFC',
  },
  hostBadge: {
    marginLeft: 8,
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: '#22C55E',
  },
  statusText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#22C55E',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  chatContainer: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  chatInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  chatIcon: {
    marginRight: 8,
  },
  chatInput: {
    flex: 1,
    fontFamily: FONTS.regular,
    fontSize: 14,
    color: '#F8FAFC',
  },
  sendButton: {
    padding: 4,
  },
  footerInfo: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: SPACING.md,
  },
  actionButtonWrapper: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
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
    letterSpacing: 2,
  },
  // New Styles
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },
  statusBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#22C55E',
    letterSpacing: 1,
  },
  settingsBtn: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 150,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: SPACING.xl,
  },
  slotCard: {
    width: '31%',
    aspectRatio: 0.85,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    padding: 8,
  },
  slotEmpty: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderColor: 'rgba(255,255,255,0.05)',
    borderStyle: 'dashed',
  },
  slotOccupied: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  slotAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  slotAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  hostBadgeIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FACC15',
    borderRadius: 8,
    padding: 2,
  },
  slotName: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#F8FAFC',
    textAlign: 'center',
  },
  emptySlotText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: '#334155',
    marginTop: 4,
  },
  readyIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  readyDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 4,
  },
  readyText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: '#22C55E',
  },
  factionBalanceSection: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  balanceBarContainer: {
    height: 12,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  balancePart: {
    height: '100%',
  },
  balanceLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#64748B',
  },
  chatSection: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chatTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1.5,
  },
  onlineCount: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: '#22C55E',
  },
  sendBtnGradient: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: SPACING.lg,
    paddingBottom: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
  },
  waitingNotice: {
    alignItems: 'center',
    marginBottom: 12,
  },
  waitingNoticeText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
});
