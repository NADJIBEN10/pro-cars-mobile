/**
 * Rahand Cars — Typography System
 * Display font: Sora (headings, brand name)
 * Body font: Inter (UI text, paragraphs)
 */

export const fonts = {
  /** Sora 700 — main headings, brand name */
  display: 'Sora_700Bold',
  /** Sora 600 — section headings, card titles */
  displayMedium: 'Sora_600SemiBold',
  /** Inter 400 — body text, descriptions */
  bodyRegular: 'Inter_400Regular',
  /** Inter 500 — labels, metadata */
  bodyMedium: 'Inter_500Medium',
  /** Inter 600 — button labels, emphasis */
  bodySemiBold: 'Inter_600SemiBold',
  /** Inter 700 — strong emphasis */
  bodyBold: 'Inter_700Bold',
} as const;

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
} as const;

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;
