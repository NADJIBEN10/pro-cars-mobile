import React, { type ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

interface SellerCardProps {
  sellerName: string;
  sellerCity: string;
  avatarIcon: FeatherIconName;
  children: React.ReactNode;
}

export function SellerCard({ sellerName, sellerCity, avatarIcon, children }: SellerCardProps) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.sellerCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: colors.radius * 1.5,
        },
      ]}
    >
      <View style={[styles.sellerAvatar, { backgroundColor: colors.muted }]}>
        <Feather
          name={avatarIcon}
          size={22}
          color={colors.mutedForeground}
          accessibilityElementsHidden
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.sellerName, { color: colors.foreground, fontFamily: fonts.bodySemiBold }]}>
          {sellerName}
        </Text>
        <Text style={[styles.sellerCity, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
          {sellerCity}
        </Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 4,
    padding: spacing.base,
    borderWidth: 1,
    marginBottom: spacing['2xl'],
  },
  sellerAvatar: {
    width: spacing['4xl'],
    height: spacing['4xl'],
    borderRadius: spacing['4xl'] / 2,
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
