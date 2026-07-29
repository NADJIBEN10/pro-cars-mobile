import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, type ViewStyle } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width = '100%',
  height = 16,
  borderRadius,
  style,
}: SkeletonProps) {
  const colors = useColors();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: borderRadius ?? colors.radius,
          backgroundColor: colors.muted,
          opacity,
        },
        style,
      ]}
    />
  );
}

// ─── Card Skeleton ─────────────────────────────────────────────────────────────

export function CarCardSkeleton() {
  const colors = useColors();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderRadius: colors.radius * 1.5, borderColor: colors.border },
      ]}
    >
      <Skeleton height={180} borderRadius={colors.radius} style={styles.image} />
      <View style={styles.content}>
        <Skeleton height={18} width="70%" style={styles.gap} />
        <Skeleton height={14} width="50%" style={styles.gap} />
        <View style={styles.row}>
          <Skeleton height={14} width="40%" />
          <Skeleton height={20} width="30%" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    borderRadius: 0,
  },
  content: {
    padding: 12,
  },
  gap: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});
