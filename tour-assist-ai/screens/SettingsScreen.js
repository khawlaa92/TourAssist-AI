/**
 * SettingsScreen.js — Paramètres et Préférences
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../src/context/ThemeContext';
import { Header } from '../src/components/Header';
import { spacings, fontSizes, borderRadius } from '../constants/theme';

export const SettingsScreen = ({ navigation }) => {
  const { theme, isDark, toggleTheme } = useContext(ThemeContext);

  // ── Réinitialiser les données ──
  const handleClearData = () => {
    Alert.alert(
      '⚠️ Réinitialiser les données',
      'Cela supprimera votre historique de chat, traductions et visites. Cette action est irréversible.',
      [
        { text: 'Annuler', onPress: () => {}, style: 'cancel' },
        {
          text: 'Réinitialiser',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@chat_history');
              await AsyncStorage.removeItem('@translation_history');
              await AsyncStorage.removeItem('@sites_visited');
              Alert.alert('✅ Succès', 'Vos données ont été réinitialisées.');
            } catch (_error) {
              Alert.alert('❌ Erreur', 'Impossible de réinitialiser les données.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  // ── Déconnexion ──
  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', onPress: () => {}, style: 'cancel' },
        {
          text: 'Déconnexion',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@user_name');
              navigation.getParent()?.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Erreur déconnexion:', error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="⚙️ Paramètres" showBack={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Section: Apparence ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Apparence</Text>

          <View
            style={[
              styles.settingItem,
              { backgroundColor: theme.card || theme.background, borderColor: theme.divider },
            ]}
          >
            <View style={styles.settingLeft}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>🌓 Mode sombre</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                {isDark ? 'Activé' : 'Désactivé'}
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#D0D0D0', true: theme.primary }}
              thumbColor={isDark ? theme.primary : '#F0F0F0'}
            />
          </View>
        </View>

        {/* ── Section: À propos de l'application ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>À propos</Text>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { backgroundColor: theme.card || theme.background, borderColor: theme.divider },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>📱 Version</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                TourAssist AI v1.0.0
              </Text>
            </View>
            <Text style={[{ color: theme.textSecondary }, { fontSize: fontSizes.lg }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { backgroundColor: theme.card || theme.background, borderColor: theme.divider },
            ]}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL('https://exemple.com/privacy')
            }
          >
            <View style={styles.settingLeft}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>📜 Politique de confidentialité</Text>
            </View>
            <Text style={[{ color: theme.textSecondary }, { fontSize: fontSizes.lg }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingItem,
              { backgroundColor: theme.card || theme.background, borderColor: theme.divider },
            ]}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL('https://exemple.com/terms')
            }
          >
            <View style={styles.settingLeft}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>⚖️ Conditions d&apos;utilisation</Text>
            </View>
            <Text style={[{ color: theme.textSecondary }, { fontSize: fontSizes.lg }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ── Section: Données ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Données</Text>

          <TouchableOpacity
            onPress={handleClearData}
            style={[
              styles.settingItem,
              { backgroundColor: theme.card || theme.background, borderColor: theme.divider },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={[styles.settingLabel, { color: '#f44336' }]}>🗑️ Réinitialiser les données</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Supprimer l&apos;historique et les préférences
              </Text>
            </View>
            <Text style={[{ color: '#f44336' }, { fontSize: fontSizes.lg }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* ── Section: Compte ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Compte</Text>

          <TouchableOpacity
            onPress={handleLogout}
            style={[
              styles.settingItem,
              { backgroundColor: theme.card || theme.background, borderColor: theme.divider },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={[styles.settingLabel, { color: '#c41e3a' }]}>🚪 Déconnexion</Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                Quitter votre compte
              </Text>
            </View>
            <Text style={[{ color: '#c41e3a' }, { fontSize: fontSizes.lg }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Merci d&apos;utiliser TourAssist AI 🇹🇳
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary, fontSize: fontSizes.xs }]}>
            Votre guide touristique intelligent
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingVertical: spacings.md,
    paddingBottom: spacings.xl * 5,
  },

  section: {
    marginBottom: spacings.xl,
    paddingHorizontal: spacings.lg,
  },

  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    marginBottom: spacings.md,
  },

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacings.lg,
    paddingVertical: spacings.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacings.sm,
    borderWidth: 1,
  },

  settingLeft: {
    flex: 1,
    marginRight: spacings.md,
  },

  settingLabel: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    marginBottom: spacings.xs,
  },

  settingDescription: {
    fontSize: fontSizes.sm,
    lineHeight: 18,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: spacings.xl,
    marginTop: spacings.xl,
  },

  footerText: {
    fontSize: fontSizes.sm,
    textAlign: 'center',
    marginVertical: spacings.xs,
  },
});
