import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { spacings, borderRadius, fontSizes } from '../../constants/theme';

export const CustomButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  disabled = false,
}) => {
  const { theme } = useContext(ThemeContext);

  const sizes = {
    sm: { padding: spacings.md, fontSize: fontSizes.sm },
    md: { padding: spacings.lg, fontSize: fontSizes.md },
    lg: { padding: spacings.xl, fontSize: fontSizes.lg },
  };

  const variants = {
    primary: {
      backgroundColor: theme.primary,
      color: '#FFFFFF',
    },
    secondary: {
      backgroundColor: theme.secondary,
      color: theme.primary,
      borderWidth: 2,
      borderColor: theme.primary,
    },
    tertiary: {
      backgroundColor: 'transparent',
      color: theme.primary,
    },
  };

  const selectedSize = sizes[size];
  const selectedVariant = variants[variant];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          padding: selectedSize.padding,
          backgroundColor: selectedVariant.backgroundColor,
          borderColor: selectedVariant.borderColor,
          borderWidth: selectedVariant.borderWidth || 0,
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: selectedSize.fontSize,
            color: selectedVariant.color,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.5,
  },
});
