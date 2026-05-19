import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [progressText, setProgressText] = useState('0');

  useEffect(() => {
    const listener = progressAnim.addListener(({ value }) => {
      setProgressText(Math.floor(value * 100).toString());
    });

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500, // 2.5 seconds loading
      useNativeDriver: false,
    }).start(() => {
      progressAnim.removeListener(listener);
      router.replace('/login');
    });

    return () => progressAnim.removeListener(listener);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, '#020408']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Background Graphic */}
      <Image 
        source={require('../../assets/images/splash_bg.png')} 
        style={styles.graphicContainer} 
        resizeMode="cover" 
      />
      
      {/* Dynamic Overlay Grid */}
      <View style={styles.gridOverlay} />

      <View style={styles.content}>
        <View style={styles.badgeWrapper}>
          <Text style={styles.badgeText}>POLITICAL STRATEGY SIMULATION</Text>
        </View>
        <Text style={styles.titleLine1}>DEMOCRACY</Text>
        <Text style={styles.titleLine2}>WARS</Text>
        <Text style={styles.subtitle}>CONQUER THE NATION • INFLUENCE THE VOTERS</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.loadingRow}>
          <Text style={styles.loadingText}>INITIALIZING SIMULATION ENGINE...</Text>
          <Text style={styles.percentageText}>{progressText}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
        <Text style={styles.devCredit}>POWERED BY DEEP SIMULATION ENGINE v1.2</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  graphicContainer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.35, // Premium subtle atmospheric backdrop
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.05,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  content: {
    alignItems: 'center',
    marginTop: -100, 
    zIndex: 10,
  },
  badgeWrapper: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  badgeText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  titleLine1: {
    fontFamily: FONTS.bold,
    fontSize: 48,
    color: '#FFF',
    letterSpacing: 3,
    marginBottom: -15,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  titleLine2: {
    fontFamily: FONTS.bold,
    fontSize: 78,
    color: COLORS.primary, // Premium Amber gold
    letterSpacing: 4,
    textShadowColor: 'rgba(245, 158, 11, 0.25)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontFamily: FONTS.semiBold,
    fontSize: 10,
    color: COLORS.textMuted,
    letterSpacing: 3,
    marginTop: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: width * 0.8,
    alignItems: 'stretch',
    zIndex: 10,
  },
  loadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  loadingText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: COLORS.textMuted,
    letterSpacing: 1.5,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  percentageText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  devCredit: {
    fontFamily: FONTS.medium,
    fontSize: 8,
    color: 'rgba(148, 163, 184, 0.4)',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 10,
  },
});
