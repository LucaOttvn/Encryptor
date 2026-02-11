import {ThemeProvider, useTheme} from "@/context/ThemeContext";
import {Montserrat_400Regular, Montserrat_700Bold} from "@expo-google-fonts/montserrat";
import {SpaceMono_400Regular, SpaceMono_700Bold, useFonts} from "@expo-google-fonts/space-mono";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {AuthProvider, useAuth} from "@/context/AuthContext";
import {useEffect} from "react";

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "173657219547-4hp9fak622nov3lis5mist7fh68bsjra.apps.googleusercontent.com",
    });
  }, []);

  // Wait for the font to be loaded
  if (!fontLoaded && !error) return null;

  return (
    <AuthProvider>
      <ThemeProvider>
        <MainWrapper />
      </ThemeProvider>
    </AuthProvider>
  );
}

function MainWrapper() {
  const {theme, isDark} = useTheme();

  const {user, isLoading} = useAuth();

  if (isLoading) return null;

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: theme.background},
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
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" options={{headerShown: false}} />
        </Stack.Protected>
        <Stack.Protected guard={!!user}>
          <Stack.Screen
            name="(protected)/index"
            options={{
              title: "Home",
            }}
          />
          <Stack.Screen
            name="(protected)/settings"
            options={{
              headerShown: true,
              title: "Settings",
              headerStyle: {
                backgroundColor: theme.background,
              },
              headerTitleStyle: {
                color: theme.foreground,
              },
            }}
          />
          <Stack.Screen
            name="(protected)/chat/[id]"
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: theme.background,
              },
              headerTitleStyle: {
                color: theme.foreground,
              },
            }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}
