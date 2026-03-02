import MainButton from "@/components/buttons/MainButton";
import {ThemedText} from "@/components/themed-text";
import TopBar from "@/components/TopBar";
import {typography} from "@/src/constants/theme";
import {useAuth} from "@/src/context/AuthContext";
import {useTheme} from "@/src/context/ThemeContext";
import {getUser} from "@/src/services/user/getUser";
import {router} from "expo-router";
import {useEffect} from "react";
import {Alert, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Settings() {
  const {user} = useAuth();
  const {theme, isDark, toggleTheme} = useTheme();
  const {signOut} = useAuth();

  useEffect(() => {
    (async () => {
      await getUser(user!.uid);
    })();
  }, [user]);

  function handleThemeChange() {
    toggleTheme();
  }

  function updateUserDataModal() {
    Alert.alert(
      "Update username",
      "This cannot be undone.",
      [
        {text: "Cancel", style: "cancel", onPress: () => {}},
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {},
        },
      ],
      {cancelable: true},
    );
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
          <ThemedText style={typography.h2}>Username</ThemedText>
          <TextInput style={{...typography.digitalParagraph, color: theme.accent}}>Terem</TextInput>
        </View>
        <View>
          <ThemedText style={typography.h2}>Email</ThemedText>
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
    </SafeAreaView>
  );
}
