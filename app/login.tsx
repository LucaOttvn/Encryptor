import * as Haptics from "expo-haptics";
import { Pressable, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { typography } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function LoginScreen() {
  const {signInWithGoogle} = useAuth();
  const {theme} = useTheme();

  return (
    <View style={{flex: 1, padding: 24, gap: 150, justifyContent: "center", flexDirection: "column"}}>
      <ThemedText style={{...typography.h1, marginHorizontal: "auto", fontSize: 40}}>ENCRYPTOR</ThemedText>
      <Pressable onPress={signInWithGoogle} onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)}>
        <ThemedText
          style={{
            marginHorizontal: "auto",
            borderBottomColor: theme.foreground,
            borderBottomWidth: 1,
          }}
        >
          Login with Google
        </ThemedText>
      </Pressable>
    </View>
  );
}
