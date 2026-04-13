import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { ThemeContext } from '../src/context/ThemeContext';
import { Header } from '../src/components/Header';
import { CustomButton } from '../src/components/CustomButton';
import { spacings, fontSizes, borderRadius } from '../constants/theme';

export const HomeScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  const features = [
    {
      id: 1,
      icon: '🎤',
      title: 'Start Translation',
      description: 'Real-time voice translation',
      screen: 'Chat',
    },
    {
      id: 2,
      icon: '🤖',
      title: 'Chat Assistant',
      description: 'Ask our AI assistant',
      screen: 'Chat',
    },
    {
      id: 3,
      icon: '🗺️',
      title: 'Explore Places',
      description: 'Discover Tunisia',
      screen: 'Map',
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <Header title="TourAssist AI" showThemeToggle />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text
            style={[
              styles.welcomeTitle,
              {
                color: theme.text,
                fontSize: fontSizes.xxxl,
              },
            ]}
          >
            Hello, Traveler 👋
          </Text>
          <Text
            style={[
              styles.welcomeSubtitle,
              {
                color: theme.textSecondary,
                fontSize: fontSizes.md,
              },
            ]}
          >
            Explore Tunisia with AI-powered guidance
          </Text>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresContainer}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              onPress={() => navigation.navigate(feature.screen)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: isDarkMode ? '#1E1E1E' : '#F5F5F5',
                    borderColor: theme.border,
                  },
                ]}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text
                  style={[
                    styles.featureTitle,
                    {
                      color: theme.text,
                      fontSize: fontSizes.lg,
                    },
                  ]}
                >
                  {feature.title}
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    {
                      color: theme.textSecondary,
                      fontSize: fontSizes.sm,
                    },
                  ]}
                >
                  {feature.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View
          style={[
            styles.statsContainer,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                {
                  fontSize: fontSizes.xxl,
                },
              ]}
            >
              50+
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  fontSize: fontSizes.sm,
                },
              ]}
            >
              Places
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                {
                  fontSize: fontSizes.xxl,
                },
              ]}
            >
              15+
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  fontSize: fontSizes.sm,
                },
              ]}
            >
              Languages
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                {
                  fontSize: fontSizes.xxl,
                },
              ]}
            >
              24/7
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  fontSize: fontSizes.sm,
                },
              ]}
            >
              Support
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <CustomButton
          title="Logout"
          variant="secondary"
          size="md"
          onPress={() => navigation.replace('Login')}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacings.lg,
    paddingVertical: spacings.lg,
  },
  welcomeSection: {
    marginBottom: spacings.xxl,
  },
  welcomeTitle: {
    fontWeight: 'bold',
    marginBottom: spacings.md,
  },
  welcomeSubtitle: {
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: spacings.xxl,
  },
  featureCard: {
    paddingVertical: spacings.xl,
    paddingHorizontal: spacings.lg,
    borderRadius: borderRadius.lg,
    marginVertical: spacings.md,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: spacings.md,
  },
  featureTitle: {
    fontWeight: 'bold',
    marginBottom: spacings.sm,
    textAlign: 'center',
  },
  featureDescription: {
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacings.xl,
    paddingHorizontal: spacings.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacings.xl,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: spacings.md,
  },
  statNumber: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: spacings.sm,
  },
  statLabel: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
  logoutButton: {
    marginBottom: spacings.xl,
  },
});
