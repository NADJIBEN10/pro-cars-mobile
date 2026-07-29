import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
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
import { SearchBar } from '@/components/SearchBar';
import { CarCardSkeleton } from '@/components/ui/Skeleton';
import { BRANDS, CARS, CITIES } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';

const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

export default function SearchScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'priceLow' | 'priceHigh'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  const filtered = useMemo(() => {
    let result = [...CARS];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) => c.title.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q),
      );
    }
    if (selectedBrand) result = result.filter((c) => c.brand === selectedBrand);
    if (selectedCity) result = result.filter((c) => c.city === selectedCity);
    if (sortBy === 'priceLow') result.sort((a, b) => a.priceUsd - b.priceUsd);
    if (sortBy === 'priceHigh') result.sort((a, b) => b.priceUsd - a.priceUsd);
    return result;
  }, [query, selectedBrand, selectedCity, sortBy]);

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
        <Text style={[styles.headerTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
          {t.advancedSearch}
        </Text>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onFilterPress={() => setShowFilters((v) => !v)}
          style={styles.searchBar}
        />

        {/* Sort pills */}
        <View style={styles.sortRow}>
          <Text style={[styles.resultCount, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
            {filtered.length} {t.results}
          </Text>
          <View style={styles.sortPills}>
            {(['newest', 'priceLow', 'priceHigh'] as const).map((s) => {
              const label = s === 'newest' ? t.newest : s === 'priceLow' ? t.priceLow : t.priceHigh;
              const active = sortBy === s;
              return (
                <Pressable
                  key={s}
                  onPress={() => setSortBy(s)}
                  style={[
                    styles.sortPill,
                    {
                      backgroundColor: active ? colors.primary : colors.secondary,
                      borderRadius: 20,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sortPillText,
                      {
                        color: active ? colors.primaryForeground : colors.mutedForeground,
                        fontFamily: fonts.bodyMedium,
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* Filter chips (inline, visible when toggled) */}
      {showFilters && (
        <View style={[styles.filterPanel, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          <Text style={[styles.filterLabel, { color: colors.mutedForeground, fontFamily: fonts.bodyMedium }]}>
            {t.brand}
          </Text>
          <FlatList
            data={['', ...BRANDS.slice(0, 8)]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const active = selectedBrand === item;
              return (
                <Pressable
                  onPress={() => setSelectedBrand(item)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: active ? colors.primary : colors.secondary,
                      borderRadius: 20,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: active ? colors.primaryForeground : colors.foreground,
                      fontFamily: fonts.bodyMedium,
                      fontSize: fontSize.xs,
                    }}
                  >
                    {item || t.allBrands}
                  </Text>
                </Pressable>
              );
            }}
          />
          <Text style={[styles.filterLabel, { color: colors.mutedForeground, fontFamily: fonts.bodyMedium, marginTop: 8 }]}>
            {t.city}
          </Text>
          <FlatList
            data={['', ...CITIES]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const active = selectedCity === item;
              return (
                <Pressable
                  onPress={() => setSelectedCity(item)}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor: active ? colors.primary : colors.secondary,
                      borderRadius: 20,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: active ? colors.primaryForeground : colors.foreground,
                      fontFamily: fonts.bodyMedium,
                      fontSize: fontSize.xs,
                    }}
                  >
                    {item || t.any}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      )}

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: spacing.pagePadding, marginBottom: spacing.cardGap }}>
            <CarCard car={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="search" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
              {t.noResults}
            </Text>
            <Text style={[styles.emptySub, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              Try adjusting your filters
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: spacing.md, paddingBottom: Platform.OS === 'web' ? 84 : 90 }}
      />
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
  headerTitle: {
    fontSize: fontSize['2xl'],
    marginBottom: spacing.md,
  },
  searchBar: {
    marginBottom: spacing.sm,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  resultCount: {
    fontSize: fontSize.sm,
  },
  sortPills: {
    flexDirection: 'row',
    gap: 6,
  },
  sortPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sortPillText: {
    fontSize: fontSize.xs,
  },
  filterPanel: {
    paddingHorizontal: spacing.pagePadding,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  filterLabel: {
    fontSize: fontSize.xs,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginRight: 6,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
  },
  emptySub: {
    fontSize: fontSize.base,
  },
});
