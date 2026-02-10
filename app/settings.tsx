import { ThemedText } from "@/components/themed-text";
import { typography } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const {isDark, toggleTheme} = useTheme();

  function handleThemeChange() {
    toggleTheme();
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
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
        <Switch style={{
          marginVertical: 'auto'
        }} value={isDark} onValueChange={handleThemeChange}></Switch>
      </View>
    </SafeAreaView>
  );
}
