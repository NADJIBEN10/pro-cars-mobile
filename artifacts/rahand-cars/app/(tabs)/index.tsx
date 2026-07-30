import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
import { fonts, fontSize, lineHeight } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { SearchBar } from '@/components/SearchBar';
import { CarCard } from '@/components/CarCard';
import { CARS, CATEGORIES } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';
import { Badge } from '@/components/ui/Badge';

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const [query, setQuery] = React.useState('');

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="never"
    >
      {/* Hero */}
      <LinearGradient
        colors={['#1B1D2E', '#2A2D4A', '#3A3AA8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: topInset + 16 }]}
      >
        {/* Brand name */}
        <Text style={[styles.brandName, { fontFamily: fonts.display }]}>
          {t.appName}
        </Text>

        <Text style={[styles.heroTitle, { fontFamily: fonts.display }]}>
          {t.heroTitle}
        </Text>

        <Text style={[styles.heroSub, { fontFamily: fonts.bodyRegular }]}>
          {t.heroSub}
        </Text>

        {/* Car counter */}
        <View style={styles.counterRow}>
          <View style={[styles.counterChip, { backgroundColor: colors.accent + '25', borderColor: colors.accent + '50' }]}>
            <Text style={[styles.counterNumber, { color: colors.accent, fontFamily: fonts.display }]}>
              53,970+
            </Text>
            <Text style={[styles.counterLabel, { color: 'rgba(255,255,255,0.75)', fontFamily: fonts.bodyRegular }]}>
              {' '}{t.carsAvailable}
            </Text>
          </View>
        </View>

        {/* Search bar */}
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmit={() => router.push('/(tabs)/search')}
          onFilterPress={() => router.push('/(tabs)/search')}
          style={styles.searchBar}
        />

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <Pressable
            onPress={() => router.push('/(tabs)/search')}
            style={[styles.quickBtn, { backgroundColor: 'rgba(255,255,255,0.12)' }]}
          >
            <Feather name="search" size={14} color="white" />
            <Text style={[styles.quickBtnText, { fontFamily: fonts.bodyMedium }]}>{t.advancedSearch}</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(tabs)/sell')}
            style={[styles.quickBtn, { backgroundColor: colors.accent }]}
          >
            <Feather name="plus-circle" size={14} color="white" />
            <Text style={[styles.quickBtnText, { fontFamily: fonts.bodyMedium }]}>{t.sellCar}</Text>
          </Pressable>
        </View>
      </LinearGradient>

      {/* Categories */}
      <View style={[styles.section, { paddingHorizontal: spacing.pagePadding }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
            {t.categories}
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={[
                styles.categoryChip,
                { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: colors.radius },
              ]}
              onPress={() => router.push('/(tabs)/search')}
            >
              {cat.iconFamily === 'material-community' ? (
                <MaterialCommunityIcons name={cat.icon as any} size={16} color={colors.primary} />
              ) : (
                <Feather name={cat.icon as any} size={16} color={colors.primary} />
              )}
              <Text style={[styles.categoryLabel, { color: colors.foreground, fontFamily: fonts.bodyMedium }]}>
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Popular Cars */}
      <View style={[styles.section, { paddingHorizontal: spacing.pagePadding }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
            {t.popularCars}
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/search')}>
            <Text style={[styles.viewAll, { color: colors.primary, fontFamily: fonts.bodySemiBold }]}>
              {t.viewAll}
            </Text>
          </Pressable>
        </View>

        <View style={styles.carGrid}>
          {CARS.slice(0, 6).map((car) => (
            <View key={car.id} style={styles.carGridItem}>
              <CarCard car={car} />
            </View>
          ))}
        </View>
      </View>

      {/* Sell CTA Banner */}
      <View style={{ paddingHorizontal: spacing.pagePadding, marginBottom: spacing['3xl'] }}>
        <LinearGradient
          colors={[colors.accent, '#E8671C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.ctaBanner, { borderRadius: colors.radius * 1.5 }]}
        >
          <View>
            <Text style={[styles.ctaTitle, { fontFamily: fonts.display }]}>
              {t.sellYourCar}
            </Text>
            <Text style={[styles.ctaSub, { fontFamily: fonts.bodyRegular }]}>
              Reach 1,000+ dealers and buyers
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/(tabs)/sell')}
            style={[styles.ctaBtn, { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: colors.radius }]}
          >
            <Text style={[styles.ctaBtnText, { fontFamily: fonts.bodySemiBold }]}>
              {t.listYourCar}
            </Text>
            <Feather name="arrow-right" size={16} color="white" />
          </Pressable>
        </LinearGradient>
      </View>

      {/* Bottom padding for tab bar */}
      <View style={{ height: Platform.OS === 'web' ? 84 : 90 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing['2xl'],
  },
  brandName: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.sm + 4,
  },
  heroTitle: {
    fontSize: fontSize['4xl'],
    color: '#FFFFFF',
    lineHeight: fontSize['4xl'] * lineHeight.tight,
  },
  heroSub: {
    fontSize: fontSize.base,
    color: 'rgba(255,255,255,0.7)',
    marginTop: spacing.xs + 2,
    lineHeight: fontSize.base * lineHeight.relaxed,
  },
  counterRow: {
    marginTop: spacing.base,
    marginBottom: spacing.lg,
  },
  counterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  counterNumber: {
    fontSize: fontSize.lg,
    color: 'white',
  },
  counterLabel: {
    fontSize: fontSize.sm,
  },
  searchBar: {
    marginBottom: spacing.md + 2,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 1,
    borderRadius: 20,
    minHeight: 36,
  },
  quickBtnText: {
    fontSize: fontSize.sm,
    color: 'white',
  },
  section: {
    paddingTop: spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
  },
  viewAll: {
    fontSize: fontSize.sm,
    minHeight: 36,
    textAlignVertical: 'center',
    paddingHorizontal: spacing.xs,
  },
  categoryScroll: {
    marginHorizontal: -spacing.pagePadding,
    paddingHorizontal: spacing.pagePadding,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 1,
    borderWidth: 1,
    marginRight: spacing.sm,
    minHeight: 36,
  },
  categoryLabel: {
    fontSize: fontSize.sm,
  },
  carGrid: {
    gap: spacing.cardGap,
  },
  carGridItem: {
    // full width cards
  },
  ctaBanner: {
    padding: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.base,
  },
  ctaTitle: {
    fontSize: fontSize.xl,
    color: 'white',
  },
  ctaSub: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 2,
    minHeight: 40,
  },
  ctaBtnText: {
    color: 'white',
    fontSize: fontSize.sm,
  },
});
