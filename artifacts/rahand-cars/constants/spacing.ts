/**
 * Rahand Cars — Spacing Scale
 * Based on a 4px base unit.
 */

export const spacing = {
  /** 4px */
  xs: 4,
  /** 8px */
  sm: 8,
  /** 12px */
  md: 12,
  /** 16px — default page padding */
  base: 16,
  /** 20px */
  lg: 20,
  /** 24px */
  xl: 24,
  /** 32px */
  '2xl': 32,
  /** 40px */
  '3xl': 40,
  /** 48px */
  '4xl': 48,
  /** 64px */
  '5xl': 64,

  // Semantic aliases
  /** Horizontal page padding */
  pagePadding: 16,
  /** Card internal padding */
  cardPadding: 16,
  /** Gap between sections */
  sectionGap: 32,
  /** Gap between cards in a grid */
  cardGap: 12,
} as const;

export type SpacingKey = keyof typeof spacing;
