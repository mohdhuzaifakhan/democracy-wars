import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const VOTER_BLOCS = [
  { id: '1', title: 'Youth', influence: '25%', demand: 'Jobs, Education', icon: 'account-school', color: '#FACC15' },
  { id: '2', title: 'Farmers', influence: '20%', demand: 'Loan Waiver, MSP', icon: 'tractor', color: '#22C55E' },
  { id: '3', title: 'Business', influence: '15%', demand: 'Tax Benefits', icon: 'office-building', color: '#8B5CF6' },
  { id: '4', title: 'Women', influence: '15%', demand: 'Safety, Rights', icon: 'face-woman', color: '#EC4899' },
  { id: '5', title: 'Minorities', influence: '15%', demand: 'Security, Equality', icon: 'account-group', color: '#14B8A6' },
  { id: '6', title: 'Senior Citizens', influence: '10%', demand: 'Pension, Healthcare', icon: 'account-star', color: '#94A3B8' },
];

export default function VoterBlocsScreen() {
  const router = useRouter();

  const renderBloc = ({ item }: { item: typeof VOTER_BLOCS[0] }) => (
    <View style={styles.blocItem}>
      <View style={[styles.iconCircle, { backgroundColor: item.color + '20', borderColor: item.color + '40' }]}>
        <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
      </View>
      <View style={styles.blocInfo}>
        <Text style={styles.blocTitle}>{item.title}</Text>
        <Text style={styles.blocStat}>
          Influence: <Text style={styles.statValue}>{item.influence}</Text>
        </Text>
        <Text style={styles.blocStat}>
          Demand: <Text style={styles.statValue}>{item.demand}</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VOTER BLOCS</Text>
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
        />

        <View style={styles.footerBox}>
          <Text style={styles.swingTitle}>Swing Voters: 10%</Text>
          <Text style={styles.swingDesc}>Can change based on campaigns</Text>
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
    paddingBottom: SPACING.lg,
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
  listWrapper: {
    flex: 1,
    marginHorizontal: SPACING.lg,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  blocItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  blocInfo: {
    flex: 1,
  },
  blocTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#F8FAFC',
    marginBottom: 4,
  },
  blocStat: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 2,
  },
  statValue: {
    color: '#CBD5E1',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  footerBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  swingTitle: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#F8FAFC',
    marginBottom: 4,
  },
  swingDesc: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    color: '#94A3B8',
  },
});
