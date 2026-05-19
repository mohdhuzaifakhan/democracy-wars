import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING, SHADOWS } from '../../constants/theme';
import { USER_PROFILE } from '../../constants/dummyData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  const handlePlayGame = () => {
    router.push('/candidate-selection');
  };

  const handleMultiplayer = () => {
    router.push('/lobby');
  };

  const handleLeaderboard = () => {
    router.push('/leaderboard');
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: USER_PROFILE.avatar }} style={styles.avatar} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{USER_PROFILE.name}</Text>
            <Text style={styles.rankText}>{USER_PROFILE.rankTitle}</Text>
          </View>
        </View>

        <View style={styles.currencySection}>
          <View style={styles.currencyRow}>
            <MaterialCommunityIcons name="circle-multiple" size={18} color="#FACC15" />
            <Text style={styles.currencyText}>{USER_PROFILE.coins.toLocaleString()}</Text>
            <TouchableOpacity style={styles.plusButton}>
              <MaterialCommunityIcons name="plus" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.currencyRow}>
            <MaterialCommunityIcons name="diamond" size={18} color="#38BDF8" />
            <Text style={styles.currencyText}>{USER_PROFILE.diamonds.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Quick Play */}
        <TouchableOpacity activeOpacity={0.8} onPress={handlePlayGame} style={styles.buttonWrapper}>
          <LinearGradient colors={['#D97706', '#92400E']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.mainButton}>
            <MaterialCommunityIcons name="sword-cross" size={32} color="#FFF" style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.mainButtonText}>QUICK PLAY</Text>
              <Text style={styles.subButtonText}>Join a random game</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Multiplayer */}
        <TouchableOpacity activeOpacity={0.8} onPress={handleMultiplayer} style={styles.buttonWrapper}>
          <LinearGradient colors={['#7C3AED', '#4C1D95']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.mainButton}>
            <MaterialCommunityIcons name="account-group" size={32} color="#FFF" style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.mainButtonText}>MULTIPLAYER</Text>
              <Text style={styles.subButtonText}>Play with friends</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Practice */}
        <TouchableOpacity activeOpacity={0.8} onPress={handlePlayGame} style={styles.buttonWrapper}>
          <LinearGradient colors={['#2563EB', '#1E3A8A']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.mainButton}>
            <MaterialCommunityIcons name="whistle" size={32} color="#FFF" style={styles.buttonIcon} />
            <View style={styles.buttonTextContainer}>
              <Text style={styles.mainButtonText}>PRACTICE</Text>
              <Text style={styles.subButtonText}>Play vs AI</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Row: Leaderboard & Store */}
        <View style={styles.rowButtons}>
          <TouchableOpacity activeOpacity={0.8} onPress={handleLeaderboard} style={[styles.buttonWrapper, styles.halfButtonWrapper]}>
            <LinearGradient colors={['#16A34A', '#14532D']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.halfButton}>
              <MaterialCommunityIcons name="podium" size={28} color="#FFF" style={styles.buttonIcon} />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.mainButtonText}>LEADERBOARD</Text>
                <Text style={styles.subButtonText}>Top Players</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={[styles.buttonWrapper, styles.halfButtonWrapper]}>
            <LinearGradient colors={['#B45309', '#78350F']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.halfButton}>
              <MaterialCommunityIcons name="cart" size={28} color="#FACC15" style={styles.buttonIcon} />
              <View style={styles.buttonTextContainer}>
                <Text style={styles.mainButtonText}>STORE</Text>
                <Text style={styles.subButtonText}>Shop & Merch</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 60,
    paddingBottom: SPACING.md,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    padding: 2,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#D97706',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  profileInfo: {
    marginLeft: SPACING.sm,
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  rankText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: COLORS.textMuted,
  },
  currencySection: {
    alignItems: 'flex-start',
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  currencyText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 6,
    width: 50, // To align them perfectly
  },
  plusButton: {
    backgroundColor: '#16A34A',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  scrollContent: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: 100,
  },
  buttonWrapper: {
    marginBottom: SPACING.md,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  mainButton: {
    height: 86,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  buttonIcon: {
    marginRight: SPACING.md,
    opacity: 0.9,
  },
  buttonTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mainButtonText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 1,
  },
  subButtonText: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
  },
  halfButtonWrapper: {
    width: '48%',
  },
  halfButton: {
    height: 86,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});
