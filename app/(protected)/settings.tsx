import {ThemedText} from "@/components/themed-text";
import {typography} from "@/constants/theme";
import {useAuth} from "@/context/AuthContext";
import {useTheme} from "@/context/ThemeContext";
import {Pressable, Switch, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Settings() {
  const {isDark, toggleTheme} = useTheme();
  const {signOut} = useAuth();

  function handleThemeChange() {
    toggleTheme();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        gap: 40
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <ThemedText style={typography.h2}>Dark Mode</ThemedText>
        <Switch
          style={{
            marginVertical: "auto",
          }}
          value={isDark}
          onValueChange={handleThemeChange}
        ></Switch>
      </View>
      <Pressable onPress={signOut}>
        <ThemedText>
          Sign Out
        </ThemedText>
      </Pressable>
    </SafeAreaView>
  );
}
