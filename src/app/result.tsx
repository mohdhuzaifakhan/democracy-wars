import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

export default function ResultScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/lobby')} style={styles.backButton}>
          <MaterialCommunityIcons name="close" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CAMPAIGN DECLARED</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainCard}>
          <ImageBackground 
            source={require('../../assets/images/victory.png')} 
            style={styles.victoryImg}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient 
              colors={['transparent', 'rgba(6, 9, 19, 0.5)', 'rgba(6, 9, 19, 0.95)']} 
              style={styles.victoryGradient}
            >
              <Text style={styles.victoryTitle}>LANDSLIDE VICTORY!</Text>
              <Text style={styles.victorySubtitle}>YOU SOVEREIGNLY WON THE CAMPAIGN ELECTION</Text>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>SEATS CONQUERED</Text>
              <Text style={styles.statValue}>285 <Text style={styles.statSmall}>/ 543</Text></Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
              <Text style={styles.statLabel}>VOTE RATIO</Text>
              <Text style={[styles.statValue, { color: COLORS.success }]}>42.6%</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>FINAL APPROVAL</Text>
              <Text style={[styles.statValue, { color: COLORS.primary }]}>48%</Text>
            </View>
          </View>

          <View style={styles.badgeRow}>
             <View style={styles.miniBadge}>
               <MaterialCommunityIcons name="star-decagram" size={16} color={COLORS.primary} />
             </View>
             <View style={styles.miniBadge}>
               <MaterialCommunityIcons name="medal-outline" size={16} color={COLORS.secondary} />
             </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.detailsBtn} activeOpacity={0.8} onPress={() => router.replace('/(tabs)/lobby')}>
              <Text style={styles.detailsText}>LOBBY WAR ROOM</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.playAgainBtn}
              activeOpacity={0.8}
              onPress={() => router.push('/rewards')}
            >
              <LinearGradient colors={['#E11D48', '#881337']} style={styles.playGradient}>
                <Text style={styles.playText}>CLAIM REWARDS</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
    letterSpacing: 1.5,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  mainCard: {
    flex: 1,
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    overflow: 'hidden',
    padding: 16,
  },
  victoryImg: {
    height: 280,
    width: '100%',
    justifyContent: 'flex-end',
  },
  victoryGradient: {
    padding: 16,
    alignItems: 'center',
  },
  victoryTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: COLORS.primary,
    letterSpacing: 2,
  },
  victorySubtitle: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: '#FFF',
    letterSpacing: 1,
    marginTop: 4,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  statLabel: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  statSmall: {
    fontSize: 10,
    color: COLORS.textMuted,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginVertical: 16,
  },
  miniBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 'auto',
  },
  detailsBtn: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
  },
  detailsText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  playAgainBtn: {
    flex: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  playGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
    letterSpacing: 1.5,
  },
});
