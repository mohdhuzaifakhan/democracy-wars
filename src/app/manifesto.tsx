import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useGameStore } from '../store/gameStore';

const PROMISES = [
  { 
    id: '1', 
    title: 'ENERGY SUBSIDY DOCKET', 
    cost: '₹ 25 CR', 
    icon: 'lightning-bolt', 
    description: 'Subsidize regional residential energy consumption costs to capture immediate lower-income voter blocs approval metrics.',
    impact: '⚡ +15% Swing Approvals • 📉 -₹25 CR State Budget'
  },
  { 
    id: '2', 
    title: 'CREATE MASS VOCATIONAL CAREERS', 
    cost: '₹ 40 CR', 
    icon: 'briefcase-check', 
    description: 'Fund localized vocational training camps and public industry pipelines to stimulate massive employment opportunities.',
    impact: '💼 +25% Youth Approvals • 📉 -₹40 CR State Budget'
  },
  { 
    id: '3', 
    title: 'FARMER CREDIT DEBT RELEASE', 
    cost: '₹ 30 CR', 
    icon: 'tractor', 
    description: 'Clear structural bank debts for agricultural operators to lock down massive loyal agrarian rural region votes.',
    impact: '🌾 +20% Farmers Approvals • 📉 -₹30 CR State Budget'
  },
  { 
    id: '4', 
    title: 'WOMEN SECURITY ACT', 
    cost: '₹ 20 CR', 
    icon: 'shield-account', 
    description: 'Establish specialized fast-track judicial courts and rapid-response safety forces across major municipal corridors.',
    impact: '🛡️ +18% Women Approvals • 📉 -₹20 CR State Budget'
  },
  { 
    id: '5', 
    title: 'HEALTH INFRASTRUCTURE REVOLUTION', 
    cost: '₹ 25 CR', 
    icon: 'hospital-building', 
    description: 'Erect high-tech regional medical dispensaries offering free diagnosis services to citizens across rural domains.',
    impact: '🏥 +15% Seniors Approvals • 📉 -₹25 CR State Budget'
  },
  { 
    id: '6', 
    title: 'TACTICAL SMART SMART CITIES', 
    cost: '₹ 25 CR', 
    icon: 'city-variant', 
    description: 'Deploy advanced grid utility monitors, high-speed regional fiber lines, and modernized transport networks.',
    impact: '🏙️ +14% Business Approvals • 📉 -₹25 CR State Budget'
  },
  { 
    id: '7', 
    title: 'STEEL BOUNDARY DEFENSE', 
    cost: '₹ 20 CR', 
    icon: 'shield-airplane', 
    description: 'Fortify sovereign aerospace surveillance corridors and secure land borders against tactical hostile incursions.',
    impact: '🛩️ +12% Nationalist Approvals • 📉 -₹20 CR State Budget'
  },
];

export default function ManifestoScreen() {
  const router = useRouter();
  const setGameSession = useGameStore((state) => state.setGameSession);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activePopup, setActivePopup] = useState<typeof PROMISES[0] | null>(null);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(i => i !== id));
    } else {
      if (selectedIds.length < 5) {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedIds.length === 5) {
      setGameSession({ selectedManifestoIds: selectedIds });
      router.push('/gameplay');
    }
  };

  const renderItem = ({ item }: { item: typeof PROMISES[0] }) => {
    const isSelected = selectedIds.includes(item.id);
    return (
      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => toggleSelection(item.id)}
        style={[styles.promiseItemWrapper, isSelected && { borderColor: COLORS.primary }]}
      >
        <LinearGradient
          colors={isSelected ? ['#E11D48', '#881337'] : ['rgba(27, 42, 74, 0.25)', 'rgba(27, 42, 74, 0.15)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.promiseItem}
        >
          <View style={styles.promiseLeft}>
            <View style={[styles.iconCircle, isSelected && { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <MaterialCommunityIcons name={item.icon as any} size={16} color={isSelected ? '#FFF' : COLORS.textMuted} />
            </View>
            <Text style={[styles.promiseTitle, isSelected && { color: '#FFF' }]} numberOfLines={1}>{item.title}</Text>
          </View>
          
          <View style={styles.promiseRight}>
            <Text style={[styles.promiseCost, isSelected && { color: '#FFF', fontFamily: FONTS.bold }]}>{item.cost}</Text>
            <TouchableOpacity 
              style={styles.infoBulb} 
              activeOpacity={0.8}
              onPress={(e) => {
                e.stopPropagation(); // Avoid triggering parent toggle selection
                setActivePopup(item);
              }}
            >
              <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color={isSelected ? '#FFF' : COLORS.primary} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TACTICAL DRAFT</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>ACTIVATE 5 STATE PLEDGES</Text>
        <Text style={styles.subtitle}>Select emblems on the checklist below. Tap the bulb to see stats.</Text>
      </View>

      <FlatList
        data={PROMISES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={styles.counterText}>
          PLEDGES ACTIVATED: <Text style={{ color: COLORS.primary }}>{selectedIds.length} / 5</Text>
        </Text>
        <TouchableOpacity 
          style={[styles.actionButtonWrapper, selectedIds.length < 5 && { opacity: 0.4 }]} 
          activeOpacity={0.8}
          onPress={handleConfirm}
          disabled={selectedIds.length < 5}
        >
          <LinearGradient colors={['#E11D48', '#881337']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>DEPLOY MANIFESTO TO MAP</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Strategic Forecast Modal Popup */}
      {activePopup && (
        <Modal
          transparent={true}
          visible={activePopup !== null}
          animationType="fade"
          onRequestClose={() => setActivePopup(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <LinearGradient colors={['#0F172A', '#060913']} style={StyleSheet.absoluteFill} />
              
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name={activePopup.icon as any} size={24} color={COLORS.primary} style={{ marginRight: 10 }} />
                <Text style={styles.modalTitle}>{activePopup.title}</Text>
              </View>

              <Text style={styles.modalDesc}>{activePopup.description}</Text>

              <View style={styles.modalImpactBox}>
                <Text style={styles.impactLabel}>TACTICAL DEPLOYMENT IMPACT</Text>
                <Text style={styles.impactVal}>{activePopup.impact}</Text>
              </View>

              <TouchableOpacity 
                style={styles.modalCloseBtn}
                activeOpacity={0.8}
                onPress={() => setActivePopup(null)}
              >
                <Text style={styles.modalCloseText}>CLOSE INTEL DOSSIER</Text>
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
  titleContainer: {
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  mainTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#FFF',
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 160,
  },
  promiseItemWrapper: {
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
  },
  promiseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 52,
  },
  promiseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  promiseTitle: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#CBD5E1',
    letterSpacing: 0.5,
    flex: 1,
  },
  promiseRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promiseCost: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.textMuted,
    marginRight: 12,
  },
  infoBulb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: SPACING.md,
    paddingBottom: 40,
    backgroundColor: COLORS.overlay,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  counterText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    marginBottom: 12,
    letterSpacing: 1,
  },
  actionButtonWrapper: {
    width: '100%',
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
  modalImpactBox: {
    backgroundColor: 'rgba(245, 158, 11, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
  },
  impactLabel: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: 6,
  },
  impactVal: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
  },
  modalCloseBtn: {
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
    letterSpacing: 1.5,
  },
});
