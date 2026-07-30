# Rahand Cars — Project Status

> Last updated: 2026-07-30
> Sprint: 1 (UI/UX Quality Review)

---

## Overview

Rahand Cars is a React Native (Expo) mobile application for car marketplace listings in Iraq and Kurdistan. The app supports English, Arabic, and Kurdish languages with RTL layout support.

---

## Current Sprint: Sprint 1 — UI/UX Quality Review

### Sprint Goal
Review the Home screen and improve its visual quality without adding features, changing architecture, or connecting to Supabase.

### Completed Work

| Area | Changes |
|------|---------|
| **Spacing** | Replaced all raw numeric values with project spacing constants (`spacing.xs`, `spacing.sm`, `spacing.base`, etc.) across `app/(tabs)/index.tsx` and `components/CarCard.tsx` |
| **Typography** | Applied `lineHeight` constants (`tight`, `relaxed`) to hero text; fixed `placeholderBrand` font from `displayMedium` (Sora 600) to `bodyMedium` (Inter 500) |
| **Dark Mode** | Fixed `specDot` in CarCard from hardcoded `#ccc` to `colors.border` (switches between light/dark palettes) |
| **Button Sizes** | Added `minHeight` to quick action buttons (36px), category chips (36px), CTA button (40px), and "View All" link (36px) for consistent touch targets |
| **Heart Button** | Increased from 32×32 to 36×36 for better touch target |
| **Accessibility** | Added `accessibilityLabel` and `accessibilityRole="button"` to favorite heart button |
| **Performance** | Wrapped event handlers in `useCallback` with proper dependency arrays in `CarCard.tsx`; added haptic feedback on favorite toggle |
| **Category Icons** | Migrated from Feather to MaterialCommunityIcons; added `iconFamily` field to `MockCategory` type; verified all 8 icon names against the actual glyph map |
| **TypeScript** | Fixed `useColors.ts` type error (invalid cast `colors as Record<string, typeof colors.light>`) by using `ColorPalette` type alias and direct property access |

### Files Modified in Sprint 1

- `app/(tabs)/index.tsx` — spacing, typography, button sizes, icon rendering, responsiveness
- `components/CarCard.tsx` — spacing, dark mode, heart button size, accessibility, performance
- `lib/mock-data.ts` — added `iconFamily` to `MockCategory`, updated all 8 category icons
- `hooks/useColors.ts` — fixed TypeScript type error
- `package.json` — added `dev:local` script

---

## Project Structure

```
rahand-cars/
├── app/                    # File-based router pages
│   ├── _layout.tsx         # Root layout (providers, stack navigator)
│   ├── +not-found.tsx      # 404 screen
│   ├── auth.tsx            # Auth modal
│   ├── compare.tsx         # Car comparison screen
│   ├── settings.tsx        # Settings modal
│   ├── (tabs)/             # Tab navigator
│   │   ├── _layout.tsx     # Tab layout (NativeTabs / classic fallback)
│   │   ├── index.tsx       # Home screen
│   │   ├── search.tsx      # Search screen
│   │   ├── sell.tsx        # Sell car screen
│   │   ├── favorites.tsx   # Watchlist screen
│   │   └── account.tsx     # Account screen
│   └── car/
│       └── [id].tsx        # Car details screen
├── components/             # Reusable UI components
│   ├── CarCard.tsx         # Car listing card (vertical + horizontal)
│   ├── ErrorBoundary.tsx   # React error boundary
│   ├── ErrorFallback.tsx   # Error fallback UI
│   ├── KeyboardAwareScrollViewCompat.tsx
│   ├── SearchBar.tsx       # Search input with filter button
│   └── ui/                 # Primitive UI components
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Skeleton.tsx
├── constants/              # Design tokens
│   ├── colors.ts           # Light/dark color palettes + radius
│   ├── spacing.ts          # 4px-based spacing scale
│   └── typography.ts       # Fonts, font sizes, line heights, letter spacing
├── hooks/                  # Custom hooks
│   └── useColors.ts        # Returns current theme colors
├── lib/                    # Business logic
│   ├── favorites.ts        # Favorites management (AsyncStorage)
│   ├── i18n.tsx            # Internationalization (EN/AR/KU)
│   ├── mock-data.ts        # Seed data for UI development
│   ├── supabase.ts         # Supabase client (not yet connected)
│   └── supabase.types.ts   # Supabase database types
├── assets/images/          # App icons and images
├── scripts/build.js        # Production build script
└── server/                 # Static file server
    ├── serve.js
    └── templates/
```

---

## Tech Stack

| Technology | Version |
|------------|---------|
| Expo SDK | ~54.0.27 |
| React Native | 0.81.5 |
| React | 19 (workspace catalog) |
| expo-router | ~6.0.17 |
| TypeScript | ~5.9.2 |
| Supabase JS | ^2.111.0 |
| React Query | workspace catalog |
| @expo/vector-icons | ^15.0.3 |

---

## Known Issues

See [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) for the full list.

---

## Next Steps

- Sprint 2: TBD (likely Search screen or Car Details screen review)
- Phase 3: Supabase integration (deferred)