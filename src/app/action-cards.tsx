import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CARDS = [
  { 
    id: '1', 
    title: 'MEGA CAMPAIGN RALLY', 
    desc: 'Accelerates massive poll approval ratings in up to three major regional sectors.', 
    cost: '₹ 50 CR', 
    type: 'SUPPORT', 
    color: ['#10B981', '#064E3B'], 
    icon: 'bullhorn-variant',
    forecast: '⚡ +12% Approvals in North & West Provinces • 📈 +10% popular trust.'
  },
  { 
    id: '2', 
    title: 'BROADCAST AD CAMPAIGN', 
    desc: 'Funnels active promotions targeting key conservative or liberal demographics.', 
    cost: '₹ 40 CR', 
    type: 'SUPPORT', 
    color: ['#8B5CF6', '#4C1D95'], 
    icon: 'television-play',
    forecast: '⚡ +15% Approvals in Central Province • +8% Youth alignment.'
  },
  { 
    id: '3', 
    title: 'EXPOSE OPPONENT LEAKS', 
    desc: 'Triggers scandal risk checks, depleting opponent organic trust metrics.', 
    cost: '₹ 30 CR', 
    type: 'ATTACK', 
    color: ['#E11D48', '#881337'], 
    icon: 'account-search',
    forecast: '⚡ -15% Opposition approvals in Central & East • ⚠️ Adds +15% Scandal Risk.'
  },
  { 
    id: '4', 
    title: 'UNIVERSAL SUBSIDY SCHEME', 
    desc: 'Guarantees immediate positive alignment within agrarian and youth blocs.', 
    cost: '₹ 60 CR', 
    type: 'SUPPORT', 
    color: ['#2563EB', '#1E40AF'], 
    icon: 'hand-heart',
    forecast: '⚡ +18% Approvals in South Province • +12% Farmers support.'
  },
];

export default function ActionCardsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('ALL');
  const [activeCard, setActiveCard] = useState<typeof CARDS[0] | null>(null);

  const filteredCards = CARDS.filter(card => {
    if (activeTab === 'ALL') return true;
    return card.type === activeTab;
  });

  const renderCard = ({ item }: { item: typeof CARDS[0] }) => (
    <View style={styles.cardWrapper}>
      <LinearGradient colors={item.color as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.5 }} style={styles.cardGradient}>
        <View style={styles.cardLeft}>
          <View style={styles.cardIconBox}>
             <MaterialCommunityIcons name={item.icon as any} size={20} color="#FFF" />
          </View>
          <View style={styles.cardInfo}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>{item.type}</Text>
              </View>
            </View>
            <Text style={styles.cardCost}>ALLOCATION: {item.cost}</Text>
          </View>

          {/* Gold Bulb trigger */}
          <TouchableOpacity 
            style={styles.cardInfoBulb} 
            activeOpacity={0.8}
            onPress={() => setActiveCard(item)}
          >
            <MaterialCommunityIcons name="lightbulb-on-outline" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TACTICAL CARDS</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Modern Tabs */}
      <View style={styles.tabsContainer}>
        {['ALL', 'ATTACK', 'SUPPORT'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            activeOpacity={0.8}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer Play Interaction Panel */}
      <View style={styles.footer}>
        <View style={styles.dragZone}>
          <View style={styles.starCircle}>
            <MaterialCommunityIcons name="gesture-double-tap" size={16} color={COLORS.primary} />
          </View>
          <Text style={styles.dragText}>TAP BULB TO INSPECT STRATEGY</Text>
        </View>
      </View>

      {/* Tactical Forecast Modal Popup */}
      {activeCard && (
        <Modal
          transparent={true}
          visible={activeCard !== null}
          animationType="fade"
          onRequestClose={() => setActiveCard(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <LinearGradient colors={['#0F172A', '#060913']} style={StyleSheet.absoluteFill} />
              
              <View style={styles.modalHeader}>
                <MaterialCommunityIcons name={activeCard.icon as any} size={24} color={activeCard.color[0]} style={{ marginRight: 10 }} />
                <Text style={styles.modalTitle}>{activeCard.title}</Text>
              </View>

              <Text style={styles.modalDesc}>{activeCard.desc}</Text>

              <View style={styles.modalAdviceBox}>
                <Text style={styles.adviceLabel}>TACTICAL TARGET FORECAST</Text>
                <Text style={styles.adviceText}>{activeCard.forecast}</Text>
              </View>

              <TouchableOpacity 
                style={[styles.modalCloseBtn, { backgroundColor: activeCard.color[0] }]}
                activeOpacity={0.8}
                onPress={() => setActiveCard(null)}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    marginHorizontal: SPACING.md,
    borderRadius: 12,
    marginVertical: SPACING.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: 'rgba(31, 41, 55, 0.7)',
  },
  tabText: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: 150,
  },
  cardWrapper: {
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  cardGradient: {
    padding: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
    marginRight: 10,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  typeBadge: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeBadgeText: {
    fontFamily: FONTS.bold,
    fontSize: 6,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  cardCost: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  cardInfoBulb: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
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
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  dragZone: {
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(14, 23, 38, 0.6)',
    borderWidth: 1.5,
    borderColor: COLORS.surfaceBorder,
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  dragText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
    letterSpacing: 1,
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
