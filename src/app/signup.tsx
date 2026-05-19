import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/login_bg.png')} 
        style={StyleSheet.absoluteFill}
        blurRadius={3}
      >
        <LinearGradient 
          colors={['rgba(6, 9, 19, 0.45)', 'rgba(6, 9, 19, 0.85)', COLORS.background]} 
          style={StyleSheet.absoluteFill} 
        />
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>CREATE ACCOUNT</Text>
          <Text style={styles.subtitle}>Enlist as an advocate. Lead the democracy war.</Text>
        </View>

        <View style={styles.form}>
          <View style={[
            styles.inputContainer,
            isNameFocused && styles.inputContainerFocused
          ]}>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={name}
              onChangeText={setName}
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
            />
          </View>

          <View style={[
            styles.inputContainer,
            isPhoneFocused && styles.inputContainerFocused
          ]}>
            <View style={styles.phonePrefix}>
              <Text style={styles.prefixText}>+91</Text>
              <View style={styles.divider} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Mobile number"
              placeholderTextColor="rgba(255,255,255,0.3)"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              onFocus={() => setIsPhoneFocused(true)}
              onBlur={() => setIsPhoneFocused(false)}
            />
          </View>

          <View style={[
            styles.inputContainer,
            isPasswordFocused && styles.inputContainerFocused
          ]}>
            <TextInput
              style={styles.input}
              placeholder="Create secure passkey"
              placeholderTextColor="rgba(255,255,255,0.3)"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
          </View>

          <TouchableOpacity 
            style={styles.signupBtn}
            activeOpacity={0.8}
            onPress={() => router.replace('/(tabs)/lobby')}
          >
            <LinearGradient colors={['#E11D48', '#881337']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.btnGradient}>
              <Text style={styles.signupText}>COMMENCE RECRUITMENT</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginLabel}>Registered advocate? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.loginLink}>LOGIN HERE</Text>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 30,
  },
  header: {
    marginBottom: 35,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: '#FFF',
    letterSpacing: 2,
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: COLORS.textMuted,
    marginTop: 6,
    lineHeight: 20,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 23, 38, 0.75)',
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.surfaceBorder,
    paddingHorizontal: 16,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  prefixText: {
    fontFamily: FONTS.bold,
    fontSize: 15,
    color: '#F8FAFC',
    marginRight: 12,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 14,
    color: '#FFF',
  },
  signupBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  btnGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFF',
    letterSpacing: 1.5,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  loginLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    color: COLORS.textMuted,
  },
  loginLink: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.primary,
    letterSpacing: 1,
  },
});
