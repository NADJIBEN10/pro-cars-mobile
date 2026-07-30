# Known Issues

> Last updated: 2026-07-30
> Sprint: 1 (UI/UX Quality Review)

---

## 🔴 High Priority

### 1. Missing `.env.local` file
- **File**: `lib/supabase.ts`
- **Description**: `.env.example` exists but no `.env.local` is present. The Supabase client will be created with empty strings for `SUPABASE_URL` and `SUPABASE_ANON_KEY`, causing all auth and database operations to fail at runtime.
- **Impact**: All Supabase-dependent features (auth, database queries) are non-functional.
- **Workaround**: Copy `.env.example` → `.env.local` and fill in real Supabase credentials.
- **Status**: Not started (deferred to Phase 3).

### 2. Replit-locked dev script
- **File**: `package.json` (scripts.dev)
- **Description**: The `dev` script references Replit-specific environment variables (`$REPLIT_EXPO_DEV_DOMAIN`, `$REPLIT_DEV_DOMAIN`, `$REPL_ID`, `$PORT`). Running `pnpm dev` outside of Replit will fail because these variables are undefined.
- **Impact**: Developers cannot start the project on their local machine using the default `dev` script.
- **Workaround**: Use `pnpm dev:local` (added in Sprint 1) which runs `expo start` without Replit variables.
- **Status**: Mitigated (workaround available).

---

## 🟡 Medium Priority

### 3. Workspace dependency may be missing
- **File**: `tsconfig.json` (references), `package.json` (dependencies)
- **Description**: `tsconfig.json` references `"../../lib/api-client-react"` as a project reference, and `package.json` includes `"@workspace/api-client-react": "workspace:*"`. This suggests a pnpm workspace monorepo setup where the `api-client-react` package lives outside this project directory. If the monorepo root is not set up, TypeScript compilation and runtime will fail.
- **Impact**: TypeScript errors and potential runtime failures.
- **Status**: Not started.

### 4. Replit-specific expo-router origin
- **File**: `app.json`
- **Description**: `app.json` sets `"expo-router": { "origin": "https://replit.com/" }`. This configures deep link origin for Replit. On a real device or different hosting, deep links will be misconfigured.
- **Impact**: Deep linking may not work outside Replit.
- **Status**: Not started.

### 5. Unstable Babel transform enabled
- **File**: `babel.config.js`
- **Description**: Uses `unstable_transformImportMeta: true` in the babel-preset-expo configuration. This is an experimental feature flagged as unstable by Expo.
- **Impact**: May break with SDK updates.
- **Status**: Not started.

---

## 🟢 Low Priority

### 6. Hard-pinned dependency version
- **File**: `package.json`
- **Description**: `react-native-keyboard-controller` is pinned to exact version `1.18.5` (no `^` or `~` range). This prevents automatic patch/minor updates.
- **Impact**: Manual version bumps required for security or bug fixes.
- **Status**: Not started.

### 7. No lockfile present
- **File**: (missing `pnpm-lock.yaml`)
- **Description**: No lockfile was detected in the project root, which means installs may not be reproducible across environments.
- **Impact**: Different developers may get different dependency versions.
- **Status**: Not started.

### 8. Duplicate category icons in mock data
- **File**: `lib/mock-data.ts`
- **Description**: In the original Feather-based setup, both SUV and Pickup used the `truck` icon. This was a data issue (not a rendering issue). Now resolved with MaterialCommunityIcons migration.
- **Impact**: (Resolved in Sprint 1)
- **Status**: ✅ Fixed.

---

## Resolved Issues

| Issue | Sprint | Resolution |
|-------|--------|------------|
| Category icon "?" rendering (Sedan) | Sprint 1 | Migrated from Feather `car` to MaterialCommunityIcons `car-side` |
| Category icon "?" rendering (SUV) | Sprint 1 | Changed from `car-suv` (invalid) to `car-estate` |
| Category icon "?" rendering (Pickup) | Sprint 1 | Changed from `pickup-truck` (invalid) to `car-pickup` |
| TypeScript error TS2352 in useColors.ts | Sprint 1 | Replaced invalid cast with `ColorPalette` type alias |
| Raw numeric spacing values | Sprint 1 | Replaced with project spacing constants |
| Hardcoded `#ccc` in specDot (dark mode) | Sprint 1 | Changed to `colors.border` |
| Small heart button (32×32) | Sprint 1 | Increased to 36×36 |
| Missing `dev:local` script | Sprint 1 | Added `"dev:local": "expo start"` |