import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

import { useGameStore } from '../store/gameStore';
import { PARTIES, CANDIDATE_AVATARS } from '../constants/dummyData';

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

  // Calculate Average Approval for the gauge
  const avgApproval = Math.round(
    (blocApproval.youth + blocApproval.farmers + blocApproval.business + 
     blocApproval.women + blocApproval.minorities + blocApproval.seniors) / 6
  );

  const handleNextRound = () => {
    if (currentRound < totalRounds) {
      nextRound();
    } else {
      router.push('/election-day');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      {/* Top Status Bar */}
      <View style={styles.header}>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>ROUND</Text>
          <Text style={styles.statusValue}>{currentRound}/{totalRounds}</Text>
        </View>

        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>BUDGET</Text>
          <Text style={styles.statusValue}>₹ {budget}Cr</Text>
        </View>

        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>AVG APPROVAL</Text>
          <Text style={styles.statusValue}>{avgApproval}%</Text>
        </View>

        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>TRUST</Text>
          <Text style={styles.statusValue}>{trustScore}</Text>
        </View>
      </View>

      {/* Corruption Meter Indicator */}
      <View style={styles.riskBadge}>
        <MaterialCommunityIcons name="alert" size={14} color={corruptionRisk > 50 ? '#EF4444' : '#FACC15'} />
        <Text style={[styles.riskText, { color: corruptionRisk > 50 ? '#EF4444' : '#FACC15' }]}>
          SCANDAL RISK: {corruptionRisk}%
        </Text>
      </View>

      {/* Candidate Profile Area */}
      <View style={styles.profileDock}>
        <View style={styles.candidateCard}>
          <View style={[styles.partyLine, { backgroundColor: party.color }]} />
          <Image source={{ uri: avatar }} style={styles.candidateImg} />
          <View style={styles.roundInfo}>
            <Text style={styles.roundText}>ROUND {currentRound}/{totalRounds}</Text>
            <Text style={styles.campaignName}>{party.name} Campaign</Text>
          </View>
        </View>
      </View>

      {/* Main Game Area */}
      <View style={styles.gameArea}>
        {/* Sidebar: Bloc Approval Quick View */}
        <View style={styles.sidebar}>
          <View style={styles.blocItem}>
            <MaterialCommunityIcons name="account-school" size={16} color="#3B82F6" />
            <Text style={styles.blocVal}>{blocApproval.youth}%</Text>
          </View>
          <View style={styles.blocItem}>
            <MaterialCommunityIcons name="tractor" size={16} color="#10B981" />
            <Text style={styles.blocVal}>{blocApproval.farmers}%</Text>
          </View>
          <View style={styles.blocItem}>
            <MaterialCommunityIcons name="briefcase-outline" size={16} color="#FACC15" />
            <Text style={styles.blocVal}>{blocApproval.business}%</Text>
          </View>
          <View style={styles.blocItem}>
            <MaterialCommunityIcons name="face-woman-outline" size={16} color="#EC4899" />
            <Text style={styles.blocVal}>{blocApproval.women}%</Text>
          </View>
        </View>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <Image 
            source={require('../../assets/images/india_map.png')}
            style={styles.mapImg}
            contentFit="contain"
          />
        </View>
      </View>

      {/* Action Buttons Dock */}
      <View style={styles.actionDock}>
        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => applyAction('rally')}>
          <LinearGradient colors={['#B91C1C', '#7F1D1D']} style={styles.actionGradient}>
            <MaterialCommunityIcons name="microphone-variant" size={28} color="#FFF" />
            <Text style={styles.actionText}>RALLY</Text>
            <Text style={styles.actionSub}>+10% Youth</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => applyAction('scheme')}>
          <LinearGradient colors={['#15803D', '#064E3B']} style={styles.actionGradient}>
            <MaterialCommunityIcons name="tractor" size={28} color="#FFF" />
            <Text style={styles.actionText}>SCHEME</Text>
            <Text style={styles.actionSub}>+15% Farmers</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => applyAction('expose')}>
          <LinearGradient colors={['#6D28D9', '#4C1D95']} style={styles.actionGradient}>
            <MaterialCommunityIcons name="target" size={28} color="#FFF" />
            <Text style={styles.actionText}>EXPOSE</Text>
            <Text style={styles.actionSub}>Rival -15%</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} activeOpacity={0.8} onPress={() => applyAction('fake_news')}>
          <LinearGradient colors={['#475569', '#1E293B']} style={styles.actionGradient}>
            <MaterialCommunityIcons name="newspaper-variant-outline" size={28} color="#FFF" />
            <Text style={styles.actionText}>DISRUPT</Text>
            <Text style={styles.actionSub}>Mass Chaos</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Footer Bar */}
      <View style={styles.footer}>
        <View style={styles.budgetBox}>
          <Text style={styles.budgetText}>Budget: <Text style={{ color: '#FFF' }}>₹ 275 Cr</Text></Text>
          <TouchableOpacity style={styles.plusBtn}>
            <MaterialCommunityIcons name="plus" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.viewBlocsBtn, { backgroundColor: '#B91C1C' }]}
          onPress={handleNextRound}
        >
          <Text style={styles.viewBlocsText}>{currentRound < totalRounds ? 'Next Round' : 'Finish Campaign'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.viewBlocsBtn}
          onPress={() => router.push('/voter-blocs')}
        >
          <Text style={styles.viewBlocsText}>View Blocs</Text>
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
  sidebar: {
    width: 60,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  blocItem: {
    alignItems: 'center',
    gap: 4,
  },
  blocVal: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: '#94A3B8',
    letterSpacing: 1,
  },
  statusValue: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#F8FAFC',
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  riskText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    marginLeft: 6,
    letterSpacing: 1,
  },
  profileDock: {
    paddingHorizontal: SPACING.lg,
    marginBottom: 10,
  },
  candidateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  partyLine: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
  },
  candidateImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  mapImg: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  actionDock: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - SPACING.md * 2 - 24) / 4,
    height: (width - SPACING.md * 2 - 24) / 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  actionText: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: '#FFF',
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: 40,
    alignItems: 'center',
  },
  budgetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  budgetText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#94A3B8',
    marginRight: 8,
  },
  plusBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBlocsBtn: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  viewBlocsText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#F8FAFC',
  },
});
