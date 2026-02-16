import {ThemedText} from "@/components/themed-text";
import {useTheme} from "@/src/context/ThemeContext";
import { deleteChat } from "@/src/services/chat/deleteChat";
import {getSharedStyles} from "@/src/utils";
import {View, Alert} from "react-native";
import {RectButton} from "react-native-gesture-handler";

type UserSwipeableActionsProps = {
  chatId: string
}

export default function UserSwipeableActions(props: UserSwipeableActionsProps) {
  const {theme} = useTheme();
  const styles = getSharedStyles(theme);

  function askToDelete() {
    Alert.alert(
      "Delete chat?",
      "This cannot be undone.",
      [
        {text: "Cancel", style: "cancel", onPress: () => {}},
        {text: "Delete", style: "destructive", onPress: () => {
          deleteChat(props.chatId)
        }},
      ],
      {cancelable: true},
    );
  }

  return (
    <View style={styles.actions}>
      <RectButton style={styles.action} onPress={askToDelete}>
        <ThemedText
          style={{
            color: theme.background,
          }}
        >
          Delete
        </ThemedText>
      </RectButton>
      {/* <RectButton style={styles.action} onPress={() => console.log("More")}>
        <ThemedText style={{
            color: theme.background
        }}>More</ThemedText>
      </RectButton> */}
    </View>
  );
}
