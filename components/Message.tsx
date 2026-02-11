import { ColorPalette, useTheme } from "@/src/context/ThemeContext";
import { MessageDisplay } from "@/src/models/models";
import { formatHHMM } from "@/src/utils";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";

interface MessageComponentProps {
  message: MessageDisplay;
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
        {props.message.senderName}{" - "}
        <ThemedText
          style={{
            color: "grey",
            fontSize: 12,
          }}
        >
          {formatHHMM(props.message.createdAt as FirebaseFirestoreTypes.Timestamp)}
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
