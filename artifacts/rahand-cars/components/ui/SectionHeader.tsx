import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize, lineHeight } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';

interface SectionHeaderProps {
  /** Main section title */
  title: string;
  /** Optional subtitle displayed below the title */
  subtitle?: string;
  /** Optional action label (e.g., "View All") */
  actionLabel?: string;
  /** Optional handler for the action button */
  onPress?: () => void;
}

export function SectionHeader({ title, subtitle, actionLabel, onPress }: SectionHeaderProps) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text
          style={[styles.title, { color: colors.foreground, fontFamily: fonts.displayMedium }]}
          accessibilityRole="header"
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {actionLabel && onPress && (
        <Pressable
          onPress={onPress}
          hitSlop={spacing.sm}
          style={styles.actionBtn}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={[styles.actionText, { color: colors.primary, fontFamily: fonts.bodySemiBold }]}>
            {actionLabel}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    minHeight: 36,
  },
  textWrap: {
    flex: 1,
    gap: spacing.xs - 2,
  },
  title: {
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * lineHeight.tight,
  },
  subtitle: {
    fontSize: fontSize.sm,
    lineHeight: fontSize.sm * lineHeight.normal,
  },
  actionBtn: {
    paddingHorizontal: spacing.xs,
    minHeight: 36,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: fontSize.sm,
  },
});