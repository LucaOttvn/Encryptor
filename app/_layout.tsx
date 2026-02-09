import {ThemedText} from "@/components/themed-text";
import {ThemeProvider, useTheme} from "@/context/ThemeContext";
import {SpaceMono_400Regular, SpaceMono_700Bold, useFonts} from "@expo-google-fonts/space-mono";
import {Stack} from "expo-router";

import {StatusBar} from "expo-status-bar";
import {View, StyleSheet} from "react-native";

import "react-native-reanimated";
import {SafeAreaView} from "react-native-safe-area-context";

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
          headerShown: true,
          contentStyle: {
            backgroundColor: theme.background,
          },
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTitleStyle: {
            fontFamily: "SpaceMono_700Bold",
            color: theme.foreground,
          },
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
          name="chat"
          options={{
            title: "Chat",
          }}
        />
      </Stack>
    </>
  );
}
