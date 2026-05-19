import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useGameStore } from '../store/gameStore';

const VOTER_BLOCS = [
  { 
    id: 'youth', 
    title: 'YOUTH DEMOGRAPHICS', 
    influence: '25%', 
    icon: 'account-school', 
    color: COLORS.primary,
    demands: 'Jobs Creation, Digital Infrastructure Development, Free Education Subsidies.',
    stance: 'Leaning Left / Liberal',
    tactics: 'Deploy Mega Rallies and create mass vocational career schemes to rapidly capture this bloc.'
  },
  { 
    id: 'farmers', 
    title: 'AGRARIAN COALITION', 
    influence: '20%', 
    icon: 'tractor', 
    color: COLORS.success,
    demands: 'Loan Waivers, Minimum Support Price (MSP) locks, Subsidized fertilizer inputs.',
    stance: 'Traditional / Socialist Leaning',
    tactics: 'Execute targeted Welfare card deployments specifically in Agrarian territories.'
  },
  { 
    id: 'business', 
    title: 'INDUSTRIAL TYCOONS', 
    influence: '15%', 
    icon: 'office-building', 
    color: COLORS.secondary,
    demands: 'Corporate Tax reduction, fast-track infrastructure corridors, labor deregulations.',
    stance: 'Capitalist Leaning',
    tactics: 'Maintain low scandal risk and pass Smart Cities pledges to keep business confidence high.'
  },
  { 
    id: 'women', 
    title: 'FEMININE CONSTITUENCY', 
    influence: '15%', 
    icon: 'face-woman', 
    color: '#EC4899',
    demands: 'Safety corridor task forces, structural security acts, education grants.',
    stance: 'Moderate / Balanced',
    tactics: 'Draft the Women Security Act to instantly secure support from women voter circles.'
  },
  { 
    id: 'minorities', 
    title: 'MINORITY ADVOCATES', 
    influence: '15%', 
    icon: 'account-group', 
    color: '#14B8A6',
    demands: 'Equal protection codes, cultural security nets, representation quotas.',
    stance: 'Liberal Leaning',
    tactics: 'Address minority rights during national TV debates to establish permanent swing loyalty.'
  },
  { 
    id: 'seniors', 
    title: 'VETERAN ELDERS', 
    influence: '10%', 
    icon: 'account-star', 
    color: '#64748B',
    demands: 'State pension indexations, free regional medical clinics, security nets.',
    stance: 'Traditional Leaning',
    tactics: 'Commit to Health Infrastructure revolution pledges to cement veteran elder voters.'
  },
];

export default function VoterBlocsScreen() {
  const router = useRouter();
  const { blocApproval } = useGameStore();
  const [activeDossier, setActiveDossier] = useState<typeof VOTER_BLOCS[0] | null>(null);

  const renderBloc = ({ item }: { item: typeof VOTER_BLOCS[0] }) => {
    const approvalVal = blocApproval[item.id as keyof typeof blocApproval] || 50;
    
    return (
      <View style={styles.blocItem}>
        <View style={[styles.iconCircle, { backgroundColor: item.color + '15', borderColor: item.color + '30' }]}>
          <MaterialCommunityIcons name={item.icon as any} size={20} color={item.color} />
        </View>
        <View style={styles.blocInfo}>
          <View style={styles.blocHeader}>
            <Text style={styles.blocTitle}>{item.title}</Text>
            <View style={[styles.influenceBadge, { backgroundColor: item.color + '15' }]}>
              <Text style={[styles.influenceText, { color: item.color }]}>{item.influence} INFLUENCE</Text>
            </View>
          </View>

          {/* Glowing approvals progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.trackBackground}>
              <View style={[styles.trackFill, { width: `${approvalVal}%`, backgroundColor: item.color }]} />
            </View>
            <Text style={[styles.approvalLabel, { color: item.color }]}>{approvalVal}% APPROVED</Text>
          </View>
        </View>

        {/* Tactical Info Bulb */}
        <TouchableOpacity 
          style={[styles.infoBulb, { borderColor: item.color + '30' }]} 
          activeOpacity={0.8}
          onPress={() => setActiveDossier(item)}
        >
          <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color={item.color} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>DOSSIER BLOCS</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.listWrapper}>
        <FlatList
          data={VOTER_BLOCS}
          keyExtractor={(item) => item.id}
          renderItem={renderBloc}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={styles.tutorialHeaderBox}>
              <MaterialCommunityIcons name="heart-flash" size={18} color={COLORS.primary} style={{ marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.tutorialHeaderTitle}>HOW TO SECURE VOTES</Text>
                <Text style={styles.tutorialHeaderDesc}>
                  Voter Blocs represent active citizen circles. Play their favorite command cards to win support! Tap any lightbulb to reveal exactly what cards they want.
                </Text>
              </View>
            </View>
          )}
        />

        <View style={styles.footerBox}>
          <View style={styles.pulseIndicator}>
            <View style={styles.pulseDot} />
            <Text style={styles.swingTitle}>SWING VOLATILITY: 10%</Text>
          </View>
          <Text style={styles.swingDesc}>Voter allocation shifts dynamically based on card plays and debate answers.</Text>
        </View>
      </View>

      {/* Demographic Dossier Modal Popup */}
      {activeDossier && (
        <Modal
          transparent={true}
          visible={activeDossier !== null}
          animationType="fade"
          onRequestClose={() => setActiveDossier(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <LinearGradient colors={['#0F172A', '#060913']} style={StyleSheet.absoluteFill} />
              
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name={activeDossier.icon as any} size={24} color={activeDossier.color} style={{ marginRight: 10 }} />
                <Text style={styles.modalTitle}>{activeDossier.title}</Text>
              </View>

              <View style={styles.modalItem}>
                <Text style={styles.modalLabel}>STATE LEGISLATIVE DEMANDS</Text>
                <Text style={styles.modalVal}>{activeDossier.demands}</Text>
              </View>

              <View style={styles.modalItem}>
                <Text style={styles.modalLabel}>TACTICAL POLITICAL STANCE</Text>
                <Text style={[styles.modalVal, { color: activeDossier.color }]}>{activeDossier.stance}</Text>
              </View>

              <View style={styles.modalAdviceBox}>
                <Text style={styles.adviceLabel}>ADVOCATE ADVISORY TIPS</Text>
                <Text style={styles.adviceText}>{activeDossier.tactics}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.modalCloseBtn, { backgroundColor: activeDossier.color }]}
                activeOpacity={0.8}
                onPress={() => setActiveDossier(null)}
              >
                <Text style={styles.modalCloseText}>DISMISS INTEL REPORT</Text>
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
  listWrapper: {
    flex: 1,
    marginHorizontal: SPACING.md,
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    marginTop: 16,
    marginBottom: 40,
  },
  listContent: {
    paddingBottom: 10,
  },
  blocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  blocInfo: {
    flex: 1,
    marginRight: 10,
  },
  blocHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  blocTitle: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  influenceBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  influenceText: {
    fontFamily: FONTS.bold,
    fontSize: 7,
    letterSpacing: 0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackBackground: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 8,
  },
  trackFill: {
    height: '100%',
    borderRadius: 3,
  },
  approvalLabel: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    width: 72,
    textAlign: 'right',
  },
  infoBulb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  footerBox: {
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  pulseIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: 6,
  },
  swingTitle: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  swingDesc: {
    fontFamily: FONTS.medium,
    fontSize: 9,
    color: COLORS.textMuted,
    lineHeight: 14,
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
  modalItem: {
    marginBottom: 14,
  },
  modalLabel: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.textMuted,
    letterSpacing: 1,
    marginBottom: 4,
  },
  modalVal: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#E2E8F0',
    lineHeight: 15,
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
  tutorialHeaderBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(245, 158, 11, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  tutorialHeaderTitle: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  tutorialHeaderDesc: {
    fontFamily: FONTS.medium,
    fontSize: 8.5,
    color: COLORS.textMuted,
    lineHeight: 12,
    marginTop: 2,
  },
});
