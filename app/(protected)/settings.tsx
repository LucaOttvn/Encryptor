import { GeneralBottomSheet } from "@/components/bottomsheets/GeneralBottomSheet";
import SettingsBottomSheet from "@/components/bottomsheets/SettingsBottomSheet";
import MainButton from "@/components/buttons/MainButton";
import { ThemedText } from "@/components/themed-text";
import TopBar from "@/components/TopBar";
import { typography } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { getUser } from "@/src/services/user/getUser";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const {user} = useAuth();
  const {theme, isDark, toggleTheme} = useTheme();
  const {signOut} = useAuth();
  const [isSettingsBotttomSheetOpen, setIsSettingsBotttomSheetOpen] = useState(false);
  const [username, setUsername] = useState("Loading...");

  useEffect(() => {
    (async () => {
      const userFromDB = await getUser(user!.uid);
      setUsername(userFromDB.username);
    })();
  }, [user]);

  function handleUsername(input: string) {
    setUsername(input);
  }

  function handleThemeChange() {
    toggleTheme();
  }

  function closeSettingsSheet() {
    Keyboard.dismiss();
    setIsSettingsBotttomSheetOpen(false);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
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
          borderColor: theme.foreground,
          borderWidth: 0,
          paddingBottom: 20,
          paddingHorizontal: 10,
          gap: 20,
          borderBottomColor: theme.lightGrey,
          borderBottomWidth: 1,
        }}
      >
        <View>
          <ThemedText>Username</ThemedText>
          <MainButton text={username} onPress={() => setIsSettingsBotttomSheetOpen(true)} textStyle={{...typography.digitalParagraph, color: theme.accent}} />
        </View>
        <View>
          <ThemedText>Email</ThemedText>
          <TextInput style={{...typography.digitalParagraph, color: theme.accent}}>{user?.email}</TextInput>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingTop: 20,
        }}
      >
        <MainButton text={`Current theme: ${isDark ? "Light" : "Dark"}`} onPress={handleThemeChange} />
        <MainButton
          text="Sign Out"
          textStyle={typography.h2}
          containerStyle={{
            alignSelf: "center",
            marginBottom: 20,
          }}
          onPress={signOut}
        />
      </View>
      <GeneralBottomSheet isOpen={isSettingsBotttomSheetOpen} onDismiss={closeSettingsSheet} snapPoints={["25%"]}>
        <SettingsBottomSheet handleUsername={handleUsername} username={username} onCancel={closeSettingsSheet} onConfirm={closeSettingsSheet} />
      </GeneralBottomSheet>
    </SafeAreaView>
  );
}
