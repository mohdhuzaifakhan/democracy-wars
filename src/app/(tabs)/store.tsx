import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';

const PARTIES = [
  { id: '1', name: 'RASHTRIYA VIKAS PARTY', price: 500, color: COLORS.secondary, icon: 'trending-up' },
  { id: '2', name: 'DESH EKTA PARTY', price: 500, color: COLORS.success, icon: 'star-circle' },
  { id: '3', name: 'YUVA KRANTI PARTY', price: 500, color: COLORS.purple, icon: 'flash' },
  { id: '4', name: 'BHARAT SHAKTI PARTY', price: 500, color: COLORS.danger, icon: 'shield-star' },
];

export default function StoreScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('PARTIES');

  const renderParty = ({ item }: { item: typeof PARTIES[0] }) => (
    <View style={styles.storeCard}>
      <View style={[styles.cardIconBox, { backgroundColor: item.color }]}>
        <MaterialCommunityIcons name={item.icon as any} size={28} color="#FFF" />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>Unlock tactical political faction</Text>
      </View>
      <TouchableOpacity style={styles.buyBtn} activeOpacity={0.8}>
        <MaterialCommunityIcons name="circle-multiple" size={14} color={COLORS.primary} />
        <Text style={styles.buyText}>{item.price}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <View style={{ width: 32 }} />
        <Text style={styles.headerTitle}>SUPPLY DEPOT</Text>
        <View style={styles.currencyRow}>
          <View style={styles.currencyItem}>
            <MaterialCommunityIcons name="circle-multiple" size={12} color={COLORS.primary} />
            <Text style={styles.currencyValue}>12.4K</Text>
          </View>
          <View style={styles.currencyItem}>
             <MaterialCommunityIcons name="diamond" size={12} color="#38BDF8" />
             <Text style={styles.currencyValue}>1.2K</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        {['PARTIES', 'AVATARS', 'TACTICS'].map((tab) => (
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
        data={PARTIES}
        keyExtractor={(item) => item.id}
        renderItem={renderParty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 20,
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
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
    letterSpacing: 1.5,
  },
  currencyRow: {
    flexDirection: 'row',
    gap: 6,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  currencyValue: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: '#FFF',
    marginLeft: 4,
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
    paddingBottom: 100,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  cardIconBox: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  buyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  buyText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    marginLeft: 4,
  },
});
