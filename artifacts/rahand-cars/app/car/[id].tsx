import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize, lineHeight } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { CARS, formatMileage, formatPriceUSD, getFuelLabel } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { LinearGradient } from 'expo-linear-gradient';
import { CarCard } from '@/components/CarCard';
import { SpecsGrid, type SpecItem } from '@/components/SpecsGrid';
import { FeaturesList } from '@/components/FeaturesList';
import { ContactButtons } from '@/components/ContactButtons';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useI18n } from '@/lib/i18n';

export default function CarDetailScreen() {
  const colors = useColors();
  const { t } = useI18n();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = CARS.find((c) => c.id === id) ?? CARS[0];

  const similar = CARS.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);

  const specs: SpecItem[] = [
    { icon: 'calendar', label: 'Year', value: String(car.year) },
    { icon: 'activity', label: 'Mileage', value: formatMileage(car.mileageKm) },
    { icon: 'zap', label: 'Fuel', value: getFuelLabel(car.fuelType) },
    { icon: 'settings', label: 'Trans.', value: car.transmission === 'automatic' ? 'Auto' : 'Manual' },
    { icon: 'cpu', label: 'Engine', value: car.engineCc > 0 ? `${(car.engineCc / 1000).toFixed(1)}L` : 'Electric' },
    { icon: 'trending-up', label: 'HP', value: `${car.horsepower} hp` },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero image placeholder */}
      <LinearGradient
        colors={[colors.primary + '60', colors.primaryGlow + '30', colors.accent + '20']}
        style={styles.hero}
      >
        <View style={styles.heroIcon}>
          <Feather name="camera" size={40} color={colors.primary + '80'} />
          <Text style={[styles.heroBrand, { color: colors.primary + '80', fontFamily: fonts.bodyMedium }]}>
            {car.brand}
          </Text>
        </View>
      </LinearGradient>

      <View style={[styles.content, { paddingHorizontal: spacing.pagePadding }]}>
        {/* Title & Price */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.display }]}>
              {car.title}
            </Text>
            <View style={styles.badgeRow}>
              <Badge label={car.sellerType === 'dealer' ? 'Dealer' : 'Private'} variant="primary" />
              {car.isVerified && <Badge label="Verified" variant="success" />}
              <Badge label={car.city} variant="default" />
            </View>
          </View>
          <View>
            <Text style={[styles.price, { color: colors.primary, fontFamily: fonts.display }]}>
              {formatPriceUSD(car.priceUsd)}
            </Text>
            <Text style={[styles.priceIqd, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {car.priceIqd.toLocaleString()} IQD
            </Text>
          </View>
        </View>

        {/* Key specs grid */}
        <SpecsGrid specs={specs} />

        {/* Description */}
        {car.description && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
              Description
            </Text>
            <Text style={[styles.descriptionText, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {car.description}
            </Text>
          </View>
        )}

        {/* Features */}
        {car.features.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title={t.features} />
            <FeaturesList features={car.features} />
          </View>
        )}

        {/* Seller card */}
        <View style={[styles.sellerCard, { backgroundColor: colors.card, borderColor: colors.border, borderRadius: colors.radius * 1.5 }]}>
          <View style={[styles.sellerAvatar, { backgroundColor: colors.muted }]}>
            <Feather name={car.sellerType === 'dealer' ? 'briefcase' : 'user'} size={22} color={colors.mutedForeground} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.sellerName, { color: colors.foreground, fontFamily: fonts.bodySemiBold }]}>
              {car.sellerType === 'dealer' ? 'Authorized Dealer' : 'Private Seller'}
            </Text>
            <Text style={[styles.sellerCity, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {car.city}
            </Text>
          </View>
          <ContactButtons
            buttons={[
              {
                icon: 'phone',
                label: t.call,
                color: colors.success,
                onPress: () => {
                  /* TODO: Link.to tel: */
                },
              },
              {
                icon: 'message-circle',
                label: t.whatsapp,
                color: '#25D366',
                onPress: () => {
                  /* TODO: Link.to WhatsApp */
                },
              },
            ]}
          />
        </View>

        {/* Similar cars */}
        {similar.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
              Similar Cars
            </Text>
            <View style={{ gap: spacing.cardGap }}>
              {similar.map((c) => (
                <CarCard key={c.id} car={c} horizontal />
              ))}
            </View>
          </View>
        )}

        <View style={{ height: spacing['3xl'] }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  heroBrand: {
    fontSize: fontSize.xl,
  },
  content: {
    paddingTop: spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.sm + 4,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize['2xl'],
    marginBottom: spacing.sm,
    lineHeight: fontSize['2xl'] * lineHeight.tight,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: spacing.xs + 2,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: fontSize['2xl'],
    textAlign: 'right',
  },
  priceIqd: {
    fontSize: fontSize.xs,
    textAlign: 'right',
    marginTop: spacing.xs - 2,
  },
  section: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.relaxed,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
    padding: spacing.base,
    borderWidth: 1,
    marginBottom: spacing['2xl'],
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellerName: {
    fontSize: fontSize.base,
  },
  sellerCity: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs - 2,
  },
});
