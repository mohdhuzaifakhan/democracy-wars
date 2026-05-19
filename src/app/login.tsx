import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useGameStore } from '../store/gameStore';


export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/login_bg.png')} 
        style={StyleSheet.absoluteFill}
        blurRadius={2}
      >
        <LinearGradient 
          colors={['rgba(15, 23, 42, 0.6)', 'rgba(15, 23, 42, 0.9)', '#0F172A']} 
          style={StyleSheet.absoluteFill} 
        />
      </ImageBackground>

      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={32} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Lead your party to victory.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={styles.phonePrefix}>
              <Text style={styles.prefixText}>+91</Text>
              <View style={styles.divider} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor="#64748B"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#64748B"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="#64748B" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginBtn}
            onPress={() => router.replace('/(tabs)/lobby')}
          >
            <LinearGradient colors={['#B91C1C', '#7F1D1D']} style={styles.btnGradient}>
              <Text style={styles.loginText}>LOGIN</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.separatorRow}>
            <View style={styles.sepLine} />
            <Text style={styles.sepText}>or</Text>
            <View style={styles.sepLine} />
          </View>

          <TouchableOpacity style={styles.googleBtn}>
            <View style={styles.googleIconBox}>
              <MaterialCommunityIcons name="google" size={20} color="#EA4335" />
            </View>
            <Text style={styles.googleText}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.guestBtn}
            onPress={async () => {
              await useGameStore.getState().signInGuest();
              router.replace('/(tabs)/lobby');
            }}
          >
            <Text style={styles.guestText}>Play as Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: '#FFF',
  },
  subtitle: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    height: 64,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
  },
  phonePrefix: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  prefixText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#F8FAFC',
    marginRight: 12,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    flex: 1,
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: '#FFF',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    fontFamily: FONTS.bold,
    fontSize: 13,
    color: '#3B82F6',
  },
  loginBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#B91C1C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  btnGradient: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: FONTS.bold,
    fontSize: 18,
    color: '#FFF',
    letterSpacing: 1,
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  sepLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  sepText: {
    fontFamily: FONTS.medium,
    fontSize: 12,
    color: '#64748B',
    marginHorizontal: 12,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E40AF',
    height: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  googleIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  googleText: {
    fontFamily: FONTS.bold,
    fontSize: 14,
    color: '#FFF',
    letterSpacing: 0.5,
  },
  guestBtn: {
    alignSelf: 'center',
    marginTop: 20,
  },
  guestText: {
    fontFamily: FONTS.bold,
    fontSize: 16,
    color: '#FACC15',
    textDecorationLine: 'underline',
  },
});
