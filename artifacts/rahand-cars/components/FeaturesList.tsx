import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';

interface FeaturesListProps {
  features: string[];
}

export function FeaturesList({ features }: FeaturesListProps) {
  const colors = useColors();

  if (features.length === 0) return null;

  return (
    <View style={styles.featuresWrap}>
      {features.map((f) => (
        <View
          key={f}
          style={[styles.featureChip, { backgroundColor: colors.secondary, borderRadius: 20 }]}
          accessibilityLabel={f}
        >
          <Feather
            name="check"
            size={12}
            color={colors.success}
            accessibilityElementsHidden
          />
          <Text style={[styles.featureText, { color: colors.foreground, fontFamily: fonts.bodyRegular }]}>
            {f}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  featuresWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 1,
  },
  featureText: {
    fontSize: fontSize.sm,
  },
});
