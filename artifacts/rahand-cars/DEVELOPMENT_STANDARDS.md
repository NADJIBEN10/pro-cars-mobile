# Development Standards

> Last updated: 2026-07-30
> Applies to: Rahand Cars (Expo SDK 54 / React Native 0.81.5)

---

## 1. Code Style & Formatting

### TypeScript
- Use **strict mode** (`"strict": true` in `tsconfig.json`).
- Prefer `interface` over `type` for object shapes.
- Use `type` for unions, intersections, and utility types.
- Avoid `any`. Use `unknown` when the type is truly not known.
- Avoid type assertions (`as`). Use type guards or declare proper types.
- Use `const` assertions (`as const`) for constant objects and arrays.

### Naming Conventions
- **Files**: `kebab-case.ts` for utilities, `PascalCase.tsx` for components.
- **Components**: PascalCase (`CarCard`, `SearchBar`).
- **Functions**: camelCase (`handlePress`, `formatPriceUSD`).
- **Constants**: camelCase for values (`spacing`, `fontSize`), UPPER_SNAKE_CASE for magic strings/numbers (`STORAGE_KEY`).
- **Interfaces**: PascalCase with no prefix (`MockCar`, `MockCategory`).
- **Types**: PascalCase (`FuelType`, `SellerType`).

### Imports Order
1. React / React Native
2. Third-party libraries (alphabetical)
3. `@/` aliased project imports (alphabetical by path)
4. Relative imports (`./`, `../`)

Example:
```typescript
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import { spacing } from '@/constants/spacing';
import { fonts, fontSize } from '@/constants/typography';
import { useColors } from '@/hooks/useColors';
import { Badge } from './ui/Badge';
```

---

## 2. Design Tokens

### Spacing
- Use the 4px-based scale from `constants/spacing.ts`.
- **Never use raw numbers** for margins, paddings, or gaps.
- Semantic aliases (`pagePadding`, `cardPadding`, `sectionGap`, `cardGap`) should be used when applicable.

```typescript
// ✅ Correct
padding: spacing.base,
gap: spacing.sm,
marginBottom: spacing.lg,

// ❌ Incorrect
padding: 16,
gap: 8,
marginBottom: 20,
```

### Typography
- Use font constants from `constants/typography.ts`.
- **Display text** (headings, brand name): `fonts.display` (Sora 700) or `fonts.displayMedium` (Sora 600).
- **Body text**: `fonts.bodyRegular` (Inter 400), `fonts.bodyMedium` (Inter 500), `fonts.bodySemiBold` (Inter 600), or `fonts.bodyBold` (Inter 700).
- Use `fontSize` constants, not raw numbers.
- Use `lineHeight` constants (`tight: 1.2`, `normal: 1.4`, `relaxed: 1.6`).

```typescript
// ✅ Correct
fontSize: fontSize.xl,
lineHeight: fontSize.xl * lineHeight.tight,
fontFamily: fonts.displayMedium,

// ❌ Incorrect
fontSize: 20,
lineHeight: 24,
```

### Colors
- Use the `useColors()` hook to get the current theme palette.
- The hook returns all color tokens for the active scheme (light/dark) plus `radius`.
- **Never hardcode colors** that should be theme-aware.
- Hero sections with dark backgrounds may use hardcoded white/transparent values (these are intentional).

```typescript
// ✅ Correct
const colors = useColors();
backgroundColor: colors.card,
color: colors.foreground,

// ❌ Incorrect (for theme-aware elements)
backgroundColor: '#FFFFFF',
color: '#1B1D2E',
```

---

## 3. Component Standards

### Functional Components
- Expo Router requires `export default` for route files (e.g., `app/(tabs)/index.tsx`). Use `export default function ScreenName()` for all files in the `app/` directory.
- For reusable components in `components/`, use named exports (`export function ComponentName()`).
- Define props interface above the component.
- Use `useCallback` for event handlers passed to child components or `Pressable`.

```typescript
interface CarCardProps {
  car: MockCar;
  horizontal?: boolean;
}

export function CarCard({ car, horizontal = false }: CarCardProps) {
  const handlePress = useCallback(() => {
    router.push(`/car/${car.id}`);
  }, [car.id]);
  // ...
}
```

### StyleSheet
- Define `StyleSheet.create()` at the bottom of the file.
- Use design token constants inside styles.
- Group styles by section with comments.

### Pressable
- Always provide `hitSlop` for small touch targets (< 44px).
- Use `({ pressed })` render prop for press feedback (opacity, scale, translateY).
- Add `accessibilityLabel` and `accessibilityRole` for interactive elements.

---

## 4. i18n

- Use the `useI18n()` hook to get `t` (translations object) and `language`.
- All user-facing strings must use translation keys, not hardcoded text.
- Add new keys to all three dictionaries (EN, AR, KU) in `lib/i18n.tsx`.
- RTL languages (Arabic, Kurdish) require `I18nManager.forceRTL()` and a full app reload.

```typescript
// ✅ Correct
<Text>{t.heroTitle}</Text>

// ❌ Incorrect
<Text>Find Your Dream Car</Text>
```

---

## 5. Icons

- Use `@expo/vector-icons` (Feather, MaterialCommunityIcons, etc.).
- For **automotive/vehicle icons**, prefer `MaterialCommunityIcons` (richer automotive set).
- For **general UI icons** (search, heart, arrows), prefer `Feather`.
- When adding a new icon, verify the name exists in the actual glyph map at:
  `node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/`
- Use the `iconFamily` field on data types to specify which library to render.

```typescript
// In mock-data.ts
{ id: '1', slug: 'suv', label: 'SUV', icon: 'car-estate', iconFamily: 'material-community' }

// In component
{cat.iconFamily === 'material-community' ? (
  <MaterialCommunityIcons name={cat.icon} size={16} color={colors.primary} />
) : (
  <Feather name={cat.icon} size={16} color={colors.primary} />
)}
```

---

## 6. Performance

- Wrap event handlers in `useCallback` when passed as props.
- Use `React.memo` for pure components that render frequently (e.g., list items).
- Avoid inline function definitions in render props when possible.
- Use `expo-image` (not `Image` from React Native) for optimized image loading.
- Add haptic feedback sparingly — only for primary user actions (favorite, submit).

---

## 7. Accessibility

- All `Pressable` elements should have `accessibilityRole`.
- Icon-only buttons must have `accessibilityLabel`.
- Touch targets should be at least **36×36px** (WCAG recommends 44×44px).
- Use `hitSlop` to expand touch targets when constrained by layout.

---

## 8. File Organization

```
app/              # File-based router pages (one file per route)
components/       # Reusable UI components
  ui/             # Primitive components (Badge, Button, Input, Skeleton)
constants/        # Design tokens (colors, spacing, typography)
hooks/            # Custom React hooks
lib/              # Business logic, data, utilities
assets/           # Static assets (images, fonts)
scripts/          # Build and utility scripts
server/           # Production static file server
```

- One component per file.
- Group related components in subdirectories (e.g., `components/ui/`).
- Keep components under 300 lines. Extract sub-components or hooks when exceeding.

---

## 9. Recommended Git Workflow (Going Forward)

> **Note**: The repository currently has a single commit on `main` with no established branching workflow. The following is the **recommended** process for future sprints, not a currently enforced policy.

- **Branch naming**: `sprint-<number>/<description>` (e.g., `sprint-1/ui-quality-review`).
- **Commit messages**: Use conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
- **No direct commits to `main`** — use pull requests.
- Keep commits atomic (one logical change per commit).

---

## 10. TypeScript Configuration

- The project extends `expo/tsconfig.base`.
- Path alias `@/*` maps to `./*` (root directory).
- Always run `pnpm typecheck` before committing to ensure zero TypeScript errors.
- Do not use `// @ts-ignore` or `// @ts-expect-error` to suppress real errors.