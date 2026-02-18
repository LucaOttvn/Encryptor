import MainButton from "@/components/buttons/MainButton";
import { ThemedText } from "@/components/themed-text";
import { typography } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const {theme, isDark, toggleTheme} = useTheme();
  const {signOut} = useAuth();

  function handleThemeChange() {
    toggleTheme();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 40,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
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
      <MainButton
        text="Sign Out"
        textStyle={{...typography.h2, color: theme.accent}}
        containerStyle={{
          alignSelf: "center",
        }}
        onPress={signOut}
      />
    </SafeAreaView>
  );
}
