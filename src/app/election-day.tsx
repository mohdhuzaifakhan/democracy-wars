import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

import { useGameStore } from '../store/gameStore';

export default function ElectionDayScreen() {
  const router = useRouter();
  const { calculateWinner } = useGameStore();
  const results = calculateWinner();

  const DISPLAY_RESULTS = [
    { id: '1', name: 'YOUR COALITION', seats: results.playerVotes / 100, color: COLORS.secondary },
    { id: '2', name: 'OPPOSITION BLOC', seats: results.opponentVotes / 100, color: COLORS.danger },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ELECTION DISPATCH</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainCard}>
          <View style={styles.countingHeader}>
            <Text style={styles.electionDayTitle}>LIVE POLL COUNTING</Text>
            <Text style={styles.countingText}>REAL-TIME REGIONAL FEED</Text>
          </View>

          <View style={styles.mapResultRow}>
            {/* Map Area */}
            <View style={styles.mapContainer}>
              <Image 
                source={require('../../assets/images/india_map.png')}
                style={styles.mapImg}
                contentFit="contain"
              />
            </View>

            {/* Seats Sidebar */}
            <View style={styles.sidebar}>
              <View style={styles.sidebarHeader}>
                <Text style={styles.sidebarTitle}>EST. SEATS</Text>
              </View>
              {DISPLAY_RESULTS.map((item) => (
                <View key={item.id} style={styles.seatRow}>
                  <View style={styles.seatLeft}>
                    <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                    <Text style={styles.nameText}>{item.name}</Text>
                  </View>
                  <Text style={[styles.seatValue, { color: item.color }]}>{Math.floor(item.seats)}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.liveResultsBox}>
            <Text style={styles.liveResultsTitle}>VICTORY PROJECTIONS</Text>
            <Text style={styles.totalSeats}>{results.winner === 'Player' ? 'YOU LEADING THE POLLS' : 'OPPOSITION BLOC IN THE LEAD'}</Text>
            
            <View style={styles.progressBarWrapper}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${(results.playerVotes / (results.playerVotes + results.opponentVotes)) * 100}%`,
                    backgroundColor: results.winner === 'Player' ? COLORS.secondary : COLORS.danger
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.finishButton} 
          activeOpacity={0.8}
          onPress={() => router.push('/coalition')}
        >
          <LinearGradient colors={['#E11D48', '#881337']} style={styles.finishGradient}>
            <Text style={styles.finishText}>FORM COALITION FORCES</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    padding: 16,
    marginBottom: 16,
  },
  countingHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  electionDayTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  countingText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  mapResultRow: {
    flexDirection: 'row',
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImg: {
    width: '100%',
    height: '100%',
    opacity: 0.75,
  },
  sidebar: {
    width: 110,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    height: 220,
    alignSelf: 'center',
  },
  sidebarHeader: {
    borderBottomWidth: 1,
    borderColor: COLORS.surfaceBorder,
    paddingBottom: 6,
    marginBottom: 8,
  },
  sidebarTitle: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  seatLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  colorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  nameText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: '#CBD5E1',
    letterSpacing: 0.5,
  },
  seatValue: {
    fontFamily: FONTS.bold,
    fontSize: 10,
  },
  liveResultsBox: {
    marginTop: 16,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  liveResultsTitle: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
    letterSpacing: 1,
  },
  totalSeats: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.textMuted,
    marginVertical: 6,
  },
  progressBarWrapper: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  finishButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  finishGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 1.5,
  },
});
