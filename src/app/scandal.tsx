import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useGameStore } from '../store/gameStore';

const SCANDAL_OPTIONS = [
  {
    id: 'deny',
    title: 'DENY & COUNTER-ATTACK',
    desc: 'Vehemently deny all lobbying charges and file counter-defamation suits vs opposing party advocates.',
    forecast: '📉 Costs ₹ 20 CR funding • ⚡ -10% Youth approvals • -5% trust • ✅ Removes high scandal risks.',
    icon: 'bullhorn-outline',
    color: COLORS.danger,
    impact: { youth: -10, trust: -5, budget: -20 }
  },
  {
    id: 'silence',
    title: 'MAINTAIN COMMAND SILENCE',
    desc: 'Ignore television updates entirely to prevent fueling public news speculation cycles.',
    forecast: '✅ Free of cost • ⚡ -15% Farmers, -15% Seniors approvals • 📉 -10% popular trust score.',
    icon: 'comment-off-outline',
    color: COLORS.textMuted,
    impact: { youth: -15, farmers: -15, seniors: -15 }
  },
  {
    id: 'apologize',
    title: 'ACCEPT & APOLOGIZE',
    desc: 'Publicly acknowledge administrative fund oversights, issue apologies, and launch independent audits.',
    forecast: '📉 Costs ₹ 15 CR funding • ⚡ +15% popular trust stability • -5% Youth approvals.',
    icon: 'hand-heart-outline',
    color: COLORS.success,
    impact: { trust: 15, budget: -15, youth: -5 }
  }
];

export default function ScandalScreen() {
  const router = useRouter();
  const resolveEvent = useGameStore(state => state.resolveEvent);
  const [activeOption, setActiveOption] = useState<typeof SCANDAL_OPTIONS[0] | null>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(25)).current;
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

    // Constant flickering TV signal effect for breaking news
    Animated.loop(
      Animated.sequence([
        Animated.timing(flickerAnim, {
          toValue: 0.6,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 1.0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 0.7,
          duration: 350,
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

  const handleChoice = (impact: any) => {
    resolveEvent(impact);
    router.back();
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CRISIS DISPATCH</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <ImageBackground 
            source={require('../../assets/images/scandal.png')} 
            style={styles.cinematicBg}
            imageStyle={{ borderRadius: 16 }}
          >
            <LinearGradient 
              colors={['transparent', 'rgba(6, 9, 19, 0.7)', 'rgba(6, 9, 19, 0.95)']} 
              style={styles.cinematicGradient}
            >
              <Animated.Text style={[styles.cinematicTitle, { opacity: flickerAnim }]}>BREAKING TELEVISION REPORT</Animated.Text>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.banner}>
            <Text style={styles.bannerText}>CORRUPTION DISCLOSED</Text>
          </View>

          <View style={styles.infoArea}>
            <Text style={styles.description}>
              Classified transaction files have been leaked linking top party advocates to illegal political lobbying funds.
            </Text>
            <View style={styles.penaltyRow}>
              <Text style={styles.penaltyText}>-15% RATINGS POLL PENALTY</Text>
              <Text style={styles.penaltyTextSub}>All opposing forces gain +5% swing approvals</Text>
            </View>
          </View>

          <Text style={styles.question}>DECIDE COMMAND STRATEGY</Text>

          <Animated.View style={[styles.options, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            {SCANDAL_OPTIONS.map((option) => (
              <View key={option.id} style={styles.optionContainer}>
                <TouchableOpacity 
                  activeOpacity={0.8}
                  style={styles.optionBtn}
                  onPress={() => handleChoice(option.impact)}
                >
                  <View style={styles.optionLeft}>
                    <View style={styles.optionIconBox}>
                      <MaterialCommunityIcons name={option.icon as any} size={16} color={option.color} />
                    </View>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                  </View>
                </TouchableOpacity>

                {/* Gold Bulb trigger */}
                <TouchableOpacity 
                  style={[styles.optionInfoBulb, { borderColor: option.color + '30' }]}
                  activeOpacity={0.8}
                  onPress={() => setActiveOption(option)}
                >
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={14} color={option.color} />
                </TouchableOpacity>
              </View>
            ))}
          </Animated.View>
        </View>
      </View>

      {/* Strategic Crisis Advisor Modal */}
      {activeOption && (
        <Modal
          transparent={true}
          visible={activeOption !== null}
          animationType="fade"
          onRequestClose={() => setActiveOption(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <LinearGradient colors={['#0F172A', '#060913']} style={StyleSheet.absoluteFill} />
              
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name={activeOption.icon as any} size={24} color={activeOption.color} style={{ marginRight: 10 }} />
                <Text style={styles.modalTitle}>{activeOption.title}</Text>
              </View>

              <Text style={styles.modalDesc}>{activeOption.desc}</Text>

              <View style={styles.modalAdviceBox}>
                <Text style={styles.adviceLabel}>CRISIS RESPONSE FORECAST</Text>
                <Text style={styles.adviceText}>{activeOption.forecast}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.modalCloseBtn, { backgroundColor: activeOption.color }]}
                activeOpacity={0.8}
                onPress={() => setActiveOption(null)}
              >
                <Text style={styles.modalCloseText}>CLOSE INTERFACE OVERLAY</Text>
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
    padding: 16,
  },
  cinematicBg: {
    height: 160,
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
  banner: {
    backgroundColor: 'rgba(225, 29, 72, 0.1)',
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  bannerText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.danger,
    letterSpacing: 1.5,
  },
  infoArea: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  description: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: '#CBD5E1',
    textAlign: 'center',
    lineHeight: 16,
  },
  penaltyRow: {
    marginTop: 8,
    alignItems: 'center',
  },
  penaltyText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: COLORS.danger,
    letterSpacing: 0.5,
  },
  penaltyTextSub: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  question: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1.5,
  },
  options: {
    gap: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  optionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
    letterSpacing: 0.5,
    flex: 1,
  },
  optionInfoBulb: {
    width: 48,
    height: 58,
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
