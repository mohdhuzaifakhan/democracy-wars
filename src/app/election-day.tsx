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
    { id: '1', name: 'Your Party', seats: results.playerVotes / 100, color: '#EF4444' }, // Scaling for UI display
    { id: '2', name: 'Opposition', seats: results.opponentVotes / 100, color: '#3B82F6' },
  ];

  const totalSeats = Math.floor((results.playerVotes + results.opponentVotes) / 100);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ELECTION DAY</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.mainCard}>
          <View style={styles.countingHeader}>
            <Text style={styles.electionDayTitle}>LIVE RESULTS</Text>
            <Text style={styles.countingText}>Final Vote Counting...</Text>
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
            <Text style={styles.liveResultsTitle}>VICTORY MARGIN</Text>
            <Text style={styles.totalSeats}>{results.winner === 'Player' ? 'YOU ARE LEADING' : 'OPPOSITION AHEAD'}</Text>
            
            <View style={styles.progressBarWrapper}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${(results.playerVotes / (results.playerVotes + results.opponentVotes)) * 100}%`,
                    backgroundColor: results.winner === 'Player' ? '#EF4444' : '#3B82F6'
                  }
                ]} 
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.finishButton} 
          onPress={() => router.push('/coalition')}
        >
          <LinearGradient colors={['#D97706', '#92400E']} style={styles.finishGradient}>
            <Text style={styles.finishText}>PROCEED TO COALITION</Text>
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
  },
  mainCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 20,
    marginBottom: 20,
  },
  countingHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  electionDayTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: '#EC4899',
    letterSpacing: 1.5,
  },
  countingText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
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
    opacity: 0.9,
  },
  sidebar: {
    width: 120,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    height: 300,
    alignSelf: 'center',
  },
  sidebarHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: 8,
    marginBottom: 8,
  },
  sidebarTitle: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'center',
    letterSpacing: 1,
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
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  nameText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#CBD5E1',
  },
  seatValue: {
    fontFamily: FONTS.bold,
    fontSize: 12,
  },
  liveResultsBox: {
    marginTop: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  liveResultsTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#F8FAFC',
    letterSpacing: 1,
  },
  totalSeats: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#CBD5E1',
    marginVertical: 8,
  },
  progressBarWrapper: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    width: '80%', // Mock percentage
  },
  finishButton: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  finishGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#FFF',
    letterSpacing: 2,
  },
});
