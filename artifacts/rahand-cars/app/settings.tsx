import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { useI18n, type Language } from '@/lib/i18n';

const LANGUAGES: { code: Language; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇮🇶' },
  { code: 'ku', label: 'Kurdish', native: 'کوردی', flag: '🏴' },
];

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t, language, setLanguage } = useI18n();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Language section */}
      <View style={[styles.section, { paddingHorizontal: spacing.pagePadding }]}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground, fontFamily: fonts.bodyMedium }]}>
          {t.language.toUpperCase()}
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius * 1.5 }]}>
          {LANGUAGES.map((lang, i) => (
            <React.Fragment key={lang.code}>
              <Pressable
                onPress={() => setLanguage(lang.code)}
                style={[styles.langRow, { opacity: 1 }]}
              >
                <View style={styles.langInfo}>
                  <Text style={[styles.langNative, { color: colors.foreground, fontFamily: fonts.bodySemiBold }]}>
                    {lang.native}
                  </Text>
                  <Text style={[styles.langLabel, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
                    {lang.label}
                  </Text>
                </View>
                {language === lang.code && (
                  <Feather name="check-circle" size={20} color={colors.success} />
                )}
              </Pressable>
              {i < LANGUAGES.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        <View style={[styles.notice, { backgroundColor: colors.warning + '15', borderRadius: colors.radius }]}>
          <Feather name="refresh-cw" size={14} color={colors.warning} />
          <Text style={[styles.noticeText, { color: colors.warning, fontFamily: fonts.bodyRegular }]}>
            Switching to Arabic or Kurdish will restart the app to apply RTL layout.
          </Text>
        </View>
      </View>

      {/* About */}
      <View style={[styles.section, { paddingHorizontal: spacing.pagePadding }]}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground, fontFamily: fonts.bodyMedium }]}>
          ABOUT
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius * 1.5 }]}>
          {[
            { label: 'App Name', value: 'Rahand Cars' },
            { label: 'Version', value: '1.0.0 (Phase 1)' },
            { label: 'Market', value: 'Iraq & Kurdistan' },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              <View style={styles.infoRow}>
                <Text style={[styles.infoLabel, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
                  {item.label}
                </Text>
                <Text style={[styles.infoValue, { color: colors.foreground, fontFamily: fonts.bodyMedium }]}>
                  {item.value}
                </Text>
              </View>
              {i < 2 && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    justifyContent: 'space-between',
  },
  langInfo: {
    gap: 2,
  },
  langNative: {
    fontSize: fontSize.base,
  },
  langLabel: {
    fontSize: fontSize.sm,
  },
  divider: {
    height: 1,
    marginHorizontal: spacing.base,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    marginTop: spacing.sm,
  },
  noticeText: {
    flex: 1,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * 1.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.base,
  },
  infoLabel: {
    fontSize: fontSize.base,
  },
  infoValue: {
    fontSize: fontSize.base,
  },
});
