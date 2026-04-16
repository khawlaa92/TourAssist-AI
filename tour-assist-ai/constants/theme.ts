/**
 * TourAssist AI Theme Configuration
 * Red and White theme inspired by Tunisia flag 🇹🇳
 */

export const lightTheme = {
  primary: '#c41e3a', // Tunisia red
  secondary: '#FFFFFF', // White
  accent: '#c41e3a',
  background: '#FFFFFF',
  text: '#1a1a1a',
  textSecondary: '#666666',
  border: '#E0E0E0',
  error: '#E74C3C',
  success: '#27AE60',
  lightRed: '#f8f0ed',
  lightGray: '#F5F5F5',
};

export const darkTheme = {
  primary: '#c41e3a', // Tunisia red
  secondary: '#2a2a2a', // Dark background
  accent: '#FF6B6B', // Lighter red for dark mode
  background: '#1a1a1a',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#404040',
  error: '#E74C3C',
  success: '#27AE60',
  lightRed: '#2C2123',
  lightGray: '#242424',
  darkRed: '#8B0000',
  darkGray: '#242424',
};

export const spacings = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  displayLg: 36,
  displayXl: 48,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 100,
};

export const shadows = {
  none: {
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  xs: {
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  lg: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  xl: {
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
};

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#c41e3a',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#c41e3a',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#FF6B6B',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FF6B6B',
  },
};
