export interface ColorOption {
  name: string;
  primary: { light: string; dark: string }; // HSL string e.g., "222.2 47.4% 11.2%"
  primaryForeground: { light: string; dark: string };
  ring: { light: string; dark: string }; // Optional: for focus rings
  // Add other related colors if needed, e.g., button hover, specific borders
}

export const defaultColorName = "Slate"; // Matches current default in globals.css

export const themeColorOptions: ColorOption[] = [
  {
    name: "Slate", // Default Shadcn/UI Slate
    primary: { light: "222.2 47.4% 11.2%", dark: "210 40% 98%" },
    primaryForeground: { light: "210 40% 98%", dark: "222.2 47.4% 11.2%" },
    ring: { light: "222.2 84% 4.9%", dark: "212.7 26.8% 83.9%" },
  },
  {
    name: "Sky", // A blue variant
    primary: { light: "200.0 85.0% 50.0%", dark: "200.0 85.0% 55.0%" }, // Example: Sky Blue
    primaryForeground: { light: "210 40% 98%", dark: "200 100% 10%" }, // White on light blue, dark blue on dark sky
    ring: { light: "200.0 85.0% 50.0%", dark: "200.0 85.0% 55.0%" },
  },
  {
    name: "Emerald", // A green variant
    primary: { light: "145.0 63.0% 40.0%", dark: "145.0 63.0% 49.0%" }, // Example: Emerald Green
    primaryForeground: { light: "210 40% 98%", dark: "145 100% 10%" },
    ring: { light: "145.0 63.0% 40.0%", dark: "145.0 63.0% 49.0%" },
  },
  {
    name: "Rose", // A reddish-pink variant
    primary: { light: "340.0 80.0% 55.0%", dark: "340.0 80.0% 60.0%" }, // Example: Rose Pink/Red
    primaryForeground: { light: "210 40% 98%", dark: "340 100% 10%" },
    ring: { light: "340.0 80.0% 55.0%", dark: "340.0 80.0% 60.0%" },
  },
  {
    name: "Amber", // An orange/yellow variant
    primary: { light: "35.0 92.0% 55.0%", dark: "38.0 92.0% 50.0%" }, // Example: Amber/Orange
    primaryForeground: { light: "35 100% 10%", dark: "38 100% 10%" }, // Dark text on amber
    ring: { light: "35.0 92.0% 55.0%", dark: "38.0 92.0% 50.0%" },
  },
];

// Helper function to apply theme colors
export const applyThemeColors = (option: ColorOption, currentThemeMode: 'light' | 'dark') => {
  const root = document.documentElement;
  const primary = currentThemeMode === 'light' ? option.primary.light : option.primary.dark;
  const primaryForeground = currentThemeMode === 'light' ? option.primaryForeground.light : option.primaryForeground.dark;
  const ring = currentThemeMode === 'light' ? option.ring.light : option.ring.dark;

  root.style.setProperty('--primary', primary);
  root.style.setProperty('--primary-foreground', primaryForeground);
  root.style.setProperty('--ring', ring);

  // You might need to update other CSS variables that depend on primary
  // e.g., button hover states, specific component accents if they don't derive from --primary directly.
  // For many Shadcn components, changing --primary and --ring is often sufficient for the main theme color.
  // For example, if --secondary, --accent, etc., need to change in relation to primary, they'd be set here too.
  // For now, we'll keep it to primary, primary-foreground, and ring.
};
