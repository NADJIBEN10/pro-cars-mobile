import React, { type ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

export interface SpecItem {
  icon: FeatherIconName;
  label: string;
  value: string;
}

interface SpecsGridProps {
  specs: SpecItem[];
}

export function SpecsGrid({ specs }: SpecsGridProps) {
  const colors = useColors();

  return (
    <View style={[styles.specsGrid, { borderColor: colors.border, borderRadius: colors.radius }]}>
      {specs.map((spec, i) => (
        <View
          key={spec.label}
          style={[
            styles.specCell,
            {
              borderColor: colors.border,
              borderRightWidth: (i + 1) % 3 === 0 ? 0 : 1,
              borderBottomWidth: i < 3 ? 1 : 0,
            },
          ]}
          accessibilityLabel={`${spec.label}: ${spec.value}`}
        >
          <Feather name={spec.icon} size={16} color={colors.primary} />
          <Text style={[styles.specLabel, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
            {spec.label}
          </Text>
          <Text style={[styles.specValue, { color: colors.foreground, fontFamily: fonts.bodySemiBold }]}>
            {spec.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: spacing['2xl'],
  },
  specCell: {
    width: '33.33%',
    padding: spacing.sm + 2,
    alignItems: 'center',
    gap: spacing.xs,
  },
  specLabel: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs - 2,
  },
  specValue: {
    fontSize: fontSize.sm,
  },
});
