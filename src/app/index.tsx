import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS, SPACING } from '../constants/theme';
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
      // Navigate to login after splash
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
        colors={['#0F172A', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Background Graphic */}
      <Image 
        source={require('../../assets/images/splash_bg.png')} 
        style={styles.graphicContainer} 
        resizeMode="cover" 
      />

      <View style={styles.content}>
        <Text style={styles.titleLine1}>DEMOCRACY</Text>
        <Text style={styles.titleLine2}>WARS</Text>
        <Text style={styles.subtitle}>WIN THE NATION, ONE VOTE AT A TIME</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.loadingText}>LOADING...</Text>
        <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        </View>
        <Text style={styles.percentageText}>{progressText}%</Text>
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
    opacity: 0.6, // Keep it atmospheric
  },
  content: {
    alignItems: 'center',
    marginTop: -150, // Push up higher to match design
    zIndex: 10,
  },
  titleLine1: {
    fontFamily: FONTS.bold,
    fontSize: 52,
    color: '#F8FAFC',
    letterSpacing: 1,
    marginBottom: -20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  titleLine2: {
    fontFamily: FONTS.bold,
    fontSize: 84,
    color: '#EAB308', // Stronger gold
    letterSpacing: 2,
    textShadowColor: 'rgba(234, 179, 8, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: '#E2E8F0',
    letterSpacing: 2.5,
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: width * 0.75,
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#CBD5E1',
    letterSpacing: 3,
    marginBottom: 12,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FACC15',
    borderRadius: 10,
    shadowColor: '#FACC15',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  percentageText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 1,
  },
});
