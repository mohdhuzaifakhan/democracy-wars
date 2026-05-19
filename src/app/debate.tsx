import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const STRATEGIES = [
  {
    id: '1',
    title: 'OFFENSIVE DIRECT ATTACK',
    desc: "Expose opponent's critical policy failures on jobs creation and industrial growth.",
    forecast: '⚡ -15% Opponent approval rates • +10% Youth approvals • ⚠️ +15% Scandal Risk.',
    icon: 'lightning-bolt',
    color: COLORS.danger
  },
  {
    id: '2',
    title: 'FACTUAL RETALIATIVE DEFENSE',
    desc: 'Provide comprehensive budget allocation integrity reports to defend your record.',
    forecast: '⚡ +12% Popular trust score • +8% Business approvals • ✅ 0% Scandal Risk.',
    icon: 'shield-check',
    color: COLORS.success
  },
  {
    id: '3',
    title: 'HIGHLIGHT DOMESTIC VICTORIES',
    desc: 'Showcase massive grassroots infrastructure milestones completed in rural provinces.',
    forecast: '⚡ +15% Farmers approvals • +10% Seniors approvals • ✅ -5% Scandal Risk.',
    icon: 'trophy-outline',
    color: COLORS.primary
  }
];

export default function DebateScreen() {
  const router = useRouter();
  const [activeStrategy, setActiveStrategy] = useState<typeof STRATEGIES[0] | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const flickerAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Fade and slide entry
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Constant flickering TV signal effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(flickerAnim, {
          toValue: 0.7,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 1.0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 0.65,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 1.0,
          duration: 200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NATIONAL DEBATE</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <ImageBackground 
            source={require('../../assets/images/debate.png')} 
            style={styles.cinematicBg}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient 
              colors={['transparent', 'rgba(6, 9, 19, 0.7)', 'rgba(6, 9, 19, 0.95)']} 
              style={styles.cinematicGradient}
            >
              <Animated.View style={{ opacity: flickerAnim, alignItems: 'center' }}>
                <Text style={styles.cinematicTitle}>LIVE NATIONAL BROADCAST</Text>
                <Text style={styles.cinematicSubtitle}>DEBATE ON ECONOMIC & CAREER OUTLOOK</Text>
              </Animated.View>
            </LinearGradient>
          </ImageBackground>

          <Animated.View style={[styles.strategySection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.sectionLabel}>CHOOSE YOUR ORATORY STRATEGY</Text>
            
            {STRATEGIES.map((strategy) => (
              <View key={strategy.id} style={styles.btnContainer}>
                <TouchableOpacity 
                  style={styles.strategyBtn} 
                  activeOpacity={0.8} 
                  onPress={() => router.back()}
                >
                  <View style={styles.strategyLeft}>
                    <View style={[styles.strategyIconBox, { backgroundColor: strategy.color + '15' }]}>
                      <MaterialCommunityIcons name={strategy.icon as any} size={18} color={strategy.color} />
                    </View>
                    <Text style={styles.strategyTitle}>{strategy.title}</Text>
                  </View>
                </TouchableOpacity>

                {/* Gold Bulb trigger */}
                <TouchableOpacity 
                  style={[styles.strategyInfoBulb, { borderColor: strategy.color + '30' }]}
                  activeOpacity={0.8}
                  onPress={() => setActiveStrategy(strategy)}
                >
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={14} color={strategy.color} />
                </TouchableOpacity>
              </View>
            ))}
          </Animated.View>

          <View style={styles.votingFooter}>
            <MaterialCommunityIcons name="timer-sand" size={14} color={COLORS.primary} />
            <Text style={styles.votingText}>AUDIENCE DIAL RESPONSE VOTING LIVE...</Text>
          </View>
        </View>
      </View>

      {/* Strategic Oratory Advisor Modal */}
      {activeStrategy && (
        <Modal
          transparent={true}
          visible={activeStrategy !== null}
          animationType="fade"
          onRequestClose={() => setActiveStrategy(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <LinearGradient colors={['#0F172A', '#060913']} style={StyleSheet.absoluteFill} />
              
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name={activeStrategy.icon as any} size={24} color={activeStrategy.color} style={{ marginRight: 10 }} />
                <Text style={styles.modalTitle}>{activeStrategy.title}</Text>
              </View>

              <Text style={styles.modalDesc}>{activeStrategy.desc}</Text>

              <View style={styles.modalAdviceBox}>
                <Text style={styles.adviceLabel}>ORATORY STRATEGIC FORECAST</Text>
                <Text style={styles.adviceText}>{activeStrategy.forecast}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.modalCloseBtn, { backgroundColor: activeStrategy.color }]}
                activeOpacity={0.8}
                onPress={() => setActiveStrategy(null)}
              >
                <Text style={styles.modalCloseText}>CLOSE DOSSIER RECORD</Text>
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
    paddingHorizontal: SPACING.md,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    overflow: 'hidden',
  },
  cinematicBg: {
    height: 180,
    width: '100%',
    justifyContent: 'flex-end',
  },
  cinematicGradient: {
    padding: 16,
    alignItems: 'center',
  },
  cinematicTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 1.5,
  },
  cinematicSubtitle: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.primary,
    letterSpacing: 1,
    marginTop: 4,
  },
  strategySection: {
    padding: 16,
    gap: 10,
  },
  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  strategyBtn: {
    flex: 1,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
  },
  strategyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strategyIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  strategyTitle: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
    letterSpacing: 0.5,
    flex: 1,
  },
  strategyInfoBulb: {
    width: 48,
    height: 58,
    borderRadius: 16,
    borderWidth: 1.5,
    backgroundColor: 'rgba(14,23,38,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  votingFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    marginTop: 'auto',
    borderTopWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  votingText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.textMuted,
    marginLeft: 8,
    letterSpacing: 0.5,
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
