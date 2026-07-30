import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';

export default function CreateListingScreen() {
  const colors = useColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.display }]}>
        Create Listing
      </Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
        Listing creation form coming soon.
      </Text>
      <Pressable
        onPress={() => router.back()}
        style={[styles.backBtn, { backgroundColor: colors.primary, borderRadius: colors.radius }]}
      >
        <Text style={[styles.backBtnText, { color: colors.primaryForeground, fontFamily: fonts.bodySemiBold }]}>
          Go Back
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.pagePadding,
    gap: spacing.sm,
  },
  title: {
    fontSize: fontSize['2xl'],
  },
  subtitle: {
    fontSize: fontSize.base,
    marginBottom: spacing.lg,
  },
  backBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtnText: {
    fontSize: fontSize.base,
  },
});