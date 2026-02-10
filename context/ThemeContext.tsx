import { Colors } from "@/constants/theme";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Animated, useColorScheme } from "react-native";

export type ColorPalette = typeof Colors.light | typeof Colors.dark;

interface ThemeContextType {
  theme: ColorPalette;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setIsDark(systemScheme === "dark");
  }, [systemScheme]);

  const theme = isDark ? Colors.dark : Colors.light;

  const toggleTheme = () => {
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Switch theme at lowest opacity
      setIsDark(!isDark);
      // Fade back in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <ThemeContext.Provider value={{theme, isDark, toggleTheme}}>
      <Animated.View style={{flex: 1, opacity: fadeAnim}}>{children}</Animated.View>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
