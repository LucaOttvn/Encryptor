import {typography} from "@/src/constants/theme";
import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {Chat, User} from "@/src/models/models";
import {createChat} from "@/src/services/createChat";
import {BottomSheetFlatList, BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {useEffect, useState} from "react";
import {ListRenderItemInfo, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemedText} from "../themed-text";
import {useAuth} from "@/src/context/AuthContext";
import MainButton from "../buttons/MainButton";

type NewChatBottomSheetProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function NewChatBottomSheet(props: NewChatBottomSheetProps) {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [chatName, setChatName] = useState<string>("");
  const [friends, setFriends] = useState<User[]>([]);

  const {user: loggedUser} = useAuth();

  useEffect(() => {
    (async () => {

    })();
  }, [loggedUser]);

  async function handleCreateChat() {
    if (chatName === "") return;
    props.onConfirm();
    const newChat: Chat = {
      name: chatName,
    };
    await createChat(newChat);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <BottomSheetTextInput
        placeholder="Insert name"
        style={{...typography.h1, color: theme.foreground, marginHorizontal: "auto", textAlign: chatName.length > 0 ? "center" : "right"}}
        placeholderTextColor={theme.placeholders}
        onChangeText={setChatName}
      />
      <BottomSheetFlatList
        data={friends}
        renderItem={({item}: ListRenderItemInfo<User>) => {
          return <ThemedText>{item.name}</ThemedText>;
        }}
      />
      <View style={styles.footer}>
        <MainButton text="Cancel" onPress={props.onCancel} />
        <MainButton text="Confirm" onPress={handleCreateChat} />
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    footer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      borderTopColor: theme.foreground,
      borderTopWidth: 1,
      paddingBottom: 10,
      paddingTop: 20,
    },
  });
}
