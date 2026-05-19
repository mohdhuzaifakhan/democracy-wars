import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const REWARDS = [
  { id: '1', title: 'XP Points', value: '+250', icon: 'star-circle', color: '#8B5CF6' },
  { id: '2', title: 'Game Coins', value: '+500', icon: 'gold', color: '#FACC15' },
  { id: '3', title: 'PM Trophy', value: '+1', icon: 'trophy', color: '#D97706' },
  { id: '4', title: 'Clean Neta Badge', value: '+1', icon: 'shield-check', color: '#3B82F6' },
];

export default function RewardsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <View style={{ width: 32 }} />
        <Text style={styles.headerTitle}>REWARDS SCREEN</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.intro}>
            <Text style={styles.congrats}>CONGRATULATIONS!</Text>
            <Text style={styles.subtitle}>Here are your rewards</Text>
          </View>

          <View style={styles.rewardList}>
            {REWARDS.map((item) => (
              <View key={item.id} style={styles.rewardItem}>
                <View style={styles.rewardLeft}>
                  <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                  </View>
                  <Text style={styles.rewardTitle}>{item.title}</Text>
                </View>
                <Text style={styles.rewardValue}>{item.value}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.claimButton}
            onPress={() => router.replace('/(tabs)/lobby')}
          >
            <LinearGradient colors={['#D97706', '#92400E']} style={styles.claimGradient}>
              <Text style={styles.claimText}>CLAIM REWARDS</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 24,
  },
  intro: {
    alignItems: 'center',
    marginBottom: 32,
  },
  congrats: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: '#FACC15',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  rewardList: {
    gap: 16,
    marginBottom: 32,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rewardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#F8FAFC',
  },
  rewardValue: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFF',
  },
  claimButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  claimGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFF',
    letterSpacing: 1,
  },
});
