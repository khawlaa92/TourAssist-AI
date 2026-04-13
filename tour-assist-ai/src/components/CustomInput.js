import React, { useContext } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { spacings, borderRadius, fontSizes } from '../../constants/theme';

export const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  label,
  errorMessage,
  style,
  ...props
}) => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: theme.text,
              fontSize: fontSizes.md,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: errorMessage ? theme.error : theme.border,
            backgroundColor: isDarkMode ? '#1E1E1E' : '#F5F5F5',
            color: theme.text,
            fontSize: fontSizes.md,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
      {errorMessage && (
        <Text
          style={[
            styles.error,
            {
              color: theme.error,
              fontSize: fontSizes.sm,
            },
          ]}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacings.lg,
  },
  label: {
    marginBottom: spacings.sm,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.md,
  },
  error: {
    marginTop: spacings.sm,
  },
});
