# Changelog

All notable changes to the Rahand Cars project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] — Sprint 1

### Added

- **Documentation**: `PROJECT_STATUS.md`, `CHANGELOG.md`, `KNOWN_ISSUES.md`, `DEVELOPMENT_STANDARDS.md`
- **dev:local script**: `"dev:local": "expo start"` for local development outside Replit
- **iconFamily field**: Added to `MockCategory` type in `lib/mock-data.ts` to support multiple icon libraries
- **Accessibility labels**: `accessibilityLabel` and `accessibilityRole="button"` on the favorite heart button in `CarCard`
- **Haptic feedback**: Light impact haptic on favorite toggle in `CarCard`

### Changed

- **Spacing**: Replaced all raw numeric values with project spacing constants across `app/(tabs)/index.tsx` and `components/CarCard.tsx`
- **Typography**: Applied `lineHeight` constants (`tight`, `relaxed`) to hero text in Home screen
- **Font family**: Changed `placeholderBrand` from `fonts.displayMedium` (Sora 600) to `fonts.bodyMedium` (Inter 500) for correct typography hierarchy
- **Dark mode**: Changed `specDot` backgroundColor from hardcoded `#ccc` to `colors.border` in `CarCard`
- **Button sizes**: Added `minHeight` to quick action buttons (36px), category chips (36px), CTA button (40px), and "View All" link (36px)
- **Heart button**: Increased from 32×32 to 36×36 for improved touch target
- **Category icons**: Migrated all 8 category icons from Feather to MaterialCommunityIcons with verified glyph names
- **Performance**: Wrapped `handlePress` and `handleFavorite` in `useCallback` with proper dependency arrays
- **TypeScript**: Fixed invalid type cast in `hooks/useColors.ts` — replaced `colors as Record<string, typeof colors.light>` with `ColorPalette` type alias and direct property access

### Fixed

- **Category icon "?" rendering**: Sedan icon (`car` in Feather) did not exist, causing Expo Go to render "?". Fixed by migrating to MaterialCommunityIcons with `car-side`.
- **SUV icon "?" rendering**: `car-suv` does not exist in MaterialCommunityIcons. Fixed by using `car-estate`.
- **Pickup icon "?" rendering**: `pickup-truck` does not exist in MaterialCommunityIcons. Fixed by using `car-pickup`.
- **TypeScript error TS2352**: Invalid cast in `useColors.ts` — `colors` object contains `radius: number` which is not a `typeof colors.light`.

### Removed

- None

---

## [0.0.0] — Initial Scaffold

### Added

- Expo SDK 54 project with expo-router file-based routing
- Tab navigator with 5 tabs (Home, Search, Sell, Watchlist, Account)
- Stack navigator with car details, compare, auth, and settings screens
- Design token system (colors, spacing, typography)
- i18n support (English, Arabic, Kurdish) with RTL layout
- Supabase client setup (not yet connected)
- Mock data for 12 car listings and 8 categories
- CarCard component (vertical and horizontal layouts)
- SearchBar component
- UI primitives (Badge, Button, Input, Skeleton)
- Error boundary and error fallback components
- Favorites management with AsyncStorage
- Replit deployment configuration
- Production build script and static file server