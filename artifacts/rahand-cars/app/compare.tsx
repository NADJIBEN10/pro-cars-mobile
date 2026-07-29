import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { CARS, formatMileage, formatPriceUSD, getFuelLabel } from '@/lib/mock-data';
import { useI18n } from '@/lib/i18n';

export default function CompareScreen() {
  const colors = useColors();
  const { t } = useI18n();
  const [selectedIds, setSelectedIds] = useState<string[]>(['1', '3']);

  const selected = CARS.filter((c) => selectedIds.includes(c.id));
  const MAX_COMPARE = 3;

  const rows = [
    { label: t.price, getValue: (c: typeof CARS[0]) => formatPriceUSD(c.priceUsd) },
    { label: t.year, getValue: (c: typeof CARS[0]) => String(c.year) },
    { label: t.mileage, getValue: (c: typeof CARS[0]) => formatMileage(c.mileageKm) },
    { label: t.fuel, getValue: (c: typeof CARS[0]) => getFuelLabel(c.fuelType) },
    { label: t.transmission, getValue: (c: typeof CARS[0]) => c.transmission === 'automatic' ? 'Automatic' : 'Manual' },
    { label: t.engine, getValue: (c: typeof CARS[0]) => c.engineCc > 0 ? `${(c.engineCc / 1000).toFixed(1)}L` : 'Electric' },
    { label: t.horsepower, getValue: (c: typeof CARS[0]) => `${c.horsepower} hp` },
    { label: t.city, getValue: (c: typeof CARS[0]) => c.city },
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground, fontFamily: fonts.displayMedium }]}>
          {t.compare}
        </Text>
        <Text style={[styles.sub, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
          Compare up to {MAX_COMPARE} cars side by side
        </Text>
      </View>

      {/* Car selector slots */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.slotScroll}
        contentContainerStyle={{ paddingHorizontal: spacing.pagePadding, gap: 10 }}
      >
        {selected.map((car) => (
          <View
            key={car.id}
            style={[styles.slot, { backgroundColor: colors.card, borderColor: colors.primary, borderRadius: colors.radius }]}
          >
            <Text style={[styles.slotBrand, { color: colors.primary, fontFamily: fonts.display }]}>
              {car.brand}
            </Text>
            <Text style={[styles.slotModel, { color: colors.foreground, fontFamily: fonts.bodyRegular }]} numberOfLines={1}>
              {car.model} {car.year}
            </Text>
            <Pressable onPress={() => setSelectedIds(selectedIds.filter((id) => id !== car.id))}>
              <Feather name="x" size={14} color={colors.mutedForeground} />
            </Pressable>
          </View>
        ))}
        {selected.length < MAX_COMPARE && (
          <View style={[styles.addSlot, { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: colors.radius }]}>
            <Feather name="plus" size={20} color={colors.mutedForeground} />
            <Text style={[styles.addSlotText, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
              Add car
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Comparison table */}
      {selected.length >= 2 && (
        <View style={[styles.table, { borderColor: colors.border, margin: spacing.pagePadding }]}>
          {rows.map((row, i) => {
            const values = selected.map(row.getValue);
            const allSame = values.every((v) => v === values[0]);
            return (
              <View
                key={row.label}
                style={[
                  styles.tableRow,
                  {
                    backgroundColor: i % 2 === 0 ? colors.background : colors.surface,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <Text style={[styles.rowLabel, { color: colors.mutedForeground, fontFamily: fonts.bodyMedium }]}>
                  {row.label}
                </Text>
                {selected.map((car, ci) => (
                  <Text
                    key={car.id}
                    style={[
                      styles.rowValue,
                      {
                        color: !allSame ? colors.accent : colors.foreground,
                        fontFamily: !allSame ? fonts.bodySemiBold : fonts.bodyRegular,
                      },
                    ]}
                  >
                    {values[ci]}
                  </Text>
                ))}
              </View>
            );
          })}
        </View>
      )}

      {selected.length < 2 && (
        <View style={styles.empty}>
          <Feather name="bar-chart-2" size={40} color={colors.mutedForeground} />
          <Text style={[styles.emptyText, { color: colors.mutedForeground, fontFamily: fonts.bodyRegular }]}>
            Select at least 2 cars to compare
          </Text>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.pagePadding,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    gap: 4,
  },
  title: {
    fontSize: fontSize['2xl'],
  },
  sub: {
    fontSize: fontSize.base,
  },
  slotScroll: {
    paddingVertical: spacing.md,
  },
  slot: {
    width: 120,
    padding: 12,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
  },
  slotBrand: {
    fontSize: fontSize.lg,
  },
  slotModel: {
    fontSize: fontSize.xs,
    textAlign: 'center',
  },
  addSlot: {
    width: 100,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addSlotText: {
    fontSize: fontSize.xs,
  },
  table: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  rowLabel: {
    flex: 1,
    fontSize: fontSize.sm,
  },
  rowValue: {
    flex: 1,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: fontSize.base,
  },
});
