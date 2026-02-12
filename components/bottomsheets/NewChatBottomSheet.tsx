import {typography} from "@/src/constants/theme";
import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {Chat} from "@/src/models/models";
import {getSharedStyles} from "@/src/utils";
import {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {useMemo, useState} from "react";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import MainButton from "../MainButton";
import {ThemedText} from "../themed-text";
import {createChat} from "@/src/services/createChat";

type NewChatBottomSheetProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function NewChatBottomSheet(props: NewChatBottomSheetProps) {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const sharedStyles = useMemo(() => getSharedStyles(theme), [theme]);

  const [chatName, setChatName] = useState<string>("");

  async function handleCreateChat() {
    const newChat: Chat = {
      name: chatName,
    };
    console.log(newChat);
    await createChat(newChat);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
      edges={["bottom", "left", "right"]}
    >
      <ThemedText style={{...typography.h1, marginHorizontal: "auto"}}>New chat</ThemedText>
      <BottomSheetTextInput placeholder="Insert chat name" style={sharedStyles.input} onChangeText={setChatName} />
      <View style={styles.footer}>
        <MainButton text="Cancel" onPress={props.onCancel} />
        <MainButton
          text="Confirm"
          onPress={() => {
            props.onConfirm();
            handleCreateChat();
          }}
        />
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
