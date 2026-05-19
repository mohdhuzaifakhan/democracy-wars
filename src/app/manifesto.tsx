import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const PROMISES = [
  { id: '1', title: 'Free Electricity', cost: '₹ 25 Cr', icon: 'lightning-bolt' },
  { id: '2', title: 'Create 2 Crore Jobs', cost: '₹ 40 Cr', icon: 'briefcase-check' },
  { id: '3', title: 'Loan Waiver for Farmers', cost: '₹ 30 Cr', icon: 'tractor' },
  { id: '4', title: 'Women Safety Act', cost: '₹ 20 Cr', icon: 'shield-account' },
  { id: '5', title: 'Better Healthcare', cost: '₹ 25 Cr', icon: 'hospital-building' },
  { id: '6', title: 'Develop Smart Cities', cost: '₹ 25 Cr', icon: 'city-variant' },
  { id: '7', title: 'Strengthen Borders', cost: '₹ 20 Cr', icon: 'shield-airplane' },
];

import { useGameStore } from '../store/gameStore';

export default function ManifestoScreen() {
  const router = useRouter();
  const setGameSession = useGameStore((state) => state.setGameSession);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
        style={styles.promiseItemWrapper}
      >
        <LinearGradient
          colors={isSelected ? ['#B91C1C', '#7F1D1D'] : ['#1E293B', '#0F172A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.promiseItem}
        >
          <View style={styles.promiseLeft}>
            <View style={[styles.iconCircle, isSelected && { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
              <MaterialCommunityIcons name={item.icon as any} size={20} color={isSelected ? '#FFF' : '#94A3B8'} />
            </View>
            <Text style={[styles.promiseTitle, isSelected && { color: '#FFF' }]}>{item.title}</Text>
          </View>
          <Text style={[styles.promiseCost, isSelected && { color: '#FACC15' }]}>Cost: {item.cost}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MANIFESTO PHASE</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>PICK YOUR 5 PROMISES</Text>
        <Text style={styles.subtitle}>You can select 5 promises for your manifesto</Text>
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
          Selected: <Text style={{ color: '#FACC15' }}>{selectedIds.length}/5</Text>
        </Text>
        <TouchableOpacity 
          style={[styles.actionButtonWrapper, selectedIds.length < 5 && { opacity: 0.5 }]} 
          activeOpacity={0.8}
          onPress={handleConfirm}
          disabled={selectedIds.length < 5}
        >
          <LinearGradient colors={['#D97706', '#92400E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>CONFIRM MANIFESTO</Text>
          </LinearGradient>
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
  titleContainer: {
    alignItems: 'center',
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  mainTitle: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#F8FAFC',
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 150,
  },
  promiseItemWrapper: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  promiseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    height: 64,
  },
  promiseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  promiseTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#CBD5E1',
  },
  promiseCost: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: SPACING.lg,
    paddingBottom: 40,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    alignItems: 'center',
  },
  counterText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#F8FAFC',
    marginBottom: 16,
    letterSpacing: 1,
  },
  actionButtonWrapper: {
    width: '100%',
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
