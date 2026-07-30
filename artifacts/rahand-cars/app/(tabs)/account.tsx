import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Platform,
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
import { useI18n } from '@/lib/i18n';

type MenuItem = {
  icon: string;
  label: string;
  desc: string;
  onPress: () => void;
  accent?: boolean;
};

export default function AccountScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  const menuSections: { title: string; items: MenuItem[] }[] = [
    {
      title: 'My Activity',
      items: [
        {
          icon: 'list',
          label: t.myListings,
          desc: 'Manage your car listings',
          onPress: () => {},
        },
        {
          icon: 'heart',
          label: t.favorites,
          desc: 'Cars you saved',
          onPress: () => router.push('/(tabs)/favorites'),
        },
        {
          icon: 'message-circle',
          label: t.messages,
          desc: 'Chat with buyers & sellers',
          onPress: () => {},
        },
        {
          icon: 'bookmark',
          label: t.savedSearches,
          desc: 'Saved searches & alerts',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: 'globe',
          label: t.language,
          desc: 'English / Arabic / Kurdish',
          onPress: () => router.push('/settings'),
        },
        {
          icon: 'moon',
          label: t.darkMode,
          desc: 'Theme preference',
          // TODO: Navigate to a dedicated Appearance screen in a future sprint.
          // For now, dark mode follows the system color scheme via useColorScheme().
          onPress: () => router.push('/settings'),
        },
        {
          icon: 'settings',
          label: t.settings,
          desc: 'App settings',
          onPress: () => router.push('/settings'),
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: 'help-circle',
          label: 'Help & Support',
          desc: 'Get help from our team',
          onPress: () => {},
        },
        {
          icon: 'log-in',
          label: t.signIn,
          desc: 'Sign in to your account',
          onPress: () => router.push('/auth'),
          accent: true,
        },
      ],
    },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 16, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
          {t.account}
        </Text>
      </View>

      {/* Guest banner */}
      <View style={[styles.guestBanner, { backgroundColor: colors.card, borderColor: colors.border, margin: spacing.pagePadding, borderRadius: colors.radius * 1.5 }]}>
        <View style={[styles.avatar, { backgroundColor: colors.muted }]}>
          <Feather name="user" size={28} color={colors.mutedForeground} />
        </View>
        <View style={styles.guestInfo}>
          <Text style={[styles.guestTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
            Welcome to Rahand Cars
          </Text>
          <Text style={[styles.guestSub, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
            {t.signInToContinue}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/auth')}
          style={[styles.signInBtn, { backgroundColor: colors.primary, borderRadius: colors.radius }]}
        >
          <Text style={[styles.signInBtnText, { color: colors.primaryForeground, fontFamily: fonts.bodySemiBold }]}>
            {t.signIn}
          </Text>
        </Pressable>
      </View>

      {/* Menu sections */}
      {menuSections.map((section) => (
        <View key={section.title} style={[styles.section, { paddingHorizontal: spacing.pagePadding }]}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground, fontFamily: fonts.bodyMedium }]}>
            {section.title.toUpperCase()}
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius * 1.5 }]}>
            {section.items.map((item, i) => (
              <React.Fragment key={item.label}>
                <Pressable
                  onPress={item.onPress}
                  style={({ pressed }) => [
                    styles.menuItem,
                    { opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.accent ? colors.primary + '15' : colors.muted }]}>
                    <Feather
                      name={item.icon as any}
                      size={18}
                      color={item.accent ? colors.primary : colors.foreground}
                    />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={[styles.menuLabel, { color: item.accent ? colors.primary : colors.foreground, fontFamily: fonts.bodyMedium }]}>
                      {item.label}
                    </Text>
                    <Text style={[styles.menuDesc, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
                      {item.desc}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
                </Pressable>
                {i < section.items.length - 1 && (
                  <View style={[styles.divider, { backgroundColor: colors.border }]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}

      {/* App version */}
      <Text style={[styles.version, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
        Rahand Cars v1.0.0
      </Text>

      <View style={{ height: Platform.OS === 'web' ? 84 : 90 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: fontSize['2xl'],
  },
  guestBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: spacing.base,
    borderWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  guestInfo: {
    flex: 1,
  },
  guestTitle: {
    fontSize: fontSize.base,
    marginBottom: 2,
  },
  guestSub: {
    fontSize: fontSize.sm,
  },
  signInBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexShrink: 0,
  },
  signInBtnText: {
    fontSize: fontSize.sm,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  sectionCard: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: spacing.base,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuText: {
    flex: 1,
  },
  menuLabel: {
    fontSize: fontSize.base,
    marginBottom: 2,
  },
  menuDesc: {
    fontSize: fontSize.xs,
  },
  divider: {
    height: 1,
    marginLeft: 66,
  },
  version: {
    textAlign: 'center',
    fontSize: fontSize.xs,
    paddingBottom: spacing.lg,
  },
});
