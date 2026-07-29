import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { CarCard } from '@/components/CarCard';
import { useFavorites } from '@/lib/favorites';
import { CARS } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';

export default function FavoritesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const { favoriteIds, isLoaded } = useFavorites();

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  const savedCars = CARS.filter((c) => favoriteIds.includes(c.id));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topInset + 8,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
            {t.watchlist}
          </Text>
          {savedCars.length > 0 && (
            <View style={[styles.countBadge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.countText, { fontFamily: fonts.bodyBold }]}>
                {savedCars.length}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* List */}
      {isLoaded && savedCars.length === 0 ? (
        <View style={styles.empty}>
          <View style={[styles.emptyIcon, { backgroundColor: colors.muted, borderRadius: 50 }]}>
            <Feather name="heart" size={32} color={colors.mutedForeground} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
            {t.noSavedCars}
          </Text>
          <Text style={[styles.emptySub, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
            {t.saveCarsTip}
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)/search')}
            style={[styles.browseBtn, { backgroundColor: colors.primary, borderRadius: colors.radius }]}
          >
            <Feather name="search" size={16} color={colors.primaryForeground} />
            <Text style={[styles.browseBtnText, { color: colors.primaryForeground, fontFamily: fonts.bodySemiBold }]}>
              {t.browseAll}
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={savedCars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ paddingHorizontal: spacing.pagePadding, marginBottom: spacing.cardGap }}>
              <CarCard car={item} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: spacing.md,
            paddingBottom: Platform.OS === 'web' ? 84 : 90,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.pagePadding,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: fontSize['2xl'],
  },
  countBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: fontSize.xs,
    color: 'white',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.pagePadding,
    gap: 14,
    paddingBottom: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: fontSize.base,
    textAlign: 'center',
    lineHeight: fontSize.base * 1.5,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 6,
  },
  browseBtnText: {
    fontSize: fontSize.base,
  },
});
