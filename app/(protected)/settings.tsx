import MainButton from "@/components/buttons/MainButton";
import {ThemedText} from "@/components/themed-text";
import TopBar from "@/components/TopBar";
import {typography} from "@/src/constants/theme";
import {useAuth} from "@/src/context/AuthContext";
import {useTheme} from "@/src/context/ThemeContext";
import {router} from "expo-router";
import {View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Settings() {
  const {user} = useAuth();
  const {theme, isDark, toggleTheme} = useTheme();
  const {signOut} = useAuth();

  function handleThemeChange() {
    toggleTheme();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 20,
        gap: 40,
        alignItems: "center",
      }}
    >
      <TopBar
        title="Settings"
        leftButton={{
          text: "Back",
          onPress: () => router.back(),
        }}
      />
      <View
        style={{
          alignItems: "center",
          borderColor: theme.foreground,
          borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 5
        }}
      >
        <ThemedText>Name: {user?.displayName}</ThemedText>
        <ThemedText>Username: Test</ThemedText>
        <ThemedText>Email: {user?.email}</ThemedText>
      </View>
      <MainButton text={`Toggle ${isDark ? "Light" : "Dark"} Mode`} onPress={handleThemeChange} />
      <MainButton
        text="Sign Out"
        textStyle={typography.h2}
        containerStyle={{
          alignSelf: "center",
        }}
        onPress={signOut}
      />
    </SafeAreaView>
  );
}
