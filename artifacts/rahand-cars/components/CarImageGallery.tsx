import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';

interface CarImageGalleryProps {
  images: string[];
  brand?: string;
}

export function CarImageGallery({ images, brand }: CarImageGalleryProps) {
  const colors = useColors();

  if (images.length > 0) {
    return (
      <Image
        source={{ uri: images[0] }}
        style={styles.image}
        contentFit="cover"
        accessibilityLabel={brand ? `${brand} car photo` : 'Car photo'}
      />
    );
  }

  return (
    <LinearGradient
      colors={[colors.primary + '60', colors.primaryGlow + '30', colors.accent + '20']}
      style={styles.hero}
    >
      <View style={styles.heroIcon}>
        <Feather
          name="camera"
          size={40}
          color={colors.primary + '80'}
          accessibilityElementsHidden
        />
        {brand && (
          <Text style={[styles.heroBrand, { color: colors.primary + '80', fontFamily: fonts.bodyMedium }]}>
            {brand}
          </Text>
        )}
      </View>
    </LinearGradient>
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
  image: {
    width: '100%',
    height: 240,
  },
});
