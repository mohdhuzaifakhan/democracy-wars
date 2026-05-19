import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';
import { PARTIES, CANDIDATE_AVATARS } from '../constants/dummyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useGameStore } from '../store/gameStore';

const { width } = Dimensions.get('window');

export default function CandidateSelectionScreen() {
  const router = useRouter();
  const setGameSession = useGameStore((state) => state.setGameSession);
  const [currentStep, setCurrentStep] = useState(0); // 0: Candidate, 1: Party, 2: Ideology
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
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SET UP YOUR CANDIDATE</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.stepperContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep > 0 ? styles.stepCompleted : styles.stepActive]}>
            {currentStep > 0 ? (
              <MaterialCommunityIcons name="check" size={14} color="#FFF" />
            ) : (
              <Text style={styles.stepNumber}>1</Text>
            )}
          </View>
          <Text style={[styles.stepLabel, currentStep >= 0 && styles.activeStepLabel]}>Candidate</Text>
        </View>
        
        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep === 1 ? styles.stepActive : (currentStep > 1 ? styles.stepCompleted : styles.stepInactive)]}>
             {currentStep > 1 ? (
               <MaterialCommunityIcons name="check" size={14} color="#FFF" />
             ) : (
               <Text style={styles.stepNumber}>2</Text>
             )}
          </View>
          <Text style={[styles.stepLabel, currentStep >= 1 && styles.activeStepLabel]}>Party</Text>
        </View>

        <View style={styles.stepLine} />

        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep === 2 ? styles.stepActive : styles.stepInactive]}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={[styles.stepLabel, currentStep === 2 && styles.activeStepLabel]}>Ideology</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {currentStep === 0 && renderAvatarStep()}
        {currentStep === 1 && renderPartyStep()}
        {currentStep === 2 && renderIdeologyStep()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButtonWrapper} activeOpacity={0.8} onPress={handleNext}>
          <LinearGradient colors={['#D97706', '#92400E']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>
              {currentStep === 2 ? 'CONFIRM & PROCEED' : 'CONTINUE'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  function renderAvatarStep() {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={styles.sectionLabel}>CHOOSE YOUR AVATAR</Text>
        <View style={styles.avatarGrid}>
          {CANDIDATE_AVATARS.map((avatar, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => setSelectedAvatar(index)}
              style={[styles.avatarCard, selectedAvatar === index && styles.selectedAvatarCard]}
            >
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
              {selectedAvatar === index && (
                <View style={styles.checkBadge}>
                  <MaterialCommunityIcons name="check-circle" size={20} color="#FACC15" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function renderPartyStep() {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={styles.sectionLabel}>CHOOSE YOUR PARTY</Text>
        <View style={styles.partyGrid}>
          {PARTIES.map((party) => (
            <TouchableOpacity 
              key={party.id}
              activeOpacity={0.8}
              onPress={() => setSelectedParty(party.id)}
              style={[
                styles.partyCard, 
                { backgroundColor: party.color + '15' }, 
                selectedParty === party.id && { borderColor: party.color, borderWidth: 2 }
              ]}
            >
              <View style={[styles.partyIconContainer, { backgroundColor: party.color }]}>
                <MaterialCommunityIcons name={party.icon as any} size={40} color="#FFF" />
              </View>
              <Text style={styles.partyNameText}>{party.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function renderIdeologyStep() {
    const axes = [
      { key: 'economy', label: 'Economy', left: 'Socialist', right: 'Capitalist' },
      { key: 'social', label: 'Social', left: 'Liberal', right: 'Traditional' },
      { key: 'diplomacy', label: 'Diplomacy', left: 'Neutral', right: 'Aggressive' },
    ];

    return (
      <View style={styles.ideologyContainer}>
        <Text style={styles.sectionLabel}>YOUR POLITICAL STANCE</Text>
        <View style={styles.sectionBox}>
          {axes.map((axis) => {
            const val = ideology[axis.key as keyof typeof ideology];
            return (
              <View key={axis.key} style={styles.sliderRow}>
                <Text style={styles.sliderMainLabel}>{axis.label}</Text>
                <View style={styles.sliderWrapper}>
                  <View style={styles.sliderEndpoints}>
                    <Text style={[styles.endpointTextBlue, val <= 30 && { opacity: 1 }]}>{axis.left}</Text>
                    <Text style={[styles.endpointTextRed, val >= 70 && { opacity: 1 }]}>{axis.right}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.trackContainer}
                    activeOpacity={1}
                    onPress={(e) => {
                      // Simulated slider tap
                      const newX = e.nativeEvent.locationX;
                      const percentage = Math.round((newX / 200) * 100);
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
          <MaterialCommunityIcons name="information-outline" size={16} color="#94A3B8" />
          <Text style={styles.infoText}>Your ideology affects how different voter blocs perceive your actions.</Text>
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
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  stepActive: {
    backgroundColor: '#FACC15',
  },
  stepCompleted: {
    backgroundColor: '#22C55E',
  },
  stepInactive: {
    backgroundColor: 'rgba(148, 163, 184, 0.3)',
  },
  stepNumber: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
  },
  stepLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#94A3B8',
  },
  activeStepLabel: {
    color: '#F8FAFC',
  },
  stepLine: {
    width: 20,
    height: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    marginHorizontal: 12,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 150,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginBottom: SPACING.lg,
    opacity: 0, // Hidden as per mockup 6
    height: 0,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatarCard: {
    width: (width - SPACING.lg * 2 - 20) / 2,
    height: 160,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  selectedAvatarCard: {
    borderColor: '#FACC15',
    backgroundColor: 'rgba(250, 204, 21, 0.1)',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  partyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  partyCard: {
    width: (width - SPACING.lg * 2 - 20) / 2,
    height: 160,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  partyIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  partyNameText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#F8FAFC',
    textAlign: 'center',
  },
  ideologyContainer: {
    marginTop: 10,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  infoText: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: '#94A3B8',
    marginLeft: 8,
    flex: 1,
  },
  ideologyAvatarContainer: {
    marginTop: SPACING.md,
  },
  sectionBox: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#F8FAFC',
    letterSpacing: 1,
    marginBottom: 20,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  sliderMainLabel: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#CBD5E1',
    width: 80,
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
    fontSize: 12,
    color: '#3B82F6',
  },
  endpointTextRed: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#EF4444',
  },
  trackContainer: {
    height: 4,
    flexDirection: 'row',
    borderRadius: 2,
    overflow: 'visible',
    alignItems: 'center',
  },
  trackBlue: {
    flex: 1,
    height: '100%',
    backgroundColor: '#3B82F6',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  trackRed: {
    flex: 1,
    height: '100%',
    backgroundColor: '#EF4444',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginLeft: -9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarSection: {
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  avatarRow: {
    paddingVertical: 5,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 15,
    overflow: 'hidden',
  },
  selectedAvatarCircle: {
    borderColor: '#FACC15',
    borderWidth: 3,
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: SPACING.lg,
    paddingBottom: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
  },
  actionButtonWrapper: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#FFF',
    letterSpacing: 2,
  },
});
