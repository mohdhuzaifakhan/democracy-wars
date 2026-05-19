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
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/lobby')} style={styles.backButton}>
          <MaterialCommunityIcons name="close" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RESULTS SCREEN</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainCard}>
          <ImageBackground 
            source={require('../../assets/images/victory.png')} 
            style={styles.victoryImg}
            imageStyle={{ borderRadius: 20 }}
          >
            <LinearGradient 
              colors={['transparent', 'rgba(15, 23, 42, 0.4)', 'rgba(15, 23, 42, 0.9)']} 
              style={styles.victoryGradient}
            >
              <Text style={styles.victoryTitle}>VICTORY!</Text>
              <Text style={styles.victorySubtitle}>YOU WON THE ELECTION</Text>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>SEATS WON</Text>
              <Text style={styles.statValue}>285 <Text style={styles.statSmall}>/ 543</Text></Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
              <Text style={styles.statLabel}>VOTE SHARE</Text>
              <Text style={styles.statValue}>42.6%</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>FINAL APPROVAL</Text>
              <Text style={styles.statValue}>48%</Text>
            </View>
          </View>

          <View style={styles.badgeRow}>
             {/* Mock small badges or icons */}
             <View style={styles.miniBadge} />
             <View style={styles.miniBadge} />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.detailsBtn}>
              <Text style={styles.detailsText}>VIEW DETAILS</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.playAgainBtn}
              onPress={() => router.push('/rewards')}
            >
              <LinearGradient colors={['#D97706', '#92400E']} style={styles.playGradient}>
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
  content: {
    flex: 1,
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  mainCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
    padding: 16,
  },
  victoryImg: {
    height: 350,
    width: '100%',
    justifyContent: 'flex-end',
  },
  victoryGradient: {
    padding: 20,
    alignItems: 'center',
  },
  victoryTitle: {
    fontFamily: FONTS.bold,
    fontSize: 36,
    color: '#FACC15',
    letterSpacing: 3,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  victorySubtitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#F8FAFC',
    letterSpacing: 1,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statLabel: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#F8FAFC',
  },
  statSmall: {
    fontSize: 12,
    color: '#94A3B8',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 20,
  },
  miniBadge: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 'auto',
  },
  detailsBtn: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  detailsText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#F8FAFC',
  },
  playAgainBtn: {
    flex: 1.5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  playGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 1,
  },
});
