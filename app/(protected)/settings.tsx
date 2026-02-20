import MainButton from "@/components/buttons/MainButton";
import { ThemedText } from "@/components/themed-text";
import { typography } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

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
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 40,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <ThemedText style={typography.h2}>Dark Mode</ThemedText>
      </View> */}
      <MainButton text={`Toggle ${isDark ? "Light" : "Dark"} Mode`} onPress={handleThemeChange} textStyle={{color: theme.accent}} />
      <ThemedText
        style={{
          marginHorizontal: "auto",
        }}
      >
        {user?.email}
      </ThemedText>
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
