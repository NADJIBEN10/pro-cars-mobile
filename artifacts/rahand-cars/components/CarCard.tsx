import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useFavorites } from '@/lib/favorites';
import { formatMileage, formatPriceUSD, type MockCar } from '@/lib/mock-data';
import { useColors } from '@/hooks/useColors';
import { Badge } from './ui/Badge';

interface CarCardProps {
  car: MockCar;
  /** Compact horizontal layout for lists */
  horizontal?: boolean;
}

export function CarCard({ car, horizontal = false }: CarCardProps) {
  const colors = useColors();
  const { isFavorite, toggle } = useFavorites();
  const liked = isFavorite(car.id);

  const handlePress = () => {
    router.push(`/car/${car.id}`);
  };

  const handleFavorite = (e: { stopPropagation?: () => void }) => {
    toggle(car.id);
  };

  if (horizontal) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.horizontal,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
            opacity: pressed ? 0.92 : 1,
          },
        ]}
      >
        {/* Thumbnail */}
        <View style={[styles.thumb, { borderRadius: colors.radius - 2, backgroundColor: colors.muted }]}>
          {car.coverImage ? (
            <Image source={{ uri: car.coverImage }} style={StyleSheet.absoluteFill} contentFit="cover" />
          ) : (
            <LinearGradient
              colors={[colors.primary + '40', colors.primaryGlow + '20']}
              style={StyleSheet.absoluteFill}
            />
          )}
          <View style={styles.thumbIconWrap}>
            <Feather name="image" size={20} color={colors.mutedForeground} />
          </View>
        </View>

        {/* Info */}
        <View style={styles.hInfo}>
          <Text
            style={[styles.title, { color: colors.foreground, fontFamily: fonts.displayMedium }]}
            numberOfLines={1}
          >
            {car.title}
          </Text>
          <View style={styles.metaRow}>
            <Feather name="map-pin" size={11} color={colors.mutedForeground} />
            <Text style={[styles.meta, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {' '}{car.city}
            </Text>
            <Text style={[styles.meta, { color: colors.mutedForeground }]}> · </Text>
            <Text style={[styles.meta, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {car.year}
            </Text>
            <Text style={[styles.meta, { color: colors.mutedForeground }]}> · </Text>
            <Text style={[styles.meta, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {formatMileage(car.mileageKm)}
            </Text>
          </View>
          <Text style={[styles.price, { color: colors.primary, fontFamily: fonts.display }]}>
            {formatPriceUSD(car.priceUsd)}
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: colors.radius * 1.5,
          transform: [{ translateY: pressed ? 2 : 0 }],
        },
      ]}
    >
      {/* Image area */}
      <View style={[styles.imageContainer, { borderRadius: colors.radius, backgroundColor: colors.muted }]}>
        {car.coverImage ? (
          <Image source={{ uri: car.coverImage }} style={StyleSheet.absoluteFill} contentFit="cover" />
        ) : (
          <LinearGradient
            colors={[colors.primary + '50', colors.primaryGlow + '30', colors.accent + '20']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}

        {/* No-image placeholder */}
        {!car.coverImage && (
          <View style={styles.placeholderIcon}>
            <Feather name="camera" size={28} color={colors.primary + '80'} />
            <Text style={[styles.placeholderBrand, { color: colors.primary + '80', fontFamily: fonts.displayMedium }]}>
              {car.brand}
            </Text>
          </View>
        )}

        {/* Top row: seller badge + favorite */}
        <View style={styles.imageOverlay}>
          <Badge
            label={car.sellerType === 'dealer' ? 'Dealer' : 'Private'}
            variant={car.sellerType === 'dealer' ? 'primary' : 'default'}
          />
          <Pressable
            onPress={handleFavorite}
            hitSlop={12}
            style={[styles.heartBtn, { backgroundColor: colors.card + 'CC' }]}
          >
            <Feather
              name="heart"
              size={16}
              color={liked ? colors.destructive : colors.foreground}
              style={liked ? { opacity: 1 } : { opacity: 0.7 }}
            />
          </Pressable>
        </View>
      </View>

      {/* Card body */}
      <View style={styles.body}>
        <Text
          style={[styles.cardTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}
          numberOfLines={1}
        >
          {car.title}
        </Text>

        {/* Specs row */}
        <View style={styles.specRow}>
          <View style={styles.spec}>
            <Feather name="calendar" size={11} color={colors.mutedForeground} />
            <Text style={[styles.specText, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {' '}{car.year}
            </Text>
          </View>
          <View style={styles.specDot} />
          <View style={styles.spec}>
            <Feather name="activity" size={11} color={colors.mutedForeground} />
            <Text style={[styles.specText, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {' '}{formatMileage(car.mileageKm)}
            </Text>
          </View>
          <View style={styles.specDot} />
          <View style={styles.spec}>
            <Feather name="map-pin" size={11} color={colors.mutedForeground} />
            <Text style={[styles.specText, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              {' '}{car.city}
            </Text>
          </View>
        </View>

        {/* Price row */}
        <View style={styles.priceRow}>
          <Text style={[styles.cardPrice, { color: colors.primary, fontFamily: fonts.display }]}>
            {formatPriceUSD(car.priceUsd)}
          </Text>
          {car.isVerified && (
            <View style={[styles.verifiedChip, { backgroundColor: colors.success + '20' }]}>
              <Feather name="check-circle" size={11} color={colors.success} />
              <Text style={[styles.verifiedText, { color: colors.success, fontFamily: fonts.bodyMedium }]}>
                {' '}Verified
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Vertical card
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 180,
    overflow: 'hidden',
    position: 'relative',
    margin: 10,
  },
  imageOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heartBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  placeholderBrand: {
    fontSize: fontSize.sm,
  },
  body: {
    padding: 12,
    paddingTop: 4,
    gap: 6,
  },
  cardTitle: {
    fontSize: fontSize.md,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    fontSize: fontSize.xs,
  },
  specDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#ccc',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  cardPrice: {
    fontSize: fontSize.lg,
  },
  verifiedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
  },
  verifiedText: {
    fontSize: fontSize.xs,
  },

  // Horizontal card
  horizontal: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: spacing.sm,
    gap: spacing.sm,
    alignItems: 'center',
  },
  thumb: {
    width: 90,
    height: 70,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbIconWrap: {
    position: 'absolute',
  },
  hInfo: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: fontSize.base,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  meta: {
    fontSize: fontSize.xs,
  },
  price: {
    fontSize: fontSize.md,
  },
});
