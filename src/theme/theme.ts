export interface ThemePalette {
  name: string;
  colors: {
    background: string;
    backgroundSecondary: string;
    cardBackground: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textSecondary: string;
  };
}

export const themes: Record<string, ThemePalette> = {
  FunkyFlix: {
    name: "FunkyFlix",
    colors: {
      background: "#1a0b2e",           // Deep purple
      backgroundSecondary: "#16213e",  // Midnight blue
      cardBackground: "#2d1b4e",       // Purple card
      primary: "#ff006e",              // Neon pink
      secondary: "#00f5ff",            // Electric cyan
      accent: "#fb5607",               // Warm orange
      text: "#f8f9fa",                 // Off-white
      textSecondary: "#adb5bd"         // Gray
    }
  },
  SunsetPop: {
    name: "SunsetPop",
    colors: {
      background: "#2d1b4e",           // Deep purple
      backgroundSecondary: "#3d2963",  // Medium purple
      cardBackground: "#4a3575",       // Light purple
      primary: "#ff9e00",              // Sunset orange
      secondary: "#ff006e",            // Hot pink
      accent: "#8338ec",               // Purple accent
      text: "#ffffff",                 // Pure white
      textSecondary: "#d4a5ff"         // Light purple
    }
  }
};