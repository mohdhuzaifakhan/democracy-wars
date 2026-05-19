import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';
import { LEADERBOARD_DATA, USER_PROFILE } from '../constants/dummyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function LeaderboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'GLOBAL' | 'FRIENDS'>('GLOBAL');

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#0A0A10']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LEADERBOARD</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'GLOBAL' && styles.activeTab]}
          onPress={() => setActiveTab('GLOBAL')}
        >
          <Text style={[styles.tabText, activeTab === 'GLOBAL' && styles.activeTabText]}>GLOBAL</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'FRIENDS' && styles.activeTab]}
          onPress={() => setActiveTab('FRIENDS')}
        >
          <Text style={[styles.tabText, activeTab === 'FRIENDS' && styles.activeTabText]}>FRIENDS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { width: 40, textAlign: 'center' }]}>RANK</Text>
        <Text style={[styles.tableHeaderText, { flex: 1, paddingLeft: SPACING.md }]}>PLAYER</Text>
        <Text style={[styles.tableHeaderText, { width: 60, textAlign: 'right' }]}>WINS</Text>
        <Text style={[styles.tableHeaderText, { width: 60, textAlign: 'right' }]}>WIN %</Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {LEADERBOARD_DATA.map((player, index) => (
          <View key={index} style={[styles.playerRow, player.isUser && styles.currentUserRow]}>
            <View style={{ width: 40, alignItems: 'center' }}>
              {player.rank <= 3 ? (
                <MaterialCommunityIcons 
                  name="crown" 
                  size={24} 
                  color={player.rank === 1 ? COLORS.primary : player.rank === 2 ? '#C0C0C0' : '#CD7F32'} 
                />
              ) : (
                <Text style={styles.rankText}>{player.rank}</Text>
              )}
            </View>
            
            <View style={styles.playerInfo}>
              <Image source={{ uri: player.avatar }} style={styles.avatar} />
              <Text style={styles.playerName}>{player.name}</Text>
            </View>

            <Text style={[styles.statText, { width: 60, textAlign: 'right' }]}>{player.wins}</Text>
            <Text style={[styles.statText, { width: 60, textAlign: 'right' }]}>{player.winPercentage}%</Text>
          </View>
        ))}
      </ScrollView>

      {/* Current User Fixed Footer */}
      <View style={styles.currentUserFooter}>
        <View style={{ width: 40, alignItems: 'center' }}>
          <Text style={styles.rankTextFooter}>{USER_PROFILE.globalRank}</Text>
        </View>
        
        <View style={styles.playerInfo}>
          <Image source={{ uri: USER_PROFILE.avatar }} style={styles.avatar} />
          <Text style={styles.playerName}>You</Text>
        </View>

        <Text style={[styles.statText, { width: 60, textAlign: 'right' }]}>{USER_PROFILE.wins}</Text>
        <Text style={[styles.statText, { width: 60, textAlign: 'right' }]}>{USER_PROFILE.winPercentage}%</Text>
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
    paddingHorizontal: SPACING.md,
    paddingTop: 60,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
    letterSpacing: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 4,
    marginBottom: SPACING.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: COLORS.danger, // Using red to match UI image
  },
  tabText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  activeTabText: {
    color: '#FFF',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  tableHeaderText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 100,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  currentUserRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
  rankText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: SPACING.md,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  playerName: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.text,
  },
  statText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  currentUserFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: '#3F1212', // Darker red from image
    borderTopWidth: 1,
    borderTopColor: COLORS.danger,
    paddingBottom: 40,
  },
  rankTextFooter: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFF',
  },
});
