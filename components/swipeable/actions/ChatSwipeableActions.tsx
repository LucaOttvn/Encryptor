import {ThemedText} from "@/components/themed-text";
import {useTheme} from "@/src/context/ThemeContext";
import {deleteChat} from "@/src/services/chat/deleteChat";
import {getSharedStyles} from "@/src/utils";
import {View, Alert} from "react-native";
import {RectButton} from "react-native-gesture-handler";

type ChatSwipeableActionsProps = {
  chatId: string;
};

export default function ChatSwipeableActions(props: ChatSwipeableActionsProps) {
  const {theme} = useTheme();
  const styles = getSharedStyles(theme);

  function askToDelete() {
    Alert.alert(
      "Delete chat?",
      "This cannot be undone.",
      [
        {text: "Cancel", style: "cancel", onPress: () => {}},
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteChat(props.chatId);
          },
        },
      ],
      {cancelable: true},
    );
  }

  return (
    <View style={styles.swipeableActions}>
      {/* <RectButton style={styles.action} onPress={() => console.log("More")}>
        <ThemedText
          style={{
            color: theme.background,
          }}
        >
          Edit
        </ThemedText>
      </RectButton> */}
      <RectButton style={styles.swipeableAction} onPress={askToDelete}>
        <ThemedText
          style={{
            color: theme.background,
          }}
        >
          Delete
        </ThemedText>
      </RectButton>
    </View>
  );
}
