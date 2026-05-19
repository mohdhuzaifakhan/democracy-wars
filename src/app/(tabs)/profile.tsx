import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';
import { useGameStore } from '../../store/gameStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const profile = useGameStore((state) => state.profile);

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ADVOCATE DOSSIER</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileMain}>
            <View style={styles.avatarWrapper}>
              <Image 
                source={{ uri: profile.avatar }} 
                style={styles.avatar} 
              />
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{profile.level}</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{profile.name.toUpperCase()}</Text>
              <Text style={styles.title}>{profile.rankTitle.toUpperCase()}</Text>
              <View style={styles.xpRow}>
                <Text style={styles.xpLabel}>DOSSIER LEVEL PROGRESS</Text>
                <View style={styles.xpBarBg}>
                  <View style={[styles.xpBarFill, { width: `${(profile.xp / profile.maxXp) * 100}%` }]} />
                </View>
                <Text style={styles.xpValue}>{profile.xp.toLocaleString()} / {profile.maxXp.toLocaleString()} XP</Text>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>CAMPAIGNS DEPLOYED</Text>
              <Text style={styles.statValue}>48</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statLabel}>WIN RATIO</Text>
              <Text style={[styles.statValue, { color: COLORS.success }]}>62%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>ELECTIONS CONQUERED</Text>
              <Text style={styles.statValue}>12</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statLabel}>GLOBAL STANDING</Text>
              <Text style={[styles.statValue, { color: COLORS.primary }]}>#1</Text>
            </View>
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.badgesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACQUIRED DECORATIONS</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.viewAllText}>DOSSIERS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
               <MaterialCommunityIcons name="shield-star" size={28} color={COLORS.primary} />
               <Text style={styles.badgeName}>CLEAN NETA</Text>
            </View>
            <View style={styles.badgeItem}>
               <MaterialCommunityIcons name="crown" size={28} color="#D97706" />
               <Text style={styles.badgeName}>KINGMAKER</Text>
            </View>
            <View style={styles.badgeItem}>
               <MaterialCommunityIcons name="account-group" size={28} color={COLORS.danger} />
               <Text style={styles.badgeName}>POPULIST</Text>
            </View>
            <View style={styles.badgeItem}>
               <MaterialCommunityIcons name="microphone-variant" size={28} color={COLORS.secondary} />
               <Text style={styles.badgeName}>ORATOR</Text>
            </View>
          </View>
        </View>

        {/* Events Section Moved from Nav Bar */}
        <TouchableOpacity 
          style={styles.eventsCard}
          activeOpacity={0.8}
          onPress={() => router.push('/events')}
        >
          <LinearGradient 
            colors={['#1E3A8A', '#0F172A']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 0 }} 
            style={styles.eventsGradient}
          >
            <View style={styles.eventsLeft}>
              <MaterialCommunityIcons name="shield-star" size={28} color={COLORS.primary} />
              <View style={styles.eventsInfo}>
                <Text style={styles.eventsTitle}>ACTIVE CAMPAIGN DISPATCHES</Text>
                <Text style={styles.eventsSubtitle}>Deploy now for special season awards</Text>
              </View>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 1.5,
  },
  profileCard: {
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    marginHorizontal: SPACING.md,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  profileMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 42,
    padding: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0E1726',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.primary,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#FFF',
    letterSpacing: 1,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  xpRow: {
    marginTop: 10,
  },
  xpLabel: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  xpBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 2,
    marginBottom: 4,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  xpValue: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingTop: 20,
  },
  statItem: {
    width: '50%',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  statBorder: {
    borderLeftWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  statLabel: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  statValue: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#F8FAFC',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  badgesSection: {
    marginTop: 20,
    paddingHorizontal: SPACING.md,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  viewAllText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  badgeItem: {
    alignItems: 'center',
    width: '25%',
  },
  badgeName: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: '#CBD5E1',
    marginTop: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  eventsCard: {
    marginHorizontal: SPACING.md,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  eventsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  eventsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsInfo: {
    marginLeft: 12,
  },
  eventsTitle: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 1,
  },
  eventsSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
