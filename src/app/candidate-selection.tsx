import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, Animated, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { PARTIES, CANDIDATE_AVATARS } from '../constants/dummyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGameStore } from '../store/gameStore';

const { width } = Dimensions.get('window');

const AVATAR_BIOS = [
  {
    title: 'THE CHARISMATIC VISIONARY',
    desc: 'An eloquent public orator who excels in national debates and youth mobilization. Has a natural starting bonus in media presence.',
    perk: '⚡ +10% Debate Performance Multiplier • +5% Start Youth Approvals',
    icon: 'bullhorn-variant'
  },
  {
    title: 'THE STRATEGIC COMMANDER',
    desc: 'A seasoned policy scholar who designs bulletproof legislative drafts. Maintains strong alignment with corporate sectors.',
    perk: '💼 -15% Scandal Occurrence Risk • +5% Start Business Approvals',
    icon: 'briefcase'
  },
  {
    title: 'THE AGRARIAN CHAMPION',
    desc: 'A grassroots leader representing farmer cooperatives and rural unions. Highly favored in agricultural territories.',
    perk: '🚜 +20% Welfare Scheme Effectiveness • +8% Start Farmers Approvals',
    icon: 'tractor'
  },
  {
    title: 'THE SOCIAL INTEGRATOR',
    desc: 'A human rights advocate focused on minority security acts and educational equality networks.',
    perk: '🛡️ +15% popular trust stability • +6% Start Minority Approvals',
    icon: 'shield-account'
  }
];

const PARTY_STRONGHOLDS = [
  {
    id: '1',
    name: 'RATIONAL ADVOCATES',
    stronghold: 'WEST PROVINCE',
    focus: 'Capitalist expansion, digital infrastructure, corporate deregulation.',
    icon: 'shield-airplane'
  },
  {
    id: '2',
    name: 'PEOPLES ALLIANCE',
    stronghold: 'SOUTH PROVINCE',
    focus: 'Grassroots agrarian subsidies, pension indexing, welfare nets.',
    icon: 'sprout'
  },
  {
    id: '3',
    name: 'SOVEREIGN SHIELD',
    stronghold: 'NORTH PROVINCE',
    focus: 'National border security, sovereign aerospace control, traditional values.',
    icon: 'castle'
  },
  {
    id: '4',
    name: 'DIGITAL PROGRESSIVE',
    stronghold: 'CENTRAL PROVINCE',
    focus: 'Advanced smart city grids, high-speed regional fiber, green energy.',
    icon: 'cpu'
  }
];

export default function CandidateSelectionScreen() {
  const router = useRouter();
  const setGameSession = useGameStore((state) => state.setGameSession);
  const [currentStep, setCurrentStep] = useState(0); // 0: Candidate, 1: Party, 2: Ideology
  
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedParty, setSelectedParty] = useState('1');
  const [activeHelp, setActiveHelp] = useState<{ title: string; desc: string; perkLabel: string; perk: string; icon: string; color: string } | null>(null);

  // Animation Refs
  const avatarScale = useRef(new Animated.Value(1)).current;
  const partyScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  const selectAvatar = (index: number) => {
    setSelectedAvatar(index);
    avatarScale.setValue(0.92);
    Animated.spring(avatarScale, {
      toValue: 1.0,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const selectParty = (id: string) => {
    setSelectedParty(id);
    partyScale.setValue(0.92);
    Animated.spring(partyScale, {
      toValue: 1.0,
      friction: 4,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  const [ideology, setIdeology] = useState({
    economy: 50,
    social: 50,
    diplomacy: 50,
  });

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      setGameSession({
        selectedPartyId: selectedParty,
        selectedAvatarIndex: selectedAvatar,
        ideology: ideology,
      });
      router.push('/manifesto');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const updateIdeology = (key: keyof typeof ideology, value: number) => {
    setIdeology(prev => ({ ...prev, [key]: value }));
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>REPRESENTATIVE SETUP</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Modern Stepper Indicator */}
      <View style={styles.stepperContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep > 0 ? styles.stepCompleted : (currentStep === 0 ? styles.stepActive : styles.stepInactive)]}>
            {currentStep > 0 ? (
              <MaterialCommunityIcons name="check" size={12} color="#FFF" />
            ) : (
              <Text style={styles.stepNumber}>1</Text>
            )}
          </View>
          <Text style={[styles.stepLabel, currentStep >= 0 && styles.activeStepLabel]}>DOSSIER</Text>
        </View>
        
        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep > 1 ? styles.stepCompleted : (currentStep === 1 ? styles.stepActive : styles.stepInactive)]}>
             {currentStep > 1 ? (
               <MaterialCommunityIcons name="check" size={12} color="#FFF" />
             ) : (
               <Text style={styles.stepNumber}>2</Text>
             )}
          </View>
          <Text style={[styles.stepLabel, currentStep >= 1 && styles.activeStepLabel]}>FACTION</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep === 2 ? styles.stepActive : styles.stepInactive]}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={[styles.stepLabel, currentStep === 2 && styles.activeStepLabel]}>POLICY</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {currentStep === 0 && renderAvatarStep()}
          {currentStep === 1 && renderPartyStep()}
          {currentStep === 2 && renderIdeologyStep()}
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButtonWrapper} activeOpacity={0.8} onPress={handleNext}>
          <LinearGradient colors={['#E11D48', '#881337']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>
              {currentStep === 2 ? 'DEPLOY ADVOCACY TO BOARD' : 'CONFIRM & PROCEED'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Glassmorphic Help Popups */}
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
                <Text style={styles.adviceLabel}>{activeHelp.perkLabel}</Text>
                <Text style={styles.adviceText}>{activeHelp.perk}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.modalCloseBtn, { backgroundColor: activeHelp.color }]}
                activeOpacity={0.8}
                onPress={() => setActiveHelp(null)}
              >
                <Text style={styles.modalCloseText}>CLOSE PROTOCOL FILES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );

  function renderAvatarStep() {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={styles.sectionLabel}>CHOOSE YOUR REPRESENTATIVE BIOGRAPHY</Text>
        <View style={styles.avatarGrid}>
          {CANDIDATE_AVATARS.map((avatar, index) => {
            const bio = AVATAR_BIOS[index];
            return (
              <View key={index} style={{ width: (width - 44) / 2, marginBottom: 12, position: 'relative' }}>
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => selectAvatar(index)}
                  style={{ flex: 1 }}
                >
                  <Animated.View 
                    style={[
                      styles.avatarCard, 
                      selectedAvatar === index && styles.selectedAvatarCard,
                      selectedAvatar === index && { transform: [{ scale: avatarScale }] }
                    ]}
                  >
                    <Image source={{ uri: avatar }} style={styles.avatarImage} />
                    <Text style={styles.avatarBriefTitle}>{bio.title.split(' ')[2]}</Text>
                  </Animated.View>
                </TouchableOpacity>

                {/* Info Bulb trigger */}
                <TouchableOpacity 
                  style={styles.cardInfoBulb}
                  activeOpacity={0.8}
                  onPress={() => setActiveHelp({
                    title: bio.title,
                    desc: bio.desc,
                    perkLabel: 'ACTIVE CAMPAIGN PERKS',
                    perk: bio.perk,
                    icon: bio.icon,
                    color: COLORS.primary,
                  })}
                >
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={12} color="#FFF" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  function renderPartyStep() {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={styles.sectionLabel}>FACTION STRATEGIC STRONGBOXES</Text>
        <View style={styles.partyGrid}>
          {PARTIES.map((party, index) => {
            const sh = PARTY_STRONGHOLDS.find(p => p.id === party.id) || PARTY_STRONGHOLDS[0];
            return (
              <View key={party.id} style={{ width: (width - 44) / 2, marginBottom: 12, position: 'relative' }}>
                <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={() => selectParty(party.id)}
                  style={{ flex: 1 }}
                >
                  <Animated.View 
                    style={[
                      styles.partyCard, 
                      { backgroundColor: 'rgba(27, 42, 74, 0.2)' }, 
                      selectedParty === party.id && { borderColor: party.color || COLORS.primary, borderWidth: 1.5 },
                      selectedParty === party.id && { transform: [{ scale: partyScale }] }
                    ]}
                  >
                    <View style={[styles.partyIconContainer, { backgroundColor: party.color || COLORS.primary }]}>
                      <MaterialCommunityIcons name={party.icon as any} size={24} color="#FFF" />
                    </View>
                    <Text style={styles.partyNameText}>{party.name.toUpperCase()}</Text>
                  </Animated.View>
                </TouchableOpacity>

                {/* Info Bulb trigger */}
                <TouchableOpacity 
                  style={styles.cardInfoBulb}
                  activeOpacity={0.8}
                  onPress={() => setActiveHelp({
                    title: party.name.toUpperCase(),
                    desc: sh.focus,
                    perkLabel: 'STRATEGIC REGIONAL STRONGBOX',
                    perk: `📍 Stronghold: ${sh.stronghold} • Receives early starting ratings multipliers in this sector.`,
                    icon: sh.icon,
                    color: party.color || COLORS.primary,
                  })}
                >
                  <MaterialCommunityIcons name="lightbulb-on-outline" size={12} color="#FFF" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  function renderIdeologyStep() {
    const axes = [
      { key: 'economy', label: 'ECONOMY CORE', left: 'Socialist', right: 'Capitalist', icon: 'bank', desc: 'Determines fiscal resource management. Socialist unlocks cheaper welfare; Capitalist lowers smart city costs.' },
      { key: 'social', label: 'SOCIAL CORE', left: 'Liberal', right: 'Traditional', icon: 'account-group', desc: 'Determines demographic alignments. Liberal shifts youth metrics; Traditional favors seniors and rural.' },
      { key: 'diplomacy', label: 'DIPLOMACY CORE', left: 'Neutral', right: 'Aggressive', icon: 'shield-airplane', desc: 'Determines national debate posture. Aggressive increases scandal play risk but deals heavy opposition damage.' },
    ];

    return (
      <View style={styles.ideologyContainer}>
        <Text style={styles.sectionLabel}>IDEOLOGICAL POLICY STANCES</Text>
        <View style={styles.sectionBox}>
          {axes.map((axis) => {
            const val = ideology[axis.key as keyof typeof ideology];
            return (
              <View key={axis.key} style={styles.sliderRow}>
                <View style={styles.sliderLabelRow}>
                  <Text style={styles.sliderMainLabel}>{axis.label}</Text>
                  <TouchableOpacity 
                    style={styles.sliderInfoBulb}
                    activeOpacity={0.8}
                    onPress={() => setActiveHelp({
                      title: axis.label,
                      desc: axis.desc,
                      perkLabel: 'IDEOLOGY ALIGNMENTS',
                      perk: `Active Focus: Leaning ${val < 50 ? axis.left : axis.right} (${val}% index rating).`,
                      icon: axis.icon,
                      color: COLORS.primary,
                    })}
                  >
                    <MaterialCommunityIcons name="lightbulb-on-outline" size={12} color="#FFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.sliderWrapper}>
                  <View style={styles.sliderEndpoints}>
                    <Text style={[styles.endpointTextBlue, val <= 40 && { fontFamily: FONTS.bold, color: COLORS.secondary }]}>{axis.left}</Text>
                    <Text style={[styles.endpointTextRed, val >= 60 && { fontFamily: FONTS.bold, color: COLORS.danger }]}>{axis.right}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.trackContainer}
                    activeOpacity={1}
                    onPress={(e) => {
                      const newX = e.nativeEvent.locationX;
                      const percentage = Math.round((newX / (width - 150)) * 100);
                      updateIdeology(axis.key as any, Math.min(100, Math.max(0, percentage)));
                    }}
                  >
                    <View style={styles.trackBlue} />
                    <View style={styles.trackRed} />
                    <View style={[styles.sliderThumb, { left: `${val}%` }]} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information-outline" size={14} color={COLORS.primary} />
          <Text style={styles.infoText}>Your policy stances will shift your organic demographics approval gauges dynamically.</Text>
        </View>
      </View>
    );
  }
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
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    backgroundColor: 'rgba(14, 23, 38, 0.4)',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  stepActive: {
    backgroundColor: COLORS.primary,
  },
  stepCompleted: {
    backgroundColor: COLORS.success,
  },
  stepInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  stepNumber: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
  },
  stepLabel: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  activeStepLabel: {
    color: '#FFF',
  },
  stepLine: {
    width: 25,
    height: 1,
    backgroundColor: COLORS.surfaceBorder,
    marginHorizontal: 12,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: 150,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarCard: {
    width: '100%',
    height: 120,
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
    overflow: 'hidden',
  },
  selectedAvatarCard: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
  },
  avatarBriefTitle: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.textMuted,
    marginTop: 6,
    letterSpacing: 0.5,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardInfoBulb: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(14,23,38,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  partyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  partyCard: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
  },
  partyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  partyNameText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: '#F8FAFC',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  ideologyContainer: {
    marginTop: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  infoText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textMuted,
    marginLeft: 8,
    flex: 1,
    lineHeight: 14,
  },
  sectionBox: {
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 16,
  },
  sliderRow: {
    marginBottom: 16,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sliderMainLabel: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  sliderInfoBulb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(14,23,38,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderWrapper: {
    flex: 1,
  },
  sliderEndpoints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  endpointTextBlue: {
    fontFamily: FONTS.medium,
    fontSize: 9,
    color: 'rgba(255,255,255,0.4)',
  },
  endpointTextRed: {
    fontFamily: FONTS.medium,
    fontSize: 9,
    color: 'rgba(255,255,255,0.4)',
  },
  trackContainer: {
    height: 4,
    flexDirection: 'row',
    borderRadius: 2,
    alignItems: 'center',
    backgroundColor: COLORS.surfaceBorder,
  },
  trackBlue: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.secondary,
  },
  trackRed: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.danger,
  },
  sliderThumb: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginLeft: -7,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: SPACING.md,
    paddingBottom: 40,
    backgroundColor: COLORS.overlay,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonWrapper: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButton: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#FFF',
    letterSpacing: 1.5,
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
