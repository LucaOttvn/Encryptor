import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/src/context/ThemeContext";
import { getSharedStyles } from "@/src/utils";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default function UserSwipeableActions() {
  const {theme} = useTheme();
  const styles = getSharedStyles(theme);
  return (
    <View style={styles.actions}>
      <RectButton style={styles.action} onPress={() => console.log("Archive")}>
        <ThemedText style={{
            color: theme.background
        }}>Archive</ThemedText>
      </RectButton>
      <RectButton style={styles.action} onPress={() => console.log("More")}>
        <ThemedText style={{
            color: theme.background
        }}>More</ThemedText>
      </RectButton>
    </View>
  );
}
