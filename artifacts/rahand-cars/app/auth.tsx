import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useI18n } from '@/lib/i18n';

type Tab = 'signIn' | 'signUp';

export default function AuthScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Brand header */}
      <LinearGradient
        colors={['#1B1D2E', '#3A3AA8']}
        style={[styles.brandHeader, { paddingTop: insets.top + 30 }]}
      >
        <Text style={[styles.brandName, { fontFamily: fonts.display }]}>Rahand Cars</Text>
        <Text style={[styles.brandSub, { fontFamily: fonts.bodyRegular }]}>
          Iraq & Kurdistan's Car Marketplace
        </Text>
      </LinearGradient>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {/* Tab switcher */}
        <View style={[styles.tabs, { backgroundColor: colors.secondary, borderRadius: colors.radius }]}>
          {(['signIn', 'signUp'] as Tab[]).map((t_) => (
            <Pressable
              key={t_}
              onPress={() => setTab(t_)}
              style={[
                styles.tab,
                {
                  backgroundColor: tab === t_ ? colors.primary : 'transparent',
                  borderRadius: colors.radius - 2,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: tab === t_ ? colors.primaryForeground : colors.mutedForeground,
                    fontFamily: fonts.bodySemiBold,
                  },
                ]}
              >
                {t_ === 'signIn' ? t.signIn : t.signUp}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Form */}
        <View style={styles.form}>
          {tab === 'signUp' && (
            <Input
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Ahmed Al-Rashid"
              autoCapitalize="words"
              leftIcon={<Feather name="user" size={16} color={colors.mutedForeground} />}
            />
          )}
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="hello@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Feather name="mail" size={16} color={colors.mutedForeground} />}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            leftIcon={<Feather name="lock" size={16} color={colors.mutedForeground} />}
          />

          <Button
            label={tab === 'signIn' ? t.signIn : t.signUp}
            onPress={() => {}}
            fullWidth
            size="lg"
          />
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
            or continue with
          </Text>
          <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        </View>

        {/* Google button */}
        <Pressable
          style={[styles.googleBtn, { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: colors.radius }]}
          onPress={() => {}}
        >
          <Feather name="globe" size={18} color={colors.foreground} />
          <Text style={[styles.googleBtnText, { color: colors.foreground, fontFamily: fonts.bodySemiBold }]}>
            Continue with Google
          </Text>
        </Pressable>

        {/* Note — Supabase required */}
        <View style={[styles.notice, { backgroundColor: colors.warning + '15', borderRadius: colors.radius }]}>
          <Feather name="info" size={14} color={colors.warning} />
          <Text style={[styles.noticeText, { color: colors.warning, fontFamily: fonts.bodyRegular }]}>
            Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to enable authentication.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  brandHeader: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing['2xl'],
    alignItems: 'center',
    gap: 6,
  },
  brandName: {
    fontSize: fontSize['3xl'],
    color: 'white',
  },
  brandSub: {
    fontSize: fontSize.base,
    color: 'rgba(255,255,255,0.7)',
  },
  card: {
    margin: spacing.pagePadding,
    borderRadius: 20,
    borderWidth: 1,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  tabs: {
    flexDirection: 'row',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: fontSize.base,
  },
  form: {
    gap: spacing.md,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: fontSize.sm,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 48,
    borderWidth: 1,
  },
  googleBtnText: {
    fontSize: fontSize.base,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs * 1.5,
  },
});
