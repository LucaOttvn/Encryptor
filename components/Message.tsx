import {View, StyleSheet} from "react-native";
import {ThemedText} from "./themed-text";
import {ColorPalette, useTheme} from "@/context/ThemeContext";

interface MessageComponentProps {
  text: string;
}

export default function MessageComponent(props: MessageComponentProps) {
  const {theme} = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.message}>
      <ThemedText style={{
        fontSize: 12,
        color: theme.foreground
      }}>User name</ThemedText>
      <ThemedText style={{
        color: theme.foreground
      }}>{props.text}</ThemedText>
    </View>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    message: {
        borderColor: theme.foreground,
        borderWidth: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        borderRadius: 0
    }
  });
}
