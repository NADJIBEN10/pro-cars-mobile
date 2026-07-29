import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'destructive'
  | 'outline';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'default', style }: BadgeProps) {
  const colors = useColors();

  const config: Record<BadgeVariant, { bg: string; text: string; border?: string }> = {
    default: { bg: colors.secondary, text: colors.secondaryForeground },
    primary: { bg: colors.primary + '20', text: colors.primary },
    accent: { bg: colors.accent + '20', text: colors.accent },
    success: { bg: colors.success + '20', text: colors.success },
    warning: { bg: colors.warning + '20', text: colors.warning },
    destructive: { bg: colors.destructive + '20', text: colors.destructive },
    outline: { bg: 'transparent', text: colors.foreground, border: colors.border },
  };

  const { bg, text, border } = config[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: bg,
          borderRadius: colors.radius / 2,
          borderWidth: border ? 1 : 0,
          borderColor: border ?? 'transparent',
        },
        style,
      ]}
    >
      <Text style={[styles.label, { color: text, fontFamily: fonts.bodyMedium }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: fontSize.xs,
    letterSpacing: 0.2,
  },
});
