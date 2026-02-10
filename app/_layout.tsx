import {ThemeProvider, useTheme} from "@/context/ThemeContext";
import {Montserrat_400Regular, Montserrat_700Bold} from "@expo-google-fonts/montserrat";
import {SpaceMono_400Regular, SpaceMono_700Bold, useFonts} from "@expo-google-fonts/space-mono";
import {Stack} from "expo-router";

import {StatusBar} from "expo-status-bar";

import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
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
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: {
            fontFamily: "Montserrat_700Bold",
            color: theme.foreground,
          },
          headerTintColor: theme.foreground,
          headerBackTitleStyle: {
            fontFamily: "SpaceMono_400Regular",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
          }}
        />
      </Stack>
    </>
  );
}
