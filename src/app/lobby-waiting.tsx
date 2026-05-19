import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';
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
              style={[styles.slotAvatar, { borderColor: index % 2 === 0 ? COLORS.secondary : COLORS.danger }]}
            />
            {player.isHost && (
              <View style={styles.hostBadgeIcon}>
                <MaterialCommunityIcons name="crown" size={10} color="#000" />
              </View>
            )}
          </View>
          <Text style={styles.slotName} numberOfLines={1}>{player.name.toUpperCase()}</Text>
          <View style={styles.readyIndicator}>
            <View style={[styles.readyDot, { backgroundColor: COLORS.success }]} />
            <Text style={styles.readyText}>READY</Text>
          </View>
        </>
      ) : (
        <>
          <MaterialCommunityIcons name="account-plus-outline" size={20} color="rgba(255,255,255,0.15)" />
          <Text style={styles.emptySlotText}>VACANT SLOT</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>WAR ROOM: {roomCode}</Text>
          <View style={styles.statusBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.statusBadgeText}>SECURE CAMPAIGN LOBBY</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7}>
          <MaterialCommunityIcons name="cog-outline" size={24} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.slotGrid}>
          {slots.map((player, idx) => renderSlot(player, idx))}
        </View>

        <View style={styles.factionBalanceSection}>
          <Text style={styles.sectionTitle}>TACTICAL FACTION BALANCE</Text>
          <View style={styles.balanceBarContainer}>
            <View style={[styles.balancePart, { width: '40%', backgroundColor: COLORS.secondary }]} />
            <View style={[styles.balancePart, { width: '30%', backgroundColor: COLORS.danger }]} />
            <View style={[styles.balancePart, { width: '30%', backgroundColor: COLORS.success }]} />
          </View>
          <View style={styles.balanceLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.secondary }]} />
              <Text style={styles.legendText}>NAV VIKAS (2)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.danger }]} />
              <Text style={styles.legendText}>JAN SHAKTI (1)</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
              <Text style={styles.legendText}>AAM JAN MORCHA (1)</Text>
            </View>
          </View>
        </View>

        <View style={styles.chatSection}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>STRATEGY TELEMETRY CHAT</Text>
            <Text style={styles.onlineCount}>{playersList.length} Advocates Connected</Text>
          </View>
          
          <ScrollView style={styles.miniChatLog} contentContainerStyle={{ gap: 8 }}>
            <Text style={styles.systemChatMsg}>[SYSTEM] Secured encryption tunnel established successfully.</Text>
            {playersList.map((p, idx) => (
              <Text key={idx} style={styles.userChatMsg}>
                <Text style={styles.chatName}>{p.name}: </Text>
                <Text style={styles.chatBody}>Advocates ready. Faction is loaded and prepared.</Text>
              </Text>
            ))}
          </ScrollView>

          <View style={styles.chatInputWrapper}>
            <TextInput
              style={styles.chatInput}
              placeholder="Broadcast encrypted coordinates..."
              placeholderTextColor="rgba(255,255,255,0.25)"
              value={chatMessage}
              onChangeText={setChatMessage}
            />
            <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
              <LinearGradient colors={['#2563EB', '#1E40AF']} style={styles.sendBtnGradient}>
                <MaterialCommunityIcons name="send" size={16} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {!isHost && (
          <View style={styles.waitingNotice}>
            <Text style={styles.waitingNoticeText}>Awaiting chief host to initiate tactical campaign deployment...</Text>
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
              colors={playersList.length < 2 ? ['#1E293B', '#0F172A'] : ['#E11D48', '#881337']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={styles.actionButton}
            >
              <Text style={[styles.actionButtonText, playersList.length < 2 && { color: 'rgba(255,255,255,0.25)' }]}>
                {playersList.length < 2 ? 'AWAITING COALITION FORCES' : 'COMMENCE CAMPAIGN'}
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
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
    letterSpacing: 1.5,
  },
  settingsBtn: {
    padding: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },
  statusBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.success,
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: 160,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
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
    backgroundColor: 'rgba(14, 23, 38, 0.4)',
    borderColor: COLORS.surfaceBorder,
    borderStyle: 'dashed',
  },
  slotOccupied: {
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderColor: COLORS.surfaceBorder,
  },
  slotAvatarContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  slotAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
  },
  hostBadgeIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 2,
  },
  slotName: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  emptySlotText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: 'rgba(255,255,255,0.15)',
    marginTop: 4,
    letterSpacing: 0.5,
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
    fontSize: 8,
    color: COLORS.success,
    letterSpacing: 0.5,
  },
  factionBalanceSection: {
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  balanceBarContainer: {
    height: 8,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
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
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  legendText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  chatSection: {
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chatTitle: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  onlineCount: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.success,
  },
  miniChatLog: {
    height: 100,
    backgroundColor: 'rgba(6, 9, 19, 0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    padding: 10,
    marginBottom: 12,
  },
  systemChatMsg: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.success,
    letterSpacing: 0.5,
  },
  userChatMsg: {
    fontFamily: FONTS.medium,
    fontSize: 11,
  },
  chatName: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  chatBody: {
    color: COLORS.text,
  },
  chatInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  chatInput: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#F8FAFC',
  },
  sendButton: {
    padding: 2,
  },
  sendBtnGradient: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: SPACING.md,
    paddingBottom: 40,
    backgroundColor: COLORS.overlay,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  waitingNotice: {
    alignItems: 'center',
    marginBottom: 8,
  },
  waitingNoticeText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  actionButtonWrapper: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
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
});
