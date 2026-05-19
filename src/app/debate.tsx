import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

export default function DebateScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DEBATE ROUND</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <ImageBackground 
            source={require('../../assets/images/debate.png')} 
            style={styles.cinematicBg}
            imageStyle={{ borderRadius: 20 }}
          >
            <LinearGradient 
              colors={['transparent', 'rgba(15, 23, 42, 0.8)', '#0F172A']} 
              style={styles.cinematicGradient}
            >
              <Text style={styles.cinematicTitle}>THE GREAT DEBATE</Text>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.strategySection}>
            <Text style={styles.sectionLabel}>CHOOSE YOUR STRATEGY</Text>
            
            <TouchableOpacity style={styles.strategyBtn}>
              <View style={styles.strategyLeft}>
                <View style={[styles.strategyIconBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                  <MaterialCommunityIcons name="lightning-bolt" size={24} color="#EF4444" />
                </View>
                <View style={styles.strategyInfo}>
                  <Text style={styles.strategyTitle}>Attack Opponent</Text>
                  <Text style={styles.strategyDesc}>Expose opponent's failure on jobs</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.strategyBtn}>
              <View style={styles.strategyLeft}>
                <View style={[styles.strategyIconBox, { backgroundColor: 'rgba(34, 197, 94, 0.1)' }]}>
                  <MaterialCommunityIcons name="shield-check" size={24} color="#22C55E" />
                </View>
                <View style={styles.strategyInfo}>
                  <Text style={styles.strategyTitle}>Defend Yourself</Text>
                  <Text style={styles.strategyDesc}>Defend your record & promises</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.strategyBtn}>
              <View style={styles.strategyLeft}>
                <View style={[styles.strategyIconBox, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
                  <MaterialCommunityIcons name="trophy-outline" size={24} color="#3B82F6" />
                </View>
                <View style={styles.strategyInfo}>
                  <Text style={styles.strategyTitle}>Highlight Achievements</Text>
                  <Text style={styles.strategyDesc}>Showcase your best work</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.votingFooter}>
            <MaterialCommunityIcons name="timer-sand" size={16} color="#94A3B8" />
            <Text style={styles.votingText}>Audience is voting...</Text>
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
    paddingHorizontal: SPACING.lg,
    paddingBottom: 40,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  cinematicBg: {
    height: 220,
    width: '100%',
    justifyContent: 'flex-end',
  },
  cinematicGradient: {
    padding: 16,
    alignItems: 'center',
  },
  cinematicTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: '#FFF',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  strategySection: {
    padding: 20,
    gap: 16,
  },
  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 8,
    letterSpacing: 1,
  },
  strategyBtn: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  strategyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strategyIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  strategyInfo: {
    flex: 1,
  },
  strategyTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#F8FAFC',
  },
  strategyDesc: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  votingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
    marginTop: 'auto',
  },
  votingText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#94A3B8',
    marginLeft: 8,
  },
});
