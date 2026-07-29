# Rahand Cars

Iraq & Kurdistan's largest car marketplace — a full-featured React Native + Expo mobile app connecting buyers with 1,000+ dealers and private sellers.

## Run & Operate

- `pnpm --filter @workspace/rahand-cars run dev` — run the Expo dev server
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: React Native + Expo SDK 54, Expo Router v6 (file-based routing)
- Navigation: NativeTabs (iOS 26+ liquid glass) + classic BlurView Tabs fallback
- Styling: React Native StyleSheet + design tokens (no NativeWind)
- Fonts: Sora (display/headings) + Inter (body) via @expo-google-fonts
- Backend: Express 5 (shared api-server artifact)
- DB: PostgreSQL + Drizzle ORM (Supabase)
- Auth: Supabase Auth + expo-secure-store session storage
- State: React Query + AsyncStorage persister (offline cache)
- Forms: react-hook-form + zod (Phase 2+)

## Where things live

- `artifacts/rahand-cars/` — the Expo mobile app
  - `app/` — Expo Router screens (file-based routes)
  - `app/(tabs)/` — bottom tab screens: index, search, sell, favorites, account
  - `components/` — shared components (CarCard, SearchBar, ui/)
  - `constants/colors.ts` — design tokens (light + dark themes)
  - `constants/typography.ts` — font names + size scale
  - `constants/spacing.ts` — spacing scale
  - `lib/i18n.tsx` — I18nProvider with EN/AR/KU dictionaries + RTL
  - `lib/supabase.ts` — Supabase client (needs credentials)
  - `lib/supabase.types.ts` — full TypeScript DB schema types
  - `lib/mock-data.ts` — realistic Iraqi car seed data
  - `lib/favorites.ts` — AsyncStorage watchlist hook
  - `hooks/useColors.ts` — dark/light mode color hook

## Architecture decisions

- **Brand rename**: Originally "iQ Cars" → renamed to "Rahand Cars" everywhere including app name, slug, scheme, i18n dictionary, and all UI text.
- **Design tokens**: Exact OKLCH→HEX palette from original iQ Cars: primary #3A3AA8 (light) / #7A8CF0 (dark), accent #F0803B, background #FBFBFD (light) / #141826 (dark).
- **RTL support**: Arabic and Kurdish use `I18nManager.forceRTL(true)` + `reloadAppAsync()` — a full app reload is required after RTL direction change; this is by design (React Native requirement).
- **Supabase session**: Uses `expo-secure-store` instead of `localStorage` for encrypted token persistence on device.
- **Offline favorites**: AsyncStorage (no auth required); will sync with Supabase `favorites` table in Phase 3.
- **No NativeWind**: Uses React Native StyleSheet with `useColors()` hook for all theming — avoids NativeWind's class caching complexity with dynamic dark mode.

## Product

**Rahand Cars** is a trilingual (English / Arabic / Kurdish) automotive marketplace for Iraq and Kurdistan:
- Buyers: browse, filter, compare, save, and contact sellers
- Private sellers: multi-step listing wizard with camera integration
- Dealers / Showrooms: inventory management, analytics, subscriptions
- Moderators / Admins: listing review, dealer verification

Features: hero + advanced search, car listings grid, car detail with gallery, side-by-side compare tool, 6-step sell wizard, user dashboard, watchlist, chat/messaging, editorial content (guide/news/videos).

## Build Phases

- **Phase 1** ✓ — Foundation: navigation, design system, i18n, Supabase client structure, UI components, all screen placeholders
- **Phase 2** — Screens: Home (full), Search, Car Detail, Compare
- **Phase 3** — Auth, Sell Wizard, Dashboard, Supabase integration
- **Phase 4** — Chat, Notifications, Dealer Dashboard, Advanced features

## User preferences

- Brand name: "Rahand Cars" (not iQ Cars — never use iQ Cars in any UI text)
- Target market: Iraq and Kurdistan
- Languages: English (default), Arabic, Kurdish (Sorani)
- No feature simplification — full feature parity with web version required

## Gotchas

- RTL switch (AR/KU) requires app reload via `reloadAppAsync()` — this is expected behavior
- Supabase credentials must be in `.env.local` as `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Never use `npx expo start` directly — use the workflow restart tool
- Never use emojis in the UI
- Tab bar height: 90pt on native, 84px on web (for bottom inset)
- `@expo-google-fonts/sora` font names: `Sora_600SemiBold`, `Sora_700Bold`
