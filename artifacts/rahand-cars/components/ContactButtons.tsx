import React, { type ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import { spacing } from '@/constants/spacing';

type FeatherIconName = ComponentProps<typeof Feather>['name'];
type MaterialCommunityIconsIconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

interface ContactButton {
  id: string;
  icon: FeatherIconName | MaterialCommunityIconsIconName;
  iconFamily?: 'feather' | 'material-community';
  label: string;
  color: string;
  backgroundColor?: string;
  onPress: () => void;
}

interface ContactButtonsProps {
  buttons: ContactButton[];
}

export function ContactButtons({ buttons }: ContactButtonsProps) {
  if (buttons.length === 0) return null;

  return (
    <View style={styles.container}>
      {buttons.map((button) => {
        const bgColor = button.backgroundColor ?? `${button.color}20`;
        return (
          <Pressable
            key={button.id}
            onPress={button.onPress}
            hitSlop={spacing.sm}
            accessibilityLabel={button.label}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: bgColor, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            {button.iconFamily === 'material-community' ? (
              <MaterialCommunityIcons
                name={button.icon as MaterialCommunityIconsIconName}
                size={18}
                color={button.color}
                accessibilityElementsHidden
              />
            ) : (
              <Feather
                name={button.icon as FeatherIconName}
                size={18}
                color={button.color}
                accessibilityElementsHidden
              />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    width: spacing['3xl'],
    height: spacing['3xl'],
    borderRadius: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
