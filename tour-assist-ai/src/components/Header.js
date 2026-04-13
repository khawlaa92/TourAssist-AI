import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { spacings, fontSizes, borderRadius } from '../../constants/theme';

export const Header = ({
  title,
  showThemeToggle = false,
  onPressBack,
  rightComponent,
}) => {
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primary,
          borderBottomColor: theme.accent,
        },
      ]}
    >
      <View
        style={[
          styles.content,
          {
            justifyContent: 'space-between',
          },
        ]}
      >
        <View style={styles.leftSection}>
          {onPressBack && (
            <TouchableOpacity onPress={onPressBack} style={styles.backButton}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
          )}
          <Text
            style={[
              styles.title,
              {
                fontSize: fontSizes.xl,
              },
            ]}
          >
            {title}
          </Text>
        </View>

        {showThemeToggle || rightComponent ? (
          <View style={styles.rightSection}>
            {rightComponent && rightComponent}
            {showThemeToggle && (
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#F0F0F0', true: '#555' }}
                thumbColor={isDarkMode ? theme.primary : theme.primary}
                style={styles.toggle}
              />
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacings.lg,
    paddingBottom: spacings.md,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacings.lg,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: spacings.sm,
    marginRight: spacings.md,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
  },
  title: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  toggle: {
    marginLeft: spacings.md,
  },
});
