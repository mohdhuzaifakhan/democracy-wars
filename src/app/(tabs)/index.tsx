import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../../constants/theme';
import { USER_PROFILE } from '../../constants/dummyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [activeHelp, setActiveHelp] = useState<{ title: string; desc: string; tips: string; icon: string; color: string } | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade and slide-in staggered sequence on load
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Breathing profile pulse looping infinitely
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePlayGame = () => {
    router.push('/candidate-selection');
  };

  const handleMultiplayer = () => {
    router.push('/lobby');
  };

  const handleLeaderboard = () => {
    router.push('/leaderboard');
  };

  const xpPercentage = 45; // Level progress

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      {/* Top Header Strategy Dashboard */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Animated.View style={[styles.avatarWrapper, { transform: [{ scale: pulseAnim }] }]}>
            <Image source={{ uri: USER_PROFILE.avatar }} style={styles.avatar} />
          </Animated.View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{USER_PROFILE.name.toUpperCase()}</Text>
            <View style={styles.levelRow}>
              <Text style={styles.rankText}>LVL {USER_PROFILE.level}</Text>
              <Text style={styles.rankTitle}> • {USER_PROFILE.rankTitle.toUpperCase()}</Text>
            </View>
            {/* Elegant Mini XP Track */}
            <View style={styles.xpTrackContainer}>
              <View style={[styles.xpTrackFill, { width: `${xpPercentage}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.currencySection}>
          <View style={styles.currencyRow}>
            <MaterialCommunityIcons name="circle-multiple" size={14} color={COLORS.primary} />
            <Text style={styles.currencyText}>{USER_PROFILE.coins.toLocaleString()}</Text>
            <TouchableOpacity style={styles.plusButton} activeOpacity={0.8}>
              <MaterialCommunityIcons name="plus" size={10} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.currencyRow}>
            <MaterialCommunityIcons name="diamond" size={14} color="#38BDF8" />
            <Text style={styles.currencyText}>{USER_PROFILE.diamonds.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Main Strategic Banner */}
          <View style={styles.strategyBanner}>
            <LinearGradient colors={['rgba(225, 29, 72, 0.15)', 'rgba(6, 9, 19, 0)']} style={styles.bannerGradient}>
              <View style={styles.bannerInfo}>
                <View style={styles.bannerHeader}>
                  <Text style={styles.bannerTitle}>CAMPAIGN SEASON ACTIVE</Text>
                  <TouchableOpacity 
                    style={styles.bannerBulb}
                    activeOpacity={0.8}
                    onPress={() => setActiveHelp({
                      title: 'MAJORITY DEPLOYMENT SEASON',
                      desc: 'Earn double experience points and unlock high-tier tactics card packs by matching into live server lobbies.',
                      tips: 'Complete at least three candidate setup configurations to receive early faction endorsements.',
                      icon: 'trophy-award',
                      color: COLORS.primary,
                    })}
                  >
                    <MaterialCommunityIcons name="lightbulb-on-outline" size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.bannerDesc}>Earn double XP and exclusive rewards. Tap bulb for rules.</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Singleplay */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={handlePlayGame} style={{ flex: 1 }}>
              <LinearGradient colors={['#E11D48', '#881337']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.mainButton}>
                <MaterialCommunityIcons name="sword-cross" size={22} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.mainButtonText}>SINGLEPLAY CAMPAIGN</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color="rgba(255,255,255,0.4)" style={{ marginLeft: 'auto' }} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.bulbTrigger, { borderColor: '#E11D48' }]}
              activeOpacity={0.8}
              onPress={() => setActiveHelp({
                title: 'SINGLEPLAY CAMPAIGN MODE',
                desc: 'Deploy as your chosen representative on a 2D strategic simulation board, competing for voter approval across 5 provinces.',
                tips: 'Slide your candidate avatar to contested sectors and deploy welfare or rallies to capture swing approvals before election day.',
                icon: 'sword-cross',
                color: '#E11D48',
              })}
            >
              <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Multiplayer */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleMultiplayer} style={{ flex: 1 }}>
              <LinearGradient colors={['#7C3AED', '#4C1D95']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.mainButton}>
                <MaterialCommunityIcons name="account-group" size={22} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.mainButtonText}>MULTIPLAYER LOBBY</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color="rgba(255,255,255,0.4)" style={{ marginLeft: 'auto' }} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.bulbTrigger, { borderColor: '#7C3AED' }]}
              activeOpacity={0.8}
              onPress={() => setActiveHelp({
                title: 'MULTIPLAYER LOBBY',
                desc: 'Compete in real-time tactical matches against active online political strategists to capture the capital.',
                tips: 'Unlock and compile custom tactical decks of action cards to disrupt opposing communication systems.',
                icon: 'account-group',
                color: '#7C3AED',
              })}
            >
              <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Practice */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={handlePlayGame} style={{ flex: 1 }}>
              <LinearGradient colors={['#2563EB', '#1E3A8A']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.mainButton}>
                <MaterialCommunityIcons name="whistle" size={22} color="#FFF" style={styles.buttonIcon} />
                <Text style={styles.mainButtonText}>AI ORATORY TRAINING</Text>
                <MaterialCommunityIcons name="chevron-right" size={18} color="rgba(255,255,255,0.4)" style={{ marginLeft: 'auto' }} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.bulbTrigger, { borderColor: '#2563EB' }]}
              activeOpacity={0.8}
              onPress={() => setActiveHelp({
                title: 'AI ORATORY TRAINING',
                desc: 'Refine your debate answers and crisis containment protocols against deep simulated neural advisor bots.',
                tips: 'Perfect your responses to high-penalty corruption leaks without affecting your actual campaign rating records.',
                icon: 'whistle',
                color: '#2563EB',
              })}
            >
              <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Row: Leaderboard & Store */}
          <View style={styles.rowButtons}>
            <View style={[styles.halfButtonContainer, { marginRight: 6 }]}>
              <TouchableOpacity activeOpacity={0.8} onPress={handleLeaderboard} style={{ flex: 1 }}>
                <LinearGradient colors={['#10B981', '#064E3B']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.halfButton}>
                  <MaterialCommunityIcons name="podium" size={18} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.halfButtonTitle}>DOSSIERS</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.halfBulbTrigger, { borderColor: '#10B981' }]}
                activeOpacity={0.8}
                onPress={() => setActiveHelp({
                  title: 'ADVOCATE DOSSIERS',
                  desc: 'Inspect global rankings of elite campaign coordinators and examine their active deck formations.',
                  tips: 'Climb the regional leaderboard ranks by securing consecutive electoral landslides.',
                  icon: 'podium',
                  color: '#10B981',
                })}
              >
                <MaterialCommunityIcons name="lightbulb-on-outline" size={12} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View style={[styles.halfButtonContainer, { marginLeft: 6 }]}>
              <TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }}>
                <LinearGradient colors={['#B45309', '#78350F']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.halfButton}>
                  <MaterialCommunityIcons name="cart" size={18} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.halfButtonTitle}>STORE</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.halfBulbTrigger, { borderColor: '#B45309' }]}
                activeOpacity={0.8}
                onPress={() => setActiveHelp({
                  title: 'TACTICAL SUPPLY STORE',
                  desc: 'Acquire premium supplies, action card decks, and cosmetics utilizing your hard-earned campaign coins.',
                  tips: 'Check back daily for seasonal avatar drops and promotional faction boosters.',
                  icon: 'cart',
                  color: '#B45309',
                })}
              >
                <MaterialCommunityIcons name="lightbulb-on-outline" size={12} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Dashboard Help Advisory Modal */}
      {activeHelp && (
        <Modal
          transparent={true}
          visible={activeHelp !== null}
          animationType="fade"
          onRequestClose={() => setActiveHelp(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <LinearGradient colors={['#0F172A', '#060913']} style={StyleSheet.absoluteFill} />
              
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name={activeHelp.icon as any} size={24} color={activeHelp.color} style={{ marginRight: 10 }} />
                <Text style={styles.modalTitle}>{activeHelp.title}</Text>
              </View>

              <Text style={styles.modalDesc}>{activeHelp.desc}</Text>

              <View style={styles.modalAdviceBox}>
                <Text style={styles.adviceLabel}>ADVISORY ACTION TIPS</Text>
                <Text style={styles.adviceText}>{activeHelp.tips}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.modalCloseBtn, { backgroundColor: activeHelp.color }]}
                activeOpacity={0.8}
                onPress={() => setActiveHelp(null)}
              >
                <Text style={styles.modalCloseText}>CLOSE PROTOCOL INDEX</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingTop: 60,
    paddingBottom: SPACING.md,
    backgroundColor: 'rgba(14, 23, 38, 0.85)',
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarWrapper: {
    padding: 2,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profileInfo: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.text,
    letterSpacing: 1,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rankText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.primary,
  },
  rankTitle: {
    fontFamily: FONTS.medium,
    fontSize: 8,
    color: COLORS.textMuted,
  },
  xpTrackContainer: {
    width: '80%',
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },
  xpTrackFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 2,
  },
  currencySection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 10,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currencyText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.text,
    marginLeft: 4,
    width: 40, 
  },
  plusButton: {
    backgroundColor: COLORS.success,
    width: 12,
    height: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  scrollContent: {
    padding: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: 100,
  },
  strategyBanner: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(27, 42, 74, 0.45)',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 14,
    marginTop: 6,
  },
  bannerGradient: {
    padding: 12,
  },
  bannerInfo: {
    gap: 4,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.primary,
    letterSpacing: 1,
  },
  bannerBulb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(14,23,38,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerDesc: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textMuted,
    lineHeight: 14,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  mainButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
  },
  buttonIcon: {
    marginRight: 10,
  },
  mainButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.text,
    letterSpacing: 1.5,
  },
  bulbTrigger: {
    width: 48,
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: 'rgba(14,23,38,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  halfButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  halfButton: {
    height: 52,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
  },
  halfButtonTitle: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.text,
    letterSpacing: 1.5,
  },
  halfBulbTrigger: {
    width: 38,
    height: 52,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: 'rgba(14,23,38,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(6,9,19,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
    padding: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingBottom: 12,
  },
  modalTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#FFF',
    letterSpacing: 0.5,
    flex: 1,
  },
  modalDesc: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textMuted,
    lineHeight: 16,
    marginBottom: 20,
  },
  modalAdviceBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.12)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  adviceLabel: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  adviceText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: '#F8FAFC',
    lineHeight: 14,
  },
  modalCloseBtn: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 1.5,
  },
});
