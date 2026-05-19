import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CARDS = [
  { id: '1', title: 'Mega Rally', desc: 'Boost approval in 3 states', cost: '₹ 50 Cr', type: 'support', color: ['#15803D', '#064E3B'], icon: 'bullhorn-variant' },
  { id: '2', title: 'Ad Campaign', desc: 'Increase popularity in target voter bloc', cost: '₹ 40 Cr', type: 'support', color: ['#6D28D9', '#4C1D95'], icon: 'television-play' },
  { id: '3', title: 'Expose Rival', desc: 'Reduce opponent approval', cost: '₹ 30 Cr', type: 'attack', color: ['#B91C1C', '#7F1D1D'], icon: 'account-search' },
  { id: '4', title: 'Welfare Scheme', desc: 'Improve approval among one voter bloc', cost: '₹ 60 Cr', type: 'support', color: ['#1E40AF', '#1E3A8A'], icon: 'hand-heart' },
];

export default function ActionCardsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('ALL');

  const renderCard = ({ item }: { item: typeof CARDS[0] }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.cardWrapper}>
      <LinearGradient colors={item.color} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.5 }} style={styles.cardGradient}>
        <View style={styles.cardLeft}>
          <View style={styles.cardIconBox}>
             <MaterialCommunityIcons name={item.icon as any} size={28} color="#FFF" />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
            <Text style={styles.cardCost}>Cost: {item.cost}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ACTION CARDS</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {['ALL', 'ATTACK', 'SUPPORT', 'SPECIAL'].map((tab) => (
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
        data={CARDS}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Footer Interaction */}
      <View style={styles.footer}>
        <View style={styles.dragZone}>
          <View style={styles.starCircle}>
            <MaterialCommunityIcons name="star-face" size={24} color="#FFF" />
          </View>
          <Text style={styles.dragText}>DRAG A CARD TO PLAY</Text>
        </View>
      </View>
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    marginHorizontal: SPACING.lg,
    borderRadius: 12,
    marginBottom: SPACING.lg,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#B91C1C',
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
    paddingBottom: 150,
  },
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardGradient: {
    padding: 16,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFF',
  },
  cardDesc: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  cardCost: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FACC15',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: SPACING.lg,
    paddingBottom: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
  },
  dragZone: {
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  dragText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#94A3B8',
    letterSpacing: 1,
  },
});
