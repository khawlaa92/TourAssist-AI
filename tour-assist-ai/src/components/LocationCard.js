import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { spacings, borderRadius, fontSizes } from '../../constants/theme';

export const LocationCard = ({
  title,
  description,
  distance,
  onPress,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.secondary,
          borderColor: theme.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
              fontSize: fontSizes.lg,
            },
          ]}
        >
          📍 {title}
        </Text>
      </View>
      <Text
        style={[
          styles.description,
          {
            color: theme.textSecondary,
            fontSize: fontSizes.sm,
          },
        ]}
      >
        {description}
      </Text>
      {distance && (
        <Text
          style={[
            styles.distance,
            {
              color: theme.primary,
              fontSize: fontSizes.sm,
            },
          ]}
        >
          Distance: {distance}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacings.md,
    marginHorizontal: spacings.lg,
    padding: spacings.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    marginBottom: spacings.sm,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    marginVertical: spacings.sm,
    lineHeight: 20,
  },
  distance: {
    fontWeight: '600',
    marginTop: spacings.sm,
  },
});
