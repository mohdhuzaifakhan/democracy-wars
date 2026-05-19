import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS, SPACING } from '../../constants/theme';

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#050B14']} style={StyleSheet.absoluteFill} />
      <View style={styles.content}>
        <Text style={styles.title}>LIVE EVENTS</Text>
        <Text style={styles.subtitle}>Stay tuned for nationwide rallies and debates.</Text>
        
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No Active Events</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  content: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  title: { 
    color: COLORS.text, 
    fontFamily: FONTS.bold, 
    fontSize: 24,
    letterSpacing: 1,
  },
  subtitle: {
    color: '#94A3B8',
    fontFamily: FONTS.medium,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: 'rgba(255,255,255,0.2)',
    fontFamily: FONTS.bold,
    fontSize: 18,
    letterSpacing: 2,
  }
});
