import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface TutorialOverlayProps {
  onClose: () => void;
  onStepComplete?: (step: number) => void;
  currentTriggerStep?: number;
}

const TUTORIAL_STEPS = [
  {
    step: 0,
    title: 'WELCOME PROTOCOL INDEX',
    message: "Greetings, Campaign Chief! I am Chanakya, your tactical campaign director. Let's learn how to dominate the election board in 3 easy steps!",
    targetText: 'Core Metrics Telemetry HUD',
    buttonText: 'BEGIN TRAINING SCHEME',
    icon: 'account-tie-voice',
    // Spotlight highlights top status HUD
    spotlight: { x: 0, y: 50, w: width, h: 70, radius: 0 }
  },
  {
    step: 1,
    title: 'STEP 1: POSITION CANDIDATE',
    message: "Press any target node on the 2D board map. Let's move our candidate directly to the CENTRAL PROVINCE to set up our outpost!",
    targetText: 'Constrained Maps Nodes Grid',
    buttonText: 'GLIDE REPRESENTATIVE NOW',
    icon: 'map-marker-distance',
    // Spotlight highlights map center
    spotlight: { x: width / 2 - 40, y: height / 2 - 90, w: 80, h: 80, radius: 40 }
  },
  {
    step: 2,
    title: 'STEP 2: DEPLOY COMMAND CARDS',
    message: "Fantastic glide! Now tap the 'MEGA RALLY' action card from your dock at the bottom to boost your voter approvals instantly!",
    targetText: 'Tactical command Deck',
    buttonText: 'LAUNCH MEGA RALLY ACTION',
    icon: 'bullhorn-variant',
    // Spotlight highlights first command card
    spotlight: { x: 20, y: height - 190, w: width / 4, h: width / 4, radius: 12 }
  },
  {
    step: 3,
    title: 'STEP 3: ADVANCE TURNS',
    message: "Spectacular deployment! Rallies utilize your War Funding but boost regional swing scores. Tap 'NEXT TURN' to run the simulation!",
    targetText: 'Turn Progress console',
    buttonText: 'SIMULATE CAMPAIGN TURN',
    icon: 'reload',
    // Spotlight highlights next turn button
    spotlight: { x: width / 2 - 70, y: height - 76, w: 140, h: 42, radius: 10 }
  }
];

export default function TutorialOverlay({ onClose, onStepComplete, currentTriggerStep = 0 }: TutorialOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);
  
  // Staggered mascot dialog slide
  const slideAnim = useRef(new Animated.Value(60)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // If the parent screen forces a step increment (e.g. they moved, or played card), sync it
    if (currentTriggerStep !== undefined && currentTriggerStep !== stepIndex) {
      setStepIndex(currentTriggerStep);
    }
  }, [currentTriggerStep]);

  useEffect(() => {
    // Refresh animations on step change
    slideAnim.setValue(60);
    fadeAnim.setValue(0);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Spotlight focus breathing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1.0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [stepIndex]);

  const handleNext = () => {
    if (stepIndex < TUTORIAL_STEPS.length - 1) {
      const nextS = stepIndex + 1;
      setStepIndex(nextS);
      if (onStepComplete) onStepComplete(nextS);
    } else {
      onClose();
    }
  };

  const activeStep = TUTORIAL_STEPS[stepIndex];
  const { spotlight } = activeStep;

  return (
    <View style={styles.overlayContainer} pointerEvents="box-none">
      {/* Absolute Darkened Mask Background */}
      <View style={styles.darkMask} />

      {/* Dynamic Focal Spotlight Spotlight Hole */}
      <Animated.View 
        style={[
          styles.spotlightHole,
          {
            left: spotlight.x,
            top: spotlight.y,
            width: spotlight.w,
            height: spotlight.h,
            borderRadius: spotlight.radius,
            transform: [{ scale: pulseAnim }]
          }
        ]}
      />

      {/* Mascot Dialog Box Card */}
      <Animated.View style={[styles.dialogCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <LinearGradient colors={['#0F172A', '#090F1E']} style={StyleSheet.absoluteFill} />
        
        <View style={styles.cardHeader}>
          <View style={styles.mascotBadge}>
            <MaterialCommunityIcons name={activeStep.icon as any} size={20} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleText}>{activeStep.title}</Text>
            <Text style={styles.targetIndicator}>FOCUS TARGET: {activeStep.targetText.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.messageText}>{activeStep.message}</Text>

        <TouchableOpacity 
          style={styles.actionBtn} 
          activeOpacity={0.8}
          onPress={handleNext}
        >
          <LinearGradient colors={['#E11D48', '#881337']} style={styles.btnGradient}>
            <Text style={styles.btnText}>{activeStep.buttonText}</Text>
            <MaterialCommunityIcons name="chevron-double-right" size={14} color="#FFF" style={{ marginLeft: 6 }} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 110,
  },
  darkMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6, 9, 19, 0.75)',
  },
  spotlightHole: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  dialogCard: {
    width: width - 32,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    padding: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  mascotBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(245,158,11,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.2)',
  },
  titleText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 1,
  },
  targetIndicator: {
    fontFamily: FONTS.bold,
    fontSize: 7,
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  messageText: {
    fontFamily: FONTS.medium,
    fontSize: 10.5,
    color: COLORS.textMuted,
    lineHeight: 16,
    marginBottom: 14,
  },
  actionBtn: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  btnGradient: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  btnText: {
    fontFamily: FONTS.bold,
    fontSize: 9.5,
    color: '#FFF',
    letterSpacing: 1,
  },
});
