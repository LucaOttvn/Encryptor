import { useTheme } from "@/src/context/ThemeContext";
import { getSharedStyles } from "@/src/utils";
import * as Haptics from "expo-haptics";
import { Pressable } from "react-native";
import { ThemedText } from "../themed-text";

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
        style={{
          color: theme.background,
        }}
      >
        {props.text}
      </ThemedText>
    </Pressable>
  );
}
