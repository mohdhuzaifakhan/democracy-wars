import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';
import { useGameStore } from '../store/gameStore';

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>WELCOME BACK</Text>
          <Text style={styles.subtitle}>Lead your faction. Shape the nation's destiny.</Text>
        </View>

        <View style={styles.form}>
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
              placeholder="Enter mobile number"
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
              placeholder="Enter secure password"
              placeholderTextColor="rgba(255,255,255,0.3)"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#94A3B8" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>FORGOT PASSKEY?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginBtn}
            activeOpacity={0.8}
            onPress={() => router.replace('/(tabs)/lobby')}
          >
            <LinearGradient colors={['#E11D48', '#881337']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.btnGradient}>
              <Text style={styles.loginText}>START CAMPAIGN</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.separatorRow}>
            <View style={styles.sepLine} />
            <Text style={styles.sepText}>SECURE INTEGRATIONS</Text>
            <View style={styles.sepLine} />
          </View>

          <TouchableOpacity style={styles.googleBtn} activeOpacity={0.8}>
            <View style={styles.googleIconBox}>
              <MaterialCommunityIcons name="google" size={18} color="#0E1726" />
            </View>
            <Text style={styles.googleText}>AUTHENTICATE WITH GOOGLE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.guestBtn}
            activeOpacity={0.7}
            onPress={async () => {
              await useGameStore.getState().signInGuest();
              router.replace('/(tabs)/lobby');
            }}
          >
            <Text style={styles.guestText}>PLAY AS GUEST ADVOCATE</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotText: {
    fontFamily: FONTS.bold,
    fontSize: 11,
    color: COLORS.primary,
    letterSpacing: 1,
  },
  loginBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 10,
  },
  btnGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FFF',
    letterSpacing: 1.5,
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  sepLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  sepText: {
    fontFamily: FONTS.bold,
    fontSize: 9,
    color: 'rgba(148, 163, 184, 0.45)',
    marginHorizontal: 12,
    letterSpacing: 1.5,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.3)',
  },
  googleIconBox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleText: {
    fontFamily: FONTS.bold,
    fontSize: 12,
    color: '#FFF',
    letterSpacing: 1,
  },
  guestBtn: {
    alignSelf: 'center',
    marginTop: 25,
  },
  guestText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: COLORS.primary,
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
});
