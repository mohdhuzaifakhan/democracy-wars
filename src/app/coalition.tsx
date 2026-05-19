import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const ALLIES = [
  { id: '1', name: 'ROHAN MEHTA', seats: 120, status: 'Willing to join coalition', color: ['#10B981', '#064E3B'], avatar: 'https://ui-avatars.com/api/?name=Rohan+Mehta&background=3B82F6&color=fff', canNegotiate: true },
  { id: '2', name: 'KAVYA IYER', seats: 80, status: 'Willing to join coalition', color: ['#8B5CF6', '#4C1D95'], avatar: 'https://ui-avatars.com/api/?name=Kavya+Iyer&background=10B981&color=fff', canNegotiate: true },
  { id: '3', name: 'ADITYA SINGH', seats: 35, status: 'Not interested in terms', color: ['rgba(27,42,74,0.25)', 'rgba(14,23,38,0.5)'], avatar: 'https://ui-avatars.com/api/?name=Aditya+Singh&background=8B5CF6&color=fff', canNegotiate: false },
];

export default function CoalitionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.background, '#090F1E']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>COALITION STAGE</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.hungBanner}>
          <Text style={styles.hungTitle}>HUNG ASSEMBLY DISCLOSED</Text>
          <Text style={styles.hungSubtitle}>No single political force has achieved absolute majority.</Text>
        </View>

        <View style={styles.talksCard}>
          <Text style={styles.sectionTitle}>COALITION BARGAINING</Text>
          <Text style={styles.sectionSubtitle}>Select secondary allies to command structural state governance.</Text>

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
                    <Text style={styles.allySeats}>{item.seats} ESTIMATED SEATS</Text>
                    <Text style={[styles.allyStatus, !item.canNegotiate && { color: COLORS.textMuted }]}>{item.status.toUpperCase()}</Text>
                  </View>
                </View>
                
                {item.canNegotiate ? (
                  <TouchableOpacity style={styles.negotiateBtn} activeOpacity={0.8}>
                    <Text style={styles.negotiateText}>NEGOTIATE</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.lockedIcon}>
                    <MaterialCommunityIcons name="lock-outline" size={16} color="rgba(255,255,255,0.2)" />
                  </View>
                )}
              </LinearGradient>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerInfo}>
             <Text style={styles.mySeatsText}>
               YOUR CONFIRMED SEATS: <Text style={{ color: COLORS.success }}>245</Text> / 543
             </Text>
             <Text style={styles.neededText}>
               Awaiting <Text style={{ color: COLORS.primary }}>27</Text> additional seats to acquire sovereign command majority.
             </Text>
          </View>
          <TouchableOpacity 
            style={styles.proposeButton}
            activeOpacity={0.8}
            onPress={() => router.push('/result')}
          >
            <LinearGradient colors={['#E11D48', '#881337']} style={styles.proposeGradient}>
              <Text style={styles.proposeText}>PROPOSE STRATEGIC ALLIANCE</Text>
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
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  hungBanner: {
    backgroundColor: 'rgba(225, 29, 72, 0.1)',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.danger,
    marginBottom: 16,
  },
  hungTitle: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.danger,
    letterSpacing: 1.5,
  },
  hungSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: '#FFF',
    marginTop: 4,
    textAlign: 'center',
  },
  talksCard: {
    flex: 1,
    backgroundColor: 'rgba(27, 42, 74, 0.25)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  sectionTitle: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 16,
  },
  allyWrapper: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  allyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  allyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  allyInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  allyName: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  allySeats: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  allyStatus: {
    fontFamily: FONTS.bold,
    fontSize: 8,
    color: COLORS.primary,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  negotiateBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  negotiateText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  lockedIcon: {
    paddingRight: 8,
  },
  footer: {
    marginTop: 16,
    backgroundColor: 'rgba(14, 23, 38, 0.8)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
  },
  footerInfo: {
    marginBottom: 12,
  },
  mySeatsText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  neededText: {
    fontFamily: FONTS.medium,
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  proposeButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  proposeGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proposeText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#FFF',
    letterSpacing: 1.5,
  },
});
