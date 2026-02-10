import {View, StyleSheet} from "react-native";
import {ThemedText} from "./themed-text";
import {ColorPalette, useTheme} from "@/context/ThemeContext";
import {Message} from "@/models/models";

interface MessageComponentProps {
  message: Message;
}

export default function MessageComponent(props: MessageComponentProps) {
  const {theme} = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.message}>
      <ThemedText
        style={{
          fontSize: 12,
          color: theme.foreground,
          borderBottomWidth: 1,
          borderBottomColor: "grey",
          alignSelf: "flex-start",
        }}
      >
        User name |{" "}
        <ThemedText
          style={{
            color: "grey",
            fontSize: 12,
          }}
        >
          {props.message.createdAt}
        </ThemedText>
      </ThemedText>
      <ThemedText
        style={{
          color: theme.foreground,
          marginTop: 3,
        }}
      >
        {props.message.text}
      </ThemedText>
    </View>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    message: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      marginHorizontal: 10,
      borderRadius: 0,
    },
  });
}
