import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { CARS, formatMileage, formatPriceUSD, getFuelLabel } from '@/lib/mock-data';
import { Badge } from '@/components/ui/Badge';
import { LinearGradient } from 'expo-linear-gradient';
import { CarCard } from '@/components/CarCard';

export default function CarDetailScreen() {
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const car = CARS.find((c) => c.id === id) ?? CARS[0];

  const similar = CARS.filter((c) => c.id !== car.id && c.category === car.category).slice(0, 3);

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
          <Text style={[styles.heroBrand, { color: colors.primary + '80', fontFamily: fonts.displayMedium }]}>
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
        <View style={[styles.specsGrid, { borderColor: colors.border, borderRadius: colors.radius }]}>
          {[
            { icon: 'calendar', label: 'Year', value: String(car.year) },
            { icon: 'activity', label: 'Mileage', value: formatMileage(car.mileageKm) },
            { icon: 'zap', label: 'Fuel', value: getFuelLabel(car.fuelType) },
            { icon: 'settings', label: 'Trans.', value: car.transmission === 'automatic' ? 'Auto' : 'Manual' },
            { icon: 'cpu', label: 'Engine', value: car.engineCc > 0 ? `${(car.engineCc / 1000).toFixed(1)}L` : 'Electric' },
            { icon: 'trending-up', label: 'HP', value: `${car.horsepower} hp` },
          ].map((spec, i) => (
            <View
              key={i}
              style={[
                styles.specCell,
                {
                  borderColor: colors.border,
                  borderRightWidth: (i + 1) % 3 === 0 ? 0 : 1,
                  borderBottomWidth: i < 3 ? 1 : 0,
                },
              ]}
            >
              <Feather name={spec.icon as any} size={16} color={colors.primary} />
              <Text style={[styles.specLabel, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
                {spec.label}
              </Text>
              <Text style={[styles.specValue, { color: colors.foreground, fontFamily: fonts.bodySemiBold }]}>
                {spec.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Features */}
        {car.features.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
              Features
            </Text>
            <View style={styles.featuresWrap}>
              {car.features.map((f) => (
                <View key={f} style={[styles.featureChip, { backgroundColor: colors.secondary, borderRadius: 20 }]}>
                  <Feather name="check" size={12} color={colors.success} />
                  <Text style={[styles.featureText, { color: colors.foreground, fontFamily: fonts.bodyRegular }]}>
                    {f}
                  </Text>
                </View>
              ))}
            </View>
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
          <View style={styles.contactBtns}>
            <View style={[styles.contactBtn, { backgroundColor: colors.success + '20' }]}>
              <Feather name="phone" size={18} color={colors.success} />
            </View>
            <View style={[styles.contactBtn, { backgroundColor: '#25D366' + '20' }]}>
              <Feather name="message-circle" size={18} color="#25D366" />
            </View>
          </View>
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

        <View style={{ height: 40 }} />
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
    gap: 8,
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
    gap: 12,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: fontSize['2xl'],
    marginBottom: 8,
    lineHeight: fontSize['2xl'] * 1.2,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: fontSize['2xl'],
    textAlign: 'right',
  },
  priceIqd: {
    fontSize: fontSize.xs,
    textAlign: 'right',
    marginTop: 2,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing['2xl'],
  },
  specCell: {
    width: '33.33%',
    padding: 14,
    alignItems: 'center',
    gap: 4,
  },
  specLabel: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  specValue: {
    fontSize: fontSize.sm,
  },
  section: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    marginBottom: spacing.md,
  },
  featuresWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  featureText: {
    fontSize: fontSize.sm,
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    marginTop: 2,
  },
  contactBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  contactBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
