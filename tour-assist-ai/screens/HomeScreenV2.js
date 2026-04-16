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
import { spacings, fontSizes, borderRadius } from '../constants/theme';

const FEATURES = [
  {
    id: 'chat',
    icon: '🤖',
    title: 'Assistant IA',
    description: 'Posez vos questions en temps reel',
    screen: 'Chat',
    color: '#E63946',
  },
  {
    id: 'map',
    icon: '🗺️',
    title: 'Explorer',
    description: 'Decouvrez les sites tunisiens',
    screen: 'Map',
    color: '#457B9D',
  },
  {
    id: 'translate',
    icon: '🎤',
    title: 'Traduction',
    description: 'Voix vers texte et traduction',
    screen: 'Translation',
    color: '#2A9D8F',
  },
  {
    id: 'money',
    icon: '💱',
    title: 'Transformation d\'argent',
    description: 'Convertir le dinar, l\'euro et le dollar',
    screen: 'MoneyConverter',
    color: '#F4A261',
  },
];

export const HomeScreen = ({ navigation }) => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="TourAssist AI" showThemeToggle />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleBlock}>
          <Text style={[styles.pageTitle, { color: theme.text }]}>
            Fonctionnalites principales
          </Text>
          <Text style={[styles.pageSubtitle, { color: theme.textSecondary }]}>
            Accedez rapidement aux outils utiles pour votre voyage.
          </Text>
        </View>

        {FEATURES.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={[
              styles.featureRow,
              {
                backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
                borderColor: theme.border,
                shadowColor: feature.color,
              },
            ]}
            onPress={() => navigation.navigate(feature.screen)}
            activeOpacity={0.75}
          >
            <View style={[styles.featureIconBg, { backgroundColor: `${feature.color}22` }]}>
              <Text style={styles.featureIconText}>{feature.icon}</Text>
            </View>
            <View style={styles.featureTextBlock}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>
                {feature.description}
              </Text>
            </View>
            <Text style={[styles.featureArrow, { color: feature.color }]}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacings.lg,
    paddingVertical: spacings.lg,
    paddingBottom: spacings.xl * 5,
  },
  titleBlock: {
    marginBottom: spacings.lg,
  },
  pageTitle: {
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    marginBottom: spacings.xs,
  },
  pageSubtitle: {
    fontSize: fontSizes.sm,
    lineHeight: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacings.lg,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacings.md,
    gap: spacings.md,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIconBg: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIconText: { fontSize: 26 },
  featureTextBlock: { flex: 1 },
  featureTitle: { fontSize: fontSizes.md, fontWeight: 'bold', marginBottom: 2 },
  featureDesc: { fontSize: fontSizes.sm },
  featureArrow: { fontSize: 28, fontWeight: 'bold' },
});
