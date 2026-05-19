import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

const LEADERBOARD_DATA = [
  { id: '1', name: 'Arjun Verma', score: '2,450', rank: 1, avatar: 'https://ui-avatars.com/api/?name=Arjun+Verma&background=FACC15&color=000' },
  { id: '2', name: 'Rohan Mehta', score: '2,100', rank: 2, avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=CBD5E1&color=000' },
  { id: '3', name: 'Kavya Iyer', score: '1,950', rank: 3, avatar: 'https://ui-avatars.com/api/?name=Kavya+Iyer&background=D97706&color=000' },
  { id: '4', name: 'Aditya Singh', score: '1,750', rank: 4, avatar: 'https://ui-avatars.com/api/?name=Aditya+Singh&background=3B82F6&color=fff' },
  { id: '5', name: 'Neha Patil', score: '1,250', rank: 5, avatar: 'https://ui-avatars.com/api/?name=Neha+Patil&background=EC4899&color=fff' },
  { id: '6', name: 'Vivek Rao', score: '1,100', rank: 6, avatar: 'https://ui-avatars.com/api/?name=Vivek+Rao&background=14B8A6&color=fff' },
];

export default function LeaderboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('GLOBAL');

  const renderItem = ({ item }: { item: typeof LEADERBOARD_DATA[0] }) => (
    <View style={styles.rankItem}>
      <View style={styles.rankLeft}>
        <View style={styles.rankNumberBox}>
          {item.rank <= 3 ? (
            <MaterialCommunityIcons 
              name={item.rank === 1 ? 'key-variant' : item.rank === 2 ? 'medal' : 'medal-outline'} 
              size={20} 
              color={item.rank === 1 ? '#FACC15' : item.rank === 2 ? '#CBD5E1' : '#D97706'} 
            />
          ) : (
            <Text style={styles.rankNumberText}>{item.rank}</Text>
          )}
        </View>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.nameText}>{item.name}</Text>
      </View>
      <Text style={styles.scoreText}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LEADERBOARD</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.tabsContainer}>
        {['GLOBAL', 'FRIENDS'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.listWrapper}>
        <FlatList
          data={LEADERBOARD_DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.myRankRow}>
           <View style={styles.rankLeft}>
             <View style={styles.rankNumberBox}>
               <Text style={styles.rankNumberText}>10</Text>
             </View>
             <Image source={{ uri: 'https://ui-avatars.com/api/?name=You&background=EF4444&color=fff' }} style={styles.avatar} />
             <Text style={styles.nameText}>You</Text>
           </View>
           <Text style={styles.scoreText}>750</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 90,
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
    fontSize: 13,
    color: '#94A3B8',
  },
  activeTabText: {
    color: '#FFF',
  },
  listWrapper: {
    flex: 1,
    marginHorizontal: SPACING.lg,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: 40,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: 80,
  },
  rankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  rankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankNumberBox: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumberText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#94A3B8',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  nameText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#F8FAFC',
  },
  scoreText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#CBD5E1',
  },
  myRankRow: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#991B1B',
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
