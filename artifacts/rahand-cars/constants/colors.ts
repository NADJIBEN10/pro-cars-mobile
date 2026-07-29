/**
 * Rahand Cars — Design Tokens
 * Matches the original iQ Cars / Rahand Cars brand palette (OKLCH → HEX).
 * Used by useColors() to switch between light and dark themes automatically.
 */

const colors = {
  light: {
    // Legacy aliases
    text: '#1B1D2E',
    tint: '#3A3AA8',

    // Core surfaces
    background: '#FBFBFD',
    foreground: '#1B1D2E',
    surface: '#F3F4F8',

    // Cards
    card: '#FFFFFF',
    cardForeground: '#1B1D2E',

    // Primary — deep indigo
    primary: '#3A3AA8',
    primaryGlow: '#5A6BEA',
    primaryForeground: '#FFFFFF',

    // Secondary
    secondary: '#F3F4F8',
    secondaryForeground: '#1B1D2E',

    // Muted
    muted: '#F3F4F8',
    mutedForeground: '#767B8C',

    // Accent — warm orange
    accent: '#F0803B',
    accentForeground: '#FFFFFF',

    // Status
    destructive: '#E63A2F',
    destructiveForeground: '#FFFFFF',
    success: '#3DBB7A',
    successForeground: '#FFFFFF',
    warning: '#E8B646',
    warningForeground: '#1B1D2E',

    // Borders & inputs
    border: '#E4E6EC',
    input: '#E4E6EC',
  },

  dark: {
    // Legacy aliases
    text: '#F3F4F8',
    tint: '#7A8CF0',

    // Core surfaces
    background: '#141826',
    foreground: '#F3F4F8',
    surface: '#1A1F30',

    // Cards
    card: '#1E2233',
    cardForeground: '#F3F4F8',

    // Primary — lighter indigo for dark bg
    primary: '#7A8CF0',
    primaryGlow: '#9AA9F5',
    primaryForeground: '#141826',

    // Secondary
    secondary: '#1E2233',
    secondaryForeground: '#F3F4F8',

    // Muted
    muted: '#1E2233',
    mutedForeground: '#9AA3B8',

    // Accent — warm orange stays the same
    accent: '#F0803B',
    accentForeground: '#FFFFFF',

    // Status
    destructive: '#E63A2F',
    destructiveForeground: '#FFFFFF',
    success: '#3DBB7A',
    successForeground: '#FFFFFF',
    warning: '#E8B646',
    warningForeground: '#1B1D2E',

    // Borders & inputs
    border: '#2A3050',
    input: '#2A3050',
  },

  /** Base border radius in px. Cards use radius * 1.67 (≈ 20px = rounded-2xl). */
  radius: 12,
};

export default colors;
