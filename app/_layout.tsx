import {AuthProvider, useAuth} from "@/src/context/AuthContext";
import {ThemeProvider, useTheme} from "@/src/context/ThemeContext";
import {Montserrat_400Regular, Montserrat_700Bold} from "@expo-google-fonts/montserrat";
import {useFonts} from "expo-font";
import {SpaceMono_400Regular, SpaceMono_700Bold} from "@expo-google-fonts/space-mono";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {useEffect} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import "../assets/fonts/draco.ttf";

/**
 * TODO:
 * - Add friend
 * - Username instead of email name
 * - Block friend
 * - Edit chat
 * - Notifications
 * - Local data caching
 * - Friendship status (pending/accepted/blocked)
 */

export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    SpaceMono_400Regular,
    SpaceMono_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
    draco: require("../assets/fonts/draco.ttf"),
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
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <MainWrapper />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
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
            }}
          />
          {/* <Stack.Screen
            name="(protected)/chat/[id]"
            options={{
              headerShown: true,
              headerRight: () => (
                <Link href="/(protected)/users" asChild>
                  <MainButton text="Users" />
                </Link>
              ),
            }}
          /> */}
          <Stack.Screen
            name="(protected)/friends"
            options={{
              headerShown: true,
              headerBackTitle: "Chat",
              title: "Friends",
            }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}
