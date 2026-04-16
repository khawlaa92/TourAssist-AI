/**
 * DashboardScreen.js — Analytics & Usage Dashboard
 * Statistiques d'utilisation, historique et recommandations
 */

import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../src/context/ThemeContext';
import { Header } from '../src/components/Header';
import { spacings, fontSizes, borderRadius } from '../constants/theme';

export const DashboardScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [stats, setStats] = useState({
    totalMessages: 0,
    totalTranslations: 0,
    uniqueLanguages: [],
    sitesVisited: [],
    lastActiveDate: null,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const chatHistory = await AsyncStorage.getItem('@chat_history');
      const translationHistory = await AsyncStorage.getItem('@translation_history');
      const sitesVisited = await AsyncStorage.getItem('@sites_visited');

      const parsedChat = chatHistory ? JSON.parse(chatHistory) : [];
      const parsedTranslations = translationHistory ? JSON.parse(translationHistory) : [];
      const parsedSites = sitesVisited ? JSON.parse(sitesVisited) : [];

      const languages = new Set(parsedTranslations.map(t => t.targetLanguage || 'Unknown'));

      setStats({
        totalMessages: parsedChat.length,
        totalTranslations: parsedTranslations.length,
        uniqueLanguages: Array.from(languages),
        sitesVisited: parsedSites,
        lastActiveDate: new Date().toLocaleDateString('fr-FR'),
      });
    } catch (error) {
      console.log('Erreur chargement stats:', error);
    }
  };

  const resetAllData = () => {
    Alert.alert(
      'Réinitialiser',
      'Êtes-vous sûr? Cette action ne peut pas être annulée.',
      [
        { text: 'Annuler', onPress: () => {} },
        {
          text: 'Réinitialiser',
          onPress: async () => {
            await AsyncStorage.removeItem('@chat_history');
            await AsyncStorage.removeItem('@translation_history');
            await AsyncStorage.removeItem('@sites_visited');
            Alert.alert('Succès', 'Toutes les données ont été réinitialisées');
            loadStats();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const StatCard = ({ icon, title, value, color }) => (
    <View
      style={[
        styles.statCard,
        {
          backgroundColor: theme.card || theme.background,
          borderColor: color,
        },
      ]}
    >
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statTitle, { color: theme.textSecondary }]}>
        {title}
      </Text>
      <Text style={[styles.statValue, { color: color }]}>
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Tableau de Bord 📊" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Stats Overview */}
        <View style={styles.statsGrid}>
          <StatCard
            icon="💬"
            title="Messages"
            value={stats.totalMessages}
            color="#E63946"
          />
          <StatCard
            icon="🌐"
            title="Traductions"
            value={stats.totalTranslations}
            color="#457B9D"
          />
          <StatCard
            icon="🗺️"
            title="Lieux"
            value={stats.sitesVisited.length}
            color="#2A9D8F"
          />
          <StatCard
            icon="🌍"
            title="Langues"
            value={stats.uniqueLanguages.length}
            color="#F77F00"
          />
        </View>

        {/* Usage Timeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            📅 Activité Récente
          </Text>
          <View
            style={[
              styles.timelineBox,
              { backgroundColor: theme.card || theme.background },
            ]}
          >
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: '#E63946' }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: theme.text }]}>
                  Dernière utilisation
                </Text>
                <Text style={[styles.timelineDate, { color: theme.textSecondary }]}>
                  {stats.lastActiveDate}
                </Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: '#2A9D8F' }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: theme.text }]}>
                  Total Interactions
                </Text>
                <Text style={[styles.timelineDate, { color: theme.textSecondary }]}>
                  {stats.totalMessages + stats.totalTranslations} activités
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Languages Used */}
        {stats.uniqueLanguages.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              🗣️ Langues Utilisées
            </Text>
            <View
              style={[
                styles.languageBox,
                { backgroundColor: theme.card || theme.background },
              ]}
            >
              {stats.uniqueLanguages.map((lang, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.languageTag,
                    { borderColor: theme.primary },
                  ]}
                >
                  <Text style={[styles.languageText, { color: theme.primary }]}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Sites Visited */}
        {stats.sitesVisited.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              📍 Lieux Explorés
            </Text>
            <View
              style={[
                styles.sitesBox,
                { backgroundColor: theme.card || theme.background },
              ]}
            >
              {stats.sitesVisited.slice(0, 5).map((site, index) => (
                <View
                  key={index}
                  style={[
                    styles.siteItem,
                    {
                      borderBottomColor: theme.divider,
                      borderBottomWidth: index < 4 ? 1 : 0,
                    },
                  ]}
                >
                  <Text style={[styles.siteName, { color: theme.text }]}>
                    {site}
                  </Text>
                  <Text style={[styles.siteIcon, { color: theme.primary }]}>
                    ⭐
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            💡 Conseil du Jour
          </Text>
          <View
            style={[
              styles.tipBox,
              { backgroundColor: theme.primary + '15', borderColor: theme.primary },
            ]}
          >
            <Text style={[styles.tipText, { color: theme.text }]}>
              💬 Utilisez plus le chat IA pour obtenir des réponses personnalisées sur la Tunisie!
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat')}
            style={[styles.actionBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.actionBtnText}>Continuer le Chat 💬</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Translation')}
            style={[styles.actionBtn, { backgroundColor: '#2A9D8F' }]}
          >
            <Text style={styles.actionBtnText}>Traduire 🌐</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={resetAllData}
            style={[styles.actionBtn, { backgroundColor: '#666666' }]}
          >
            <Text style={styles.actionBtnText}>Réinitialiser les Données 🗑️</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacings.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: spacings.lg },
  contentContainer: { paddingBottom: spacings.xl * 4 },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacings.md,
    marginBottom: spacings.xl,
  },
  statCard: {
    width: '48%',
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    padding: spacings.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: { fontSize: 32, marginBottom: spacings.sm },
  statTitle: {
    fontSize: fontSizes.sm,
    textAlign: 'center',
    marginBottom: spacings.xs,
  },
  statValue: {
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },

  // Sections
  section: { marginBottom: spacings.xl },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    marginBottom: spacings.md,
  },

  // Timeline
  timelineBox: {
    borderRadius: borderRadius.lg,
    padding: spacings.md,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacings.md,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    flexShrink: 0,
  },
  timelineContent: { flex: 1 },
  timelineTitle: { fontSize: fontSizes.md, fontWeight: '600', marginBottom: spacings.xs },
  timelineDate: { fontSize: fontSizes.sm },
  separator: { height: 1, backgroundColor: '#E0E0E0', marginVertical: spacings.md },

  // Languages
  languageBox: {
    borderRadius: borderRadius.lg,
    padding: spacings.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacings.sm,
  },
  languageTag: {
    borderWidth: 1.5,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacings.md,
    paddingVertical: spacings.sm,
  },
  languageText: { fontSize: fontSizes.sm, fontWeight: '600' },

  // Sites
  sitesBox: {
    borderRadius: borderRadius.lg,
    padding: spacings.md,
  },
  siteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacings.md,
  },
  siteName: { fontSize: fontSizes.md, flex: 1 },
  siteIcon: { fontSize: 16 },

  // Tip
  tipBox: {
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    padding: spacings.md,
  },
  tipText: { fontSize: fontSizes.md, lineHeight: 22 },

  // Actions
  actionBtn: {
    paddingVertical: spacings.lg,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacings.md,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: fontSizes.md,
    fontWeight: '600',
  },
});
