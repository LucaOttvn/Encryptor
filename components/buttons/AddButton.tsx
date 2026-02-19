import { Pressable } from "react-native";
import { ThemedText } from "../themed-text";
import { getSharedStyles } from "@/src/utils";
import { useTheme } from "@/src/context/ThemeContext";
import * as Haptics from "expo-haptics";
import { typography } from "@/src/constants/theme";

type AddButtonProps = {
  text: string;
  onPress?: (x?: any) => any;
};

export default function AddButton(props: AddButtonProps) {
  const {theme} = useTheme();
  const styles = getSharedStyles(theme);
  return (
    <Pressable
      onPress={props.onPress}
      onPressIn={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      style={styles.addButton}
    >
      <ThemedText
        style={{...typography.h2, color: theme.foreground}}
      >
        {props.text}
      </ThemedText>
    </Pressable>
  );
}
