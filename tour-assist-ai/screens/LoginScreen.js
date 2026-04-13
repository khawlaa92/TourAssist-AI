import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ThemeContext } from '../src/context/ThemeContext';
import { CustomButton } from '../src/components/CustomButton';
import { CustomInput } from '../src/components/CustomInput';
import { spacings, fontSizes, borderRadius } from '../constants/theme';

export const LoginScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleLogin = () => {
    let hasError = false;

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (!hasError) {
      // Navigate to home screen
      navigation.replace('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Placeholder */}
        <View
          style={[
            styles.logoContainer,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.logoText}>🧭</Text>
          <Text
            style={[
              styles.appName,
              {
                color: '#FFFFFF',
                fontSize: fontSizes.xxl,
              },
            ]}
          >
            TourAssist AI
          </Text>
        </View>

        {/* Title */}
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
              fontSize: fontSizes.xxl,
            },
          ]}
        >
          Welcome Back
        </Text>

        <Text
          style={[
            styles.subtitle,
            {
              color: theme.textSecondary,
              fontSize: fontSizes.md,
            },
          ]}
        >
          Sign in to your account to continue exploring
        </Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <CustomInput
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            errorMessage={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            errorMessage={passwordError}
          />

          {/* Forgot Password */}
          <CustomButton
            title="Forgot Password?"
            variant="tertiary"
            size="sm"
            style={styles.forgotButton}
            onPress={() => {
              // Handle forgot password
            }}
          />
        </View>

        {/* Login Button */}
        <CustomButton
          title="Login"
          onPress={handleLogin}
          size="lg"
          style={styles.loginButton}
        />

        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text
            style={[
              {
                color: theme.textSecondary,
                fontSize: fontSizes.md,
              },
            ]}
          >
            Don't have an account?{' '}
          </Text>
          <CustomButton
            title="Sign Up"
            variant="tertiary"
            size="sm"
            onPress={() => {
              // Handle sign up navigation
            }}
            style={styles.signupButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacings.lg,
    paddingVertical: spacings.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacings.xxl,
    paddingVertical: spacings.xl,
    borderRadius: borderRadius.xxl,
  },
  logoText: {
    fontSize: 64,
    marginBottom: spacings.md,
  },
  appName: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: spacings.md,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: spacings.xl,
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: spacings.xl,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: spacings.sm,
    marginBottom: spacings.lg,
  },
  loginButton: {
    marginBottom: spacings.lg,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacings.lg,
  },
  signupButton: {
    paddingHorizontal: 0,
  },
});
