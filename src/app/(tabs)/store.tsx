import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

const PARTIES = [
  { id: '1', name: 'Rashtriya Vikas Party', price: 500, color: '#991B1B', icon: 'trending-up' },
  { id: '2', name: 'Desh Ekta Party', price: 500, color: '#15803D', icon: 'star-circle' },
  { id: '3', name: 'Yuva Kranti Party', price: 500, color: '#6D28D9', icon: 'flash' },
  { id: '4', name: 'Bharat Shakti Party', price: 500, color: '#1E40AF', icon: 'shield-star' },
];

export default function StoreScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('PARTIES');

  const renderParty = ({ item }: { item: typeof PARTIES[0] }) => (
    <View style={styles.storeCard}>
      <View style={[styles.cardIconBox, { backgroundColor: item.color }]}>
        <MaterialCommunityIcons name={item.icon as any} size={32} color="#FFF" />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>Unlock New Party</Text>
      </View>
      <TouchableOpacity style={styles.buyBtn}>
        <MaterialCommunityIcons name="circle-multiple" size={16} color="#FACC15" />
        <Text style={styles.buyText}>{item.price}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <View style={{ width: 32 }} />
        <Text style={styles.headerTitle}>STORE SCREEN</Text>
        <View style={styles.currencyRow}>
          <View style={styles.currencyItem}>
            <MaterialCommunityIcons name="circle-multiple" size={14} color="#FACC15" />
            <Text style={styles.currencyValue}>12,450</Text>
          </View>
          <View style={styles.currencyItem}>
             <MaterialCommunityIcons name="diamond-stone" size={14} color="#3B82F6" />
             <Text style={styles.currencyValue}>1,250</Text>
          </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        {['PARTIES', 'AVATARS', 'ITEMS'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
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
  },
  headerTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 1,
  },
  currencyRow: {
    flexDirection: 'row',
    gap: 8,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  currencyValue: {
    fontFamily: FONTS.bold,
    fontSize: 10,
    color: '#FFF',
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    marginHorizontal: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#991B1B',
  },
  tabText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#94A3B8',
  },
  activeTabText: {
    color: '#FFF',
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 40,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardIconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#F8FAFC',
  },
  cardSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  buyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  buyText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
    marginLeft: 6,
  },
});
