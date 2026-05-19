import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const MY_ALLIANCES = [
  { id: '1', name: 'Rohan Mehta', party: 'Nav Vikas Party', share: 120, avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=3B82F6&color=fff' },
  { id: '2', name: 'Kavya Iyer', party: 'Aam Jan Morcha', share: 80, avatar: 'https://ui-avatars.com/api/?name=Kavya+Iyer&background=10B981&color=fff' },
];

const PROPOSALS = [
  { id: '3', name: 'Aditya Singh', party: 'Bharat Progress Party', avatar: 'https://ui-avatars.com/api/?name=Aditya+Singh&background=8B5CF6&color=fff' },
  { id: '4', name: 'Vivek Rao', party: 'Jan Shakti Party', avatar: 'https://ui-avatars.com/api/?name=Vivek+Rao&background=F43F5E&color=fff' },
];

export default function AllianceScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ALLIANCE SYSTEM</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MY ALLIANCES</Text>
          {MY_ALLIANCES.map((item) => (
            <View key={item.id} style={styles.allianceCard}>
              <View style={styles.allianceLeft}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.party}>{item.party}</Text>
                  <Text style={styles.stat}>Seat Share: {item.share}</Text>
                </View>
              </View>
              <View style={styles.activeBadge}>
                <Text style={styles.activeText}>ACTIVE</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PROPOSE ALLIANCE</Text>
          {PROPOSALS.map((item) => (
            <View key={item.id} style={styles.allianceCard}>
              <View style={styles.allianceLeft}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.party}>{item.party}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.proposeBtn}>
                <Text style={styles.proposeText}>PROPOSE</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 16,
    letterSpacing: 1,
  },
  allianceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  allianceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#F8FAFC',
  },
  party: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  stat: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#CBD5E1',
    marginTop: 4,
  },
  activeBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
  },
  activeText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#22C55E',
  },
  proposeBtn: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  proposeText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#A78BFA',
  },
});
