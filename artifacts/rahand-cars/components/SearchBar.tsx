import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ViewStyle,
} from 'react-native';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { useI18n } from '@/lib/i18n';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  onFilterPress?: () => void;
  placeholder?: string;
  style?: ViewStyle;
  showFilter?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  onSubmit,
  onFilterPress,
  placeholder,
  style,
  showFilter = true,
}: SearchBarProps) {
  const colors = useColors();
  const { t } = useI18n();

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputWrap,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius,
          },
        ]}
      >
        <Feather name="search" size={18} color={colors.mutedForeground} style={styles.searchIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          placeholder={placeholder ?? t.search}
          placeholderTextColor={colors.mutedForeground}
          returnKeyType="search"
          style={[
            styles.input,
            {
              color: colors.foreground,
              fontFamily: fonts.bodyRegular,
              fontSize: fontSize.base,
            },
          ]}
        />
        {value.length > 0 && (
          <Pressable onPress={() => onChangeText('')} hitSlop={8}>
            <Feather name="x" size={16} color={colors.mutedForeground} />
          </Pressable>
        )}
      </View>

      {showFilter && (
        <Pressable
          onPress={onFilterPress}
          style={[
            styles.filterBtn,
            {
              backgroundColor: colors.primary,
              borderRadius: colors.radius,
            },
          ]}
        >
          <Feather name="sliders" size={18} color={colors.primaryForeground} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  filterBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
