import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { useGameStore } from '../../store/gameStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const profile = useGameStore((state) => state.profile);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>PROFILE</Text>
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
              <Text style={styles.name}>{profile.name}</Text>
              <Text style={styles.title}>{profile.rankTitle}</Text>
              <View style={styles.xpRow}>
                <Text style={styles.xpLabel}>XP</Text>
                <View style={styles.xpBarBg}>
                  <View style={[styles.xpBarFill, { width: `${(profile.xp / profile.maxXp) * 100}%` }]} />
                </View>
                <Text style={styles.xpValue}>{profile.xp.toLocaleString()} / {profile.maxXp.toLocaleString()}</Text>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Games Played</Text>
              <Text style={styles.statValue}>48</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statLabel}>Win Rate</Text>
              <Text style={styles.statValue}>62%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Elections Won</Text>
              <Text style={styles.statValue}>12</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statLabel}>Best Rank</Text>
              <Text style={styles.statValue}>1</Text>
            </View>
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.badgesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>BADGES</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.badgeRow}>
            <View style={styles.badgeItem}>
               <MaterialCommunityIcons name="shield-star" size={32} color="#FACC15" />
               <Text style={styles.badgeName}>Clean Neta</Text>
            </View>
            <View style={styles.badgeItem}>
               <MaterialCommunityIcons name="crown" size={32} color="#D97706" />
               <Text style={styles.badgeName}>Kingmaker</Text>
            </View>
            <View style={styles.badgeItem}>
               <MaterialCommunityIcons name="account-group" size={32} color="#EF4444" />
               <Text style={styles.badgeName}>People's Choice</Text>
            </View>
            <View style={styles.badgeItem}>
               <MaterialCommunityIcons name="microphone-variant" size={32} color="#3B82F6" />
               <Text style={styles.badgeName}>Debate Master</Text>
            </View>
          </View>
        </View>

        {/* Events Section Moved from Nav Bar */}
        <TouchableOpacity 
          style={styles.eventsCard}
          onPress={() => router.push('/events')}
        >
          <LinearGradient 
            colors={['#1E40AF', '#1E3A8A']} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 0 }} 
            style={styles.eventsGradient}
          >
            <View style={styles.eventsLeft}>
              <MaterialCommunityIcons name="shield-star" size={32} color="#FACC15" />
              <View style={styles.eventsInfo}>
                <Text style={styles.eventsTitle}>UPCOMING EVENTS</Text>
                <Text style={styles.eventsSubtitle}>Join live rallies & debates</Text>
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
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 1,
  },
  profileCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    marginHorizontal: SPACING.lg,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  profileMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#D97706',
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#334155',
    borderWidth: 2,
    borderColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: '#F8FAFC',
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 2,
  },
  xpRow: {
    marginTop: 12,
  },
  xpLabel: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FACC15',
    marginBottom: 4,
  },
  xpBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 4,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#FACC15',
    borderRadius: 3,
  },
  xpValue: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: '#94A3B8',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 20,
  },
  statItem: {
    width: '50%',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  statBorder: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.05)',
  },
  statLabel: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
  },
  statValue: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#F8FAFC',
    marginTop: 4,
  },
  badgesSection: {
    marginTop: 32,
    paddingHorizontal: SPACING.lg,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#94A3B8',
    letterSpacing: 1,
  },
  viewAllText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#3B82F6',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  badgeItem: {
    alignItems: 'center',
    width: '25%',
  },
  badgeName: {
    fontFamily: FONTS.medium,
    fontSize: 8,
    color: '#CBD5E1',
    marginTop: 8,
    textAlign: 'center',
  },
  eventsCard: {
    marginHorizontal: SPACING.lg,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  eventsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  eventsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsInfo: {
    marginLeft: 16,
  },
  eventsTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 1,
  },
  eventsSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
});
