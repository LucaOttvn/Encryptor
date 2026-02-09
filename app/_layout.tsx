import {ThemeProvider, useTheme} from "@/context/ThemeContext";
import {SpaceMono_400Regular, SpaceMono_700Bold, useFonts} from "@expo-google-fonts/space-mono";
import {Stack} from "expo-router";

import {StatusBar} from "expo-status-bar";
import {View} from "react-native";

import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_700Bold,
  });

  // Wait for the font to be loaded
  if (!fontLoaded && !error) return null;

  return (
    <ThemeProvider>
      <MainWrapper />
    </ThemeProvider>
  );
}

function MainWrapper() {
  const {theme, isDark} = useTheme();
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.background,
          },
        }}
      >
        <Stack.Screen name="index" options={{headerShown: false}} />
      </Stack>
    </>
  );
}
