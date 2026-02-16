import { typography } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { ColorPalette, useTheme } from "@/src/context/ThemeContext";
import { Chat, User } from "@/src/models/models";
import { createChat } from "@/src/services/chat/createChat";
import { getFriendships } from "@/src/services/getFriendships";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../buttons/MainButton";
import SelectUsersList from "../SelectUsersList";
import { ThemedText } from "../themed-text";

type NewChatBottomSheetProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function NewChatBottomSheet(props: NewChatBottomSheetProps) {
  const {theme} = useTheme();
  const {user} = useAuth();

  const [chatName, setChatName] = useState<string>("");
  const [friends, setFriends] = useState<User[]>([]);

  const styles = createStyles(theme, chatName.length);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  function handleSelectedIds(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  useEffect(() => {
    (async () => {
      if (!user) return;
      const friendsResult: User[] = await getFriendships(user.uid);
      setFriends(friendsResult);
    })();
  }, [user]);

  async function handleCreateChat() {
    // If no chat name has been inserted or no users have been selected do nothing
    if (chatName === "" || selectedIds.size === 0) return;
    props.onConfirm();
    const newChat: Chat = {
      name: chatName,
      members: Array.from(selectedIds),
    };
    await createChat(newChat);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
        gap: 30,
      }}
    >
      <View
        style={{
          paddingBottom: 40,
        }}
      >
        <BottomSheetTextInput placeholder="Chat name" style={{...typography.h1, ...styles.chatNameInput}} placeholderTextColor={theme.grey} onChangeText={setChatName} />
      </View>

      <ThemedText style={{...typography.h2, marginHorizontal: "auto"}}>Select members</ThemedText>

      <SelectUsersList data={friends} handleSelected={handleSelectedIds} selectedIds={selectedIds} />

      <View style={styles.footer}>
        <MainButton text="Cancel" onPress={props.onCancel} />
        <MainButton text="Confirm" onPress={handleCreateChat} />
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ColorPalette, chatNameLength: number) {
  return StyleSheet.create({
    footer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      borderTopColor: theme.grey,
      borderTopWidth: 1,
      paddingBottom: 10,
      paddingTop: 20,
    },
    chatNameInput: {
      color: theme.foreground,
      marginHorizontal: "auto",
      textAlign: chatNameLength > 0 ? "center" : "right",
    },
  });
}
