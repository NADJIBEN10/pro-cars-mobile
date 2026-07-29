/**
 * Rahand Cars — Favorites / Watchlist
 * Stored in AsyncStorage (offline-safe, no auth required).
 * When the user connects a Supabase account, Phase 3 will sync with the
 * `favorites` table and merge local + remote lists.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useState } from 'react';

const FAVORITES_KEY = '@rahand_cars_favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY)
      .then((raw) => {
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as string[];
            setFavoriteIds(Array.isArray(parsed) ? parsed : []);
          } catch {
            setFavoriteIds([]);
          }
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const persist = useCallback(async (ids: string[]) => {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  }, []);

  const toggle = useCallback(
    async (carId: string) => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setFavoriteIds((prev) => {
        const next = prev.includes(carId)
          ? prev.filter((id) => id !== carId)
          : [...prev, carId];
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const isFavorite = useCallback(
    (carId: string) => favoriteIds.includes(carId),
    [favoriteIds],
  );

  const clearAll = useCallback(async () => {
    setFavoriteIds([]);
    await AsyncStorage.removeItem(FAVORITES_KEY);
  }, []);

  return {
    favoriteIds,
    toggle,
    isFavorite,
    count: favoriteIds.length,
    isLoaded,
    clearAll,
  };
}
