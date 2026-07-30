import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize, lineHeight } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { CARS, formatMileage, formatPriceUSD, getFuelLabel } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { CarCard } from '@/components/CarCard';
import { SpecsGrid, type SpecItem } from '@/components/SpecsGrid';
import { FeaturesList } from '@/components/FeaturesList';
import { ContactButtons } from '@/components/ContactButtons';
import { CarImageGallery } from '@/components/CarImageGallery';
import { SellerCard } from '@/components/SellerCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useI18n } from '@/lib/i18n';

export default function CarDetailScreen() {
  const colors = useColors();
  const { t } = useI18n();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = CARS.find((c) => c.id === id) ?? CARS[0];

  const similar = CARS.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);

  const specs: SpecItem[] = [
    { icon: 'calendar', label: t.year, value: String(car.year) },
    { icon: 'activity', label: t.mileage, value: formatMileage(car.mileageKm) },
    { icon: 'zap', label: 'Fuel', value: getFuelLabel(car.fuelType) },
    { icon: 'settings', label: 'Trans.', value: car.transmission === 'automatic' ? 'Auto' : 'Manual' },
    { icon: 'cpu', label: t.engine, value: car.engineCc > 0 ? `${(car.engineCc / 1000).toFixed(1)}L` : 'Electric' },
    { icon: 'trending-up', label: 'HP', value: `${car.horsepower} hp` },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero image */}
      <CarImageGallery images={car.coverImage ? [car.coverImage] : []} brand={car.brand} />

      <View style={[styles.content, { paddingHorizontal: spacing.pagePadding }]}>
        {/* Title & Price */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.display }]}>
              {car.title}
            </Text>
            <View style={styles.badgeRow}>
              <Badge label={car.sellerType === 'dealer' ? t.dealer : t.private} variant="primary" />
              {car.isVerified && <Badge label={t.verified} variant="success" />}
              <Badge label={car.city} variant="default" />
            </View>
          </View>
          <View>
            <Text style={[styles.price, { color: colors.primary, fontFamily: fonts.display }]}>
              {formatPriceUSD(car.priceUsd)}
            </Text>
            <Text style={[styles.priceIqd, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {car.priceIqd.toLocaleString()} {t.iqdUnit}
            </Text>
          </View>
        </View>

        {/* Key specs grid */}
        <SpecsGrid specs={specs} />

        {/* Description */}
        {car.description && (
          <View style={styles.section}>
            <SectionHeader title="Description" />
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
        <SellerCard
          sellerName={car.sellerType === 'dealer' ? 'Authorized Dealer' : 'Private Seller'}
          sellerCity={car.city}
          avatarIcon={car.sellerType === 'dealer' ? 'briefcase' : 'user'}
        >
          <ContactButtons
            buttons={[
              {
                id: 'call',
                icon: 'phone',
                label: t.call,
                color: colors.success,
                onPress: () => {
                  /* TODO: Link.to tel: */
                },
              },
              {
                id: 'whatsapp',
                icon: 'message-circle',
                label: t.whatsapp,
                color: '#25D366',
                onPress: () => {
                  /* TODO: Link.to WhatsApp */
                },
              },
            ]}
          />
        </SellerCard>

        {/* Similar cars */}
        {similar.length > 0 && (
          <View style={styles.section}>
            <SectionHeader title={t.similar} />
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
  descriptionText: {
    fontSize: fontSize.base,
    lineHeight: fontSize.base * lineHeight.relaxed,
  },
});
