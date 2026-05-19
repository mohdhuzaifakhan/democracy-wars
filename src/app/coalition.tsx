import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const ALLIES = [
  { id: '1', name: 'Rohan Mehta', seats: 120, status: 'Willing to join', color: ['#15803D', '#064E3B'], avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=3B82F6&color=fff', canNegotiate: true },
  { id: '2', name: 'Kavya Iyer', seats: 80, status: 'Willing to join', color: ['#6D28D9', '#4C1D95'], avatar: 'https://ui-avatars.com/api/?name=Kavya+Iyer&background=10B981&color=fff', canNegotiate: true },
  { id: '3', name: 'Aditya Singh', seats: 35, status: 'Not interested', color: ['#1E293B', '#0F172A'], avatar: 'https://ui-avatars.com/api/?name=Aditya+Singh&background=8B5CF6&color=fff', canNegotiate: false },
];

export default function CoalitionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>COALITION (IF HUNG)</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.hungBanner}>
          <Text style={styles.hungTitle}>HUNG ASSEMBLY!</Text>
          <Text style={styles.hungSubtitle}>No party has majority.</Text>
        </View>

        <View style={styles.talksCard}>
          <Text style={styles.sectionTitle}>COALITION TALKS</Text>
          <Text style={styles.sectionSubtitle}>Choose your allies to form government</Text>

          {ALLIES.map((item) => (
            <View key={item.id} style={styles.allyWrapper}>
              <LinearGradient 
                colors={item.color as any} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }} 
                style={styles.allyCard}
              >
                <View style={styles.allyLeft}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={styles.allyInfo}>
                    <Text style={styles.allyName}>{item.name}</Text>
                    <Text style={styles.allySeats}>{item.seats} Seats</Text>
                    <Text style={[styles.allyStatus, !item.canNegotiate && { color: '#94A3B8' }]}>{item.status}</Text>
                  </View>
                </View>
                
                {item.canNegotiate ? (
                  <TouchableOpacity style={styles.negotiateBtn}>
                    <Text style={styles.negotiateText}>NEGOTIATE</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.lockedIcon}>
                    <MaterialCommunityIcons name="minus" size={24} color="#475569" />
                  </View>
                )}
              </LinearGradient>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerInfo}>
             <Text style={styles.mySeatsText}>
               My Seats: <Text style={{ color: '#22C55E' }}>245</Text> / 543
             </Text>
             <Text style={styles.neededText}>
               Need <Text style={{ color: '#FACC15' }}>27</Text> more for majority
             </Text>
          </View>
          <TouchableOpacity 
            style={styles.proposeButton}
            onPress={() => router.push('/result')}
          >
            <LinearGradient colors={['#D97706', '#92400E']} style={styles.proposeGradient}>
              <Text style={styles.proposeText}>PROPOSE COALITION</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  hungBanner: {
    backgroundColor: 'rgba(153, 27, 27, 0.4)',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    marginBottom: 20,
  },
  hungTitle: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    color: '#FACC15',
    letterSpacing: 1.5,
  },
  hungSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#F8FAFC',
    marginTop: 4,
    opacity: 0.8,
  },
  talksCard: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#F8FAFC',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
    marginBottom: 24,
  },
  allyWrapper: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  allyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  allyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  allyInfo: {
    justifyContent: 'center',
  },
  allyName: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#FFF',
  },
  allySeats: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
  },
  allyStatus: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FACC15',
    marginTop: 4,
  },
  negotiateBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  negotiateText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
  },
  lockedIcon: {
    paddingRight: 8,
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  footerInfo: {
    marginBottom: 16,
  },
  mySeatsText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#F8FAFC',
  },
  neededText: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
  },
  proposeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  proposeGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proposeText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFF',
    letterSpacing: 1,
  },
});
