// health-platform-mobile/constants/theme.ts
/**
 * CareNest Theme - Healthcare at Home
 * Matching the web design system
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Primary - Deep Teal (matches web)
    primary: "#0F766E",
    primaryLight: "#CCFBF1",
    primaryDark: "#0D9488",
    primaryHover: "#0D9488",
    
    // Secondary - Mint
    mint: "#CCFBF1",
    mintBg: "#F0FDF4",
    
    // Accent - Blue
    accent: "#2563EB",
    accentLight: "#DBEAFE",
    
    // CTA - Orange
    cta: "#EA580C",
    ctaText: "#FFFFFF",
    
    // Background
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F5F9",
    
    // Text
    text: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#64748B",
    textLight: "#94A3B8",
    
    // Borders
    border: "#E2E8F0",
    borderLight: "#F1F5F9",
    
    // Status
    success: "#16A34A",
    successBg: "#F0FDF4",
    warning: "#D97706",
    warningBg: "#FEF3C7",
    danger: "#DC2626",
    dangerBg: "#FEF2F2",
    info: "#3B82F6",
    infoBg: "#EFF6FF",
    
    // UI
    tint: "#0F766E",
    icon: "#64748B",
    iconActive: "#0F766E",
    
    // Shadows
    shadow: "rgba(15, 118, 110, 0.1)",
    shadowStrong: "rgba(15, 118, 110, 0.25)",
  },
  dark: {
    // Same colors for now, can add dark mode later
    primary: "#0F766E",
    primaryLight: "#CCFBF1",
    primaryDark: "#0D9488",
    primaryHover: "#0D9488",
    
    mint: "#CCFBF1",
    mintBg: "#F0FDF4",
    
    accent: "#2563EB",
    accentLight: "#DBEAFE",
    
    cta: "#EA580C",
    ctaText: "#FFFFFF",
    
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F5F9",
    
    text: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#64748B",
    textLight: "#94A3B8",
    
    border: "#E2E8F0",
    borderLight: "#F1F5F9",
    
    success: "#16A34A",
    successBg: "#F0FDF4",
    warning: "#D97706",
    warningBg: "#FEF3C7",
    danger: "#DC2626",
    dangerBg: "#FEF2F2",
    info: "#3B82F6",
    infoBg: "#EFF6FF",
    
    tint: "#0F766E",
    icon: "#64748B",
    iconActive: "#0F766E",
    
    shadow: "rgba(15, 118, 110, 0.1)",
    shadowStrong: "rgba(15, 118, 110, 0.25)",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
};

export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 999,
};

export const Typography = {
  size: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
  },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    extrabold: "800" as const,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const Shadow = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Default export for convenience
export default {
  Colors,
  Spacing,
  Radius,
  Typography,
  Shadow,
  Fonts,
};