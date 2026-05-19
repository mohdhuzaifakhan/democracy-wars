import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const REWARDS = [
  { id: '1', title: 'TACTICAL EXPERIENCE POINTS', value: '+250 XP', icon: 'star-circle', color: COLORS.primary },
  { id: '2', title: 'GOLD CAMPAIGN FUNDING COINS', value: '+500', icon: 'gold', color: COLORS.success },
  { id: '3', title: 'MINISTERIAL TRIUMPH TROPHY', value: '+1', icon: 'trophy', color: COLORS.secondary },
  { id: '4', title: 'CLEAN ADVOCATE LEADER BADGE', value: '+1', icon: 'shield-check', color: '#3B82F6' },
];

export default function RewardsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <View style={{ width: 32 }} />
        <Text style={styles.headerTitle}>TREASURY ACQUIRED</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.intro}>
            <Text style={styles.congrats}>CAMPAIGN TRIUMPH!</Text>
            <Text style={styles.subtitle}>Allocating war room credentials to your sovereign dossier.</Text>
          </View>

          <View style={styles.rewardList}>
            {REWARDS.map((item) => (
              <View key={item.id} style={styles.rewardItem}>
                <View style={styles.rewardLeft}>
                  <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={styles.rewardTitle}>{item.title}</Text>
                </View>
                <Text style={[styles.rewardValue, { color: item.color }]}>{item.value}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.claimButton}
            activeOpacity={0.8}
            onPress={() => router.replace('/(tabs)/lobby')}
          >
            <LinearGradient colors={['#E11D48', '#881337']} style={styles.claimGradient}>
              <Text style={styles.claimText}>SECURE CREDENTIALS</Text>
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
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
    letterSpacing: 1.5,
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    padding: 20,
  },
  intro: {
    alignItems: 'center',
    marginBottom: 24,
  },
  congrats: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  rewardList: {
    gap: 10,
    marginBottom: 24,
  },
  rewardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  rewardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rewardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: '#CBD5E1',
    letterSpacing: 0.5,
  },
  rewardValue: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  claimButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  claimGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#FFF',
    letterSpacing: 1.5,
  },
});
