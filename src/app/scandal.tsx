import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

import { useGameStore } from '../store/gameStore';

export default function ScandalScreen() {
  const router = useRouter();
  const resolveEvent = useGameStore(state => state.resolveEvent);

  const handleChoice = (impact: any) => {
    resolveEvent(impact);
    router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SCANDAL EVENT</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <ImageBackground 
            source={require('../../assets/images/scandal.png')} 
            style={styles.cinematicBg}
            imageStyle={{ borderRadius: 20 }}
          >
            <LinearGradient 
              colors={['transparent', 'rgba(15, 23, 42, 0.8)', '#0F172A']} 
              style={styles.cinematicGradient}
            >
              <Text style={styles.cinematicTitle}>SCANDAL BREAKING!</Text>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.banner}>
            <Text style={styles.bannerText}>CORRUPTION LEAKED</Text>
          </View>

          <View style={styles.infoArea}>
            <Text style={styles.description}>
              A corruption case has been leaked against a top leader in your party!
            </Text>
            <View style={styles.penaltyRow}>
              <Text style={styles.penaltyText}>-15% Approval</Text>
              <Text style={styles.penaltyTextSub}>All opponents gain +5% approval</Text>
            </View>
          </View>

          <Text style={styles.question}>WHAT WILL YOU DO?</Text>

          <View style={styles.options}>
            <TouchableOpacity 
              style={styles.optionBtn}
              onPress={() => handleChoice({ youth: -10, trust: -5, budget: -20 })}
            >
              <View style={styles.optionLeft}>
                <View style={styles.optionIconBox}>
                  <MaterialCommunityIcons name="bullhorn-outline" size={20} color="#EF4444" />
                </View>
                <Text style={styles.optionTitle}>Deny & Counter Attack</Text>
              </View>
              <Text style={styles.optionCost}>Cost: ₹ 20 Cr</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionBtn}
              onPress={() => handleChoice({ youth: -15, farmers: -15, seniors: -15 })}
            >
              <View style={styles.optionLeft}>
                <View style={styles.optionIconBox}>
                  <MaterialCommunityIcons name="comment-off-outline" size={20} color="#94A3B8" />
                </View>
                <Text style={styles.optionTitle}>Stay Silent</Text>
              </View>
              <Text style={styles.optionCost}>No effect</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionBtn}
              onPress={() => handleChoice({ trust: 15, budget: -15, youth: -5 })}
            >
              <View style={styles.optionLeft}>
                <View style={styles.optionIconBox}>
                  <MaterialCommunityIcons name="hand-heart-outline" size={20} color="#22C55E" />
                </View>
                <Text style={styles.optionTitle}>Accept & Apologize</Text>
              </View>
              <Text style={styles.optionCost}>Cost: ₹ 15 Cr</Text>
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
    padding: SPACING.md,
  },
  cinematicBg: {
    height: 200,
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
    color: '#FACC15',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  banner: {
    backgroundColor: '#991B1B',
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: -10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  bannerText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFF',
    letterSpacing: 1,
  },
  infoArea: {
    padding: 20,
    alignItems: 'center',
  },
  description: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 20,
  },
  penaltyRow: {
    marginTop: 16,
    alignItems: 'center',
  },
  penaltyText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#EF4444',
  },
  penaltyTextSub: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  question: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 1,
  },
  options: {
    gap: 12,
  },
  optionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#F8FAFC',
  },
  optionCost: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: '#94A3B8',
  },
});
