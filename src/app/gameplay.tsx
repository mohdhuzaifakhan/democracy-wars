import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useGameStore } from '../store/gameStore';
import { PARTIES, CANDIDATE_AVATARS } from '../constants/dummyData';
import TutorialOverlay from '../components/tutorial-overlay';

const { width } = Dimensions.get('window');

// Strategic Map Regions Coordinates
const REGIONS = [
  { id: 'north', name: 'NORTH PROVINCE', x: 140, y: 35, color: '#EF4444', leader: 'OPPOSITION', approval: 38, icon: 'shield-alert' },
  { id: 'west', name: 'WEST PROVINCE', x: 45, y: 125, color: '#3B82F6', leader: 'YOUR FLECTION', approval: 54, icon: 'shield-check' },
  { id: 'east', name: 'EAST PROVINCE', x: 235, y: 110, color: '#10B981', leader: 'CONTESTED', approval: 45, icon: 'shield-sync' },
  { id: 'south', name: 'SOUTH PROVINCE', x: 125, y: 220, color: '#8B5CF6', leader: 'YOUR FLECTION', approval: 61, icon: 'shield-check' },
  { id: 'central', name: 'CENTRAL PROVINCE', x: 135, y: 130, color: '#F59E0B', leader: 'CONTESTED', approval: 42, icon: 'shield-sync' },
];

export default function GameplayScreen() {
  const router = useRouter();
  const { 
    currentRound, 
    totalRounds, 
    nextRound, 
    budget, 
    trustScore,
    corruptionRisk,
    blocApproval,
    selectedPartyId,
    selectedAvatarIndex,
    applyAction
  } = useGameStore();

  const party = PARTIES.find(p => p.id === selectedPartyId) || PARTIES[0];
  const avatar = CANDIDATE_AVATARS[selectedAvatarIndex];

  // Active State Map Region
  const [activeRegion, setActiveRegion] = useState(REGIONS[4]); // Central Province start
  const [deploymentMessage, setDeploymentMessage] = useState('');
  
  // Tactical Telemetry Modal Popup State
  const [activeTelemetry, setActiveTelemetry] = useState<{ title: string; desc: string; advice: string; icon: string; color: string } | null>(null);

  // Onboarding Tutorial State
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Animation values
  const cardSlideAnim = useRef(new Animated.Value(45)).current;
  const cardFadeAnim = useRef(new Animated.Value(0)).current;
  const warningPulse = useRef(new Animated.Value(1)).current;
  
  // Character coordinates on map grid
  const characterPos = useRef(new Animated.ValueXY({ x: 135 - 18, y: 130 - 18 })).current;

  useEffect(() => {
    // Staggered slide up of action card deck
    Animated.parallel([
      Animated.timing(cardFadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(cardSlideAnim, {
        toValue: 0,
        friction: 6,
        tension: 45,
        useNativeDriver: true,
      }),
    ]).start();

    // Constant pulsing of active scandal threat warnings
    Animated.loop(
      Animated.sequence([
        Animated.timing(warningPulse, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(warningPulse, {
          toValue: 1.0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Character movement physics glide to region
  const handleMoveToRegion = (region: typeof REGIONS[0]) => {
    setActiveRegion(region);
    setDeploymentMessage('');
    
    Animated.spring(characterPos, {
      toValue: { x: region.x - 18, y: region.y - 18 },
      friction: 5,
      tension: 25,
      useNativeDriver: false, // Coordinates layout relies on flex styles
    }).start();

    if (showTutorial && tutorialStep === 1) {
      setTutorialStep(2);
    }
  };

  const handleDeployAction = (actionType: 'rally' | 'scheme' | 'expose' | 'fake_news') => {
    applyAction(actionType);
    
    const actionsMap = {
      rally: 'MEGA RALLY deployed! Captured grassroots voter waves.',
      scheme: 'WELFARE scheme distributed! Farmers security levels boosted.',
      expose: 'SCANDAL PLAY exposed! Opposition ratings damaged.',
      fake_news: 'INFORMATION WARFARE deployed! Constituency indices shaken.',
    };
    
    setDeploymentMessage(actionsMap[actionType]);

    if (showTutorial && tutorialStep === 2) {
      setTutorialStep(3);
    }
  };

  const avgApproval = Math.round(
    (blocApproval.youth + blocApproval.farmers + blocApproval.business + 
     blocApproval.women + blocApproval.minorities + blocApproval.seniors) / 6
  );

  const handleNextRound = () => {
    if (showTutorial && tutorialStep === 3) {
      setShowTutorial(false);
    }

    if (currentRound < totalRounds) {
      nextRound();
      setDeploymentMessage('');
    } else {
      router.push('/election-day');
    }
  };

  // Strategic Advisor Bulletins
  const showScandalAdvice = () => {
    setActiveTelemetry({
      title: 'SCANDAL THREAT TELEMETRY',
      desc: 'Indicates the probability of a political scandal breaking in upcoming rounds. Triggered by deploying high-risk cards (Exposes, Info Warfare, etc.).',
      advice: 'To mitigate Scandal Risks, avoid back-to-back attacks and invest in High Trust or Public Welfare schemes.',
      icon: 'alert-decagram',
      color: COLORS.danger,
    });
  };

  const showFundingAdvice = () => {
    setActiveTelemetry({
      title: 'CAMPAIGN WAR FUNDS',
      desc: 'Your active sovereign credit budget used to deploy tactical rallies, schemes, and counter-opposition cards.',
      advice: 'Earn additional budget increments by advancing through turns with high voter approvals and solid popular trust ratings.',
      icon: 'circle-multiple',
      color: COLORS.primary,
    });
  };

  const showApprovalAdvice = () => {
    setActiveTelemetry({
      title: 'REGIONAL POLL APPROVAL',
      desc: 'Average voter approval ratio across all active demographic cohorts (Youth, Farmers, Business, etc.).',
      advice: 'Keep this ratio above 50% to guarantee a secure sovereign majority in the final election day seat tally.',
      icon: 'shield-check-outline',
      color: COLORS.success,
    });
  };

  const showTrustAdvice = () => {
    setActiveTelemetry({
      title: 'POPULAR TRUST VALUE',
      desc: 'Sovereign integrity rating measured by your honest debate responses and clean public card play history.',
      advice: 'Higher trust levels dramatically lower scandal penalty risks and increase regional vote multipliers.',
      icon: 'heart-pulse',
      color: COLORS.secondary,
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      {/* Top Status Telemetry */}
      <View style={styles.header}>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>ROUND</Text>
          <Text style={styles.statusValue}>{currentRound}/{totalRounds}</Text>
        </View>

        <TouchableOpacity style={styles.statusItem} activeOpacity={0.8} onPress={showFundingAdvice}>
          <View style={styles.statusLabelRow}>
            <Text style={styles.statusLabel}>WAR FUNDING</Text>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={10} color={COLORS.primary} style={{ marginLeft: 2 }} />
          </View>
          <Text style={[styles.statusValue, { color: COLORS.primary }]}>₹ {budget} CR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statusItem} activeOpacity={0.8} onPress={showApprovalAdvice}>
          <View style={styles.statusLabelRow}>
            <Text style={styles.statusLabel}>POLL APPROVAL</Text>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={10} color={COLORS.success} style={{ marginLeft: 2 }} />
          </View>
          <Text style={[styles.statusValue, { color: COLORS.success }]}>{avgApproval}%</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statusItem} activeOpacity={0.8} onPress={showTrustAdvice}>
          <View style={styles.statusLabelRow}>
            <Text style={styles.statusLabel}>TRUST RATIO</Text>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={10} color={COLORS.secondary} style={{ marginLeft: 2 }} />
          </View>
          <Text style={[styles.statusValue, { color: COLORS.secondary }]}>{trustScore}</Text>
        </TouchableOpacity>
      </View>

      {/* Warning Scanner */}
      <Animated.View style={[styles.riskBadge, { transform: [{ scale: warningPulse }] }]}>
        <TouchableOpacity 
          style={{ flexDirection: 'row', alignItems: 'center' }} 
          activeOpacity={0.8}
          onPress={showScandalAdvice}
        >
          <MaterialCommunityIcons name="alert-decagram" size={14} color={corruptionRisk > 50 ? COLORS.danger : COLORS.primary} />
          <Text style={[styles.riskText, { color: corruptionRisk > 50 ? COLORS.danger : COLORS.primary }]}>
            CRITICAL SCANDAL THREAT: {corruptionRisk}%
          </Text>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={10} color={corruptionRisk > 50 ? COLORS.danger : COLORS.primary} style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </Animated.View>

      {/* Location Tracker Output */}
      <View style={styles.trackerPanel}>
        <View style={styles.trackerHeader}>
          <MaterialCommunityIcons name="map-marker-radius" size={16} color={activeRegion.color} />
          <Text style={styles.trackerTitle}>TACTICAL OUTPOST: {activeRegion.name}</Text>
        </View>
        <Text style={styles.trackerDetails}>
          Status: <Text style={{ color: activeRegion.color, fontFamily: FONTS.bold }}>{activeRegion.leader}</Text> • Local Index Approval: {activeRegion.approval}%
        </Text>
        {deploymentMessage !== '' && (
          <Text style={styles.deploymentAlert}>⚡ {deploymentMessage.toUpperCase()}</Text>
        )}
      </View>

      {/* Interactive 2D Board Simulation */}
      <View style={styles.gameArea}>
        {/* Left Demographics Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.blocItem}>
            <MaterialCommunityIcons name="account-school" size={16} color={COLORS.primary} />
            <Text style={styles.blocVal}>{blocApproval.youth}%</Text>
          </View>
          <View style={styles.blocItem}>
            <MaterialCommunityIcons name="tractor" size={16} color={COLORS.success} />
            <Text style={styles.blocVal}>{blocApproval.farmers}%</Text>
          </View>
          <View style={styles.blocItem}>
            <MaterialCommunityIcons name="briefcase-outline" size={16} color={COLORS.secondary} />
            <Text style={styles.blocVal}>{blocApproval.business}%</Text>
          </View>
          <View style={styles.blocItem}>
            <MaterialCommunityIcons name="face-woman-outline" size={16} color="#EC4899" />
            <Text style={styles.blocVal}>{blocApproval.women}%</Text>
          </View>
        </View>

        {/* 2D Board Canvas */}
        <View style={styles.mapContainer}>
          <View style={styles.mapWrapper}>
            <Image 
              source={require('../../assets/images/india_map.png')}
              style={styles.mapImg}
              contentFit="contain"
            />

            {/* Region Coordinates Anchors */}
            {REGIONS.map((region) => (
              <TouchableOpacity
                key={region.id}
                style={[styles.regionNode, { left: region.x, top: region.y }]}
                activeOpacity={0.8}
                onPress={() => handleMoveToRegion(region)}
              >
                <View style={[styles.nodeCircle, { borderColor: region.color }, activeRegion.id === region.id && { borderWidth: 3 }]}>
                  <MaterialCommunityIcons name={region.icon as any} size={10} color="#FFF" />
                </View>
                {activeRegion.id !== region.id && (
                  <Text style={styles.nodeLabel}>{region.id.toUpperCase()}</Text>
                )}
              </TouchableOpacity>
            ))}

            {/* Floating Traveling Candidate Node */}
            <Animated.View style={[styles.characterNode, characterPos.getLayout()]}>
              <View style={[styles.characterRing, { borderColor: party.color || COLORS.primary }]}>
                <Image source={{ uri: avatar }} style={styles.characterImgOnMap} />
                <View style={[styles.factionTag, { backgroundColor: party.color || COLORS.primary }]} />
              </View>
            </Animated.View>
          </View>
        </View>
      </View>

      {/* Dynamic Local Command Deck */}
      <Animated.View style={[styles.actionDock, { opacity: cardFadeAnim, transform: [{ translateY: cardSlideAnim }] }]}>
        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => handleDeployAction('rally')}>
          <LinearGradient colors={['#E11D48', '#881337']} style={styles.actionGradient}>
            <MaterialCommunityIcons name="microphone-variant" size={18} color="#FFF" />
            <Text style={styles.actionText}>MEGA RALLY</Text>
            <Text style={styles.actionSub}>DEPLOY HERE</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => handleDeployAction('scheme')}>
          <LinearGradient colors={['#10B981', '#064E3B']} style={styles.actionGradient}>
            <MaterialCommunityIcons name="tractor" size={18} color="#FFF" />
            <Text style={styles.actionText}>WELFARE</Text>
            <Text style={styles.actionSub}>DEPLOY HERE</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => handleDeployAction('expose')}>
          <LinearGradient colors={['#8B5CF6', '#4C1D95']} style={styles.actionGradient}>
            <MaterialCommunityIcons name="target" size={18} color="#FFF" />
            <Text style={styles.actionText}>SCANDAL PLAY</Text>
            <Text style={styles.actionSub}>DEPLOY HERE</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => handleDeployAction('fake_news')}>
          <LinearGradient colors={['#64748B', '#1E293B']} style={styles.actionGradient}>
            <MaterialCommunityIcons name="newspaper-variant-outline" size={18} color="#FFF" />
            <Text style={styles.actionText}>DISRUPT INFO</Text>
            <Text style={styles.actionSub}>DEPLOY HERE</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Command Docks */}
      <View style={styles.footer}>
        <View style={styles.budgetBox}>
          <Text style={styles.budgetText}>FUNDS: <Text style={{ color: '#FFF' }}>₹ {budget} CR</Text></Text>
          <TouchableOpacity style={styles.plusBtn} activeOpacity={0.8}>
            <MaterialCommunityIcons name="plus" size={10} color="#FFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.viewBlocsBtn, { backgroundColor: COLORS.primary }]}
          activeOpacity={0.8}
          onPress={handleNextRound}
        >
          <Text style={styles.viewBlocsText}>{currentRound < totalRounds ? 'NEXT TURN' : 'DEPLOY ELECTION'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.viewBlocsBtn}
          activeOpacity={0.8}
          onPress={() => router.push('/voter-blocs')}
        >
          <Text style={[styles.viewBlocsText, { color: COLORS.primary }]}>DEMOGRAPHICS</Text>
        </TouchableOpacity>
      </View>

      {/* Telemetry Advisor Popup Modal */}
      {activeTelemetry && (
        <Modal
          transparent={true}
          visible={activeTelemetry !== null}
          animationType="fade"
          onRequestClose={() => setActiveTelemetry(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <LinearGradient colors={['#0F172A', '#060913']} style={StyleSheet.absoluteFill} />
              
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name={activeTelemetry.icon as any} size={24} color={activeTelemetry.color} style={{ marginRight: 10 }} />
                <Text style={styles.modalTitle}>{activeTelemetry.title}</Text>
              </View>

              <Text style={styles.modalDesc}>{activeTelemetry.desc}</Text>

              <View style={styles.modalAdviceBox}>
                <Text style={styles.adviceLabel}>TACTICAL RECOMMENDATION</Text>
                <Text style={styles.adviceText}>{activeTelemetry.advice}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.modalCloseBtn, { backgroundColor: activeTelemetry.color }]}
                activeOpacity={0.8}
                onPress={() => setActiveTelemetry(null)}
              >
                <Text style={styles.modalCloseText}>CLOSE INTERFACE OVERLAY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      {/* Interactive Onboarding Tutorial Overlay */}
      {showTutorial && (
        <TutorialOverlay 
          onClose={() => setShowTutorial(false)} 
          currentTriggerStep={tutorialStep}
          onStepComplete={(step) => setTutorialStep(step)}
        />
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
  statusItem: {
    alignItems: 'center',
  },
  statusLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
  statusValue: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#FFF',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginVertical: 10,
  },
  riskText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    marginLeft: 6,
    letterSpacing: 1,
  },
  trackerPanel: {
    marginHorizontal: SPACING.md,
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginBottom: 8,
  },
  trackerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  trackerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  trackerDetails: {
    fontFamily: FONTS.medium,
    fontSize: 9,
    color: COLORS.textMuted,
    marginLeft: 22,
  },
  deploymentAlert: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.success,
    marginLeft: 22,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  gameArea: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 48,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    height: '75%',
    alignSelf: 'center',
  },
  blocItem: {
    alignItems: 'center',
    gap: 2,
  },
  blocVal: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
  },
  mapWrapper: {
    width: 290,
    height: 310,
    position: 'relative',
  },
  mapImg: {
    width: '100%',
    height: '100%',
    opacity: 0.55,
  },
  regionNode: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  nodeCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 3,
  },
  nodeLabel: {
    fontFamily: FONTS.bold,
    fontSize: 6,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    letterSpacing: 0.5,
    backgroundColor: 'rgba(6,9,19,0.8)',
    paddingHorizontal: 2,
    borderRadius: 2,
  },
  characterNode: {
    position: 'absolute',
    width: 36,
    height: 36,
    zIndex: 10,
  },
  characterRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  characterImgOnMap: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  factionTag: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  actionDock: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingBottom: 14,
    justifyContent: 'space-between',
    gap: 6,
  },
  actionCard: {
    width: (width - 40 - 18) / 4,
    height: (width - 40 - 18) / 4,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  actionGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  actionText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: '#FFF',
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  actionSub: {
    fontFamily: FONTS.bold,
    fontSize: 6,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingBottom: 40,
    alignItems: 'center',
    gap: 6,
  },
  budgetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  budgetText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
    marginRight: 4,
    letterSpacing: 0.5,
  },
  plusBtn: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBlocsBtn: {
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBlocsText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: '#FFF',
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
