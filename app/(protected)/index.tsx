import {GeneralBottomSheet} from "@/components/bottomsheets/GeneralBottomSheet";
import NewChatBottomSheet from "@/components/bottomsheets/NewChatBottomSheet";
import MainButton from "@/components/MainButton";
import {ThemedText} from "@/components/themed-text";
import {typography} from "@/src/constants/theme";
import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {Chat} from "@/src/models/models";
import {getChats} from "@/src/services/getChats";
import {subscribeToChats} from "@/src/services/subscribeToChats";

import * as Haptics from "expo-haptics";
import {Link} from "expo-router";
import {useEffect, useState} from "react";
import {FlatList, Keyboard, Pressable, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Home() {
  const {theme} = useTheme();

  const [chats, setChats] = useState<Chat[]>([]);
  const [isNewChatSheetOpen, setIsNewChatSheetOpen] = useState<boolean>(false);
  const styles = createStyles(theme);

  useEffect(() => {
    const unsub = subscribeToChats((updatedChats) => {
      setChats(updatedChats);
    }, console.error);
    return () => unsub();
  }, []);

  function closeNewChatSheet() {
    Keyboard.dismiss();
    setIsNewChatSheetOpen(false);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.topBar}>
        <Link href="/settings" asChild>
          <MainButton text="Settings" />
        </Link>
        <MainButton onPress={() => setIsNewChatSheetOpen(true)} text="New Chat" />
      </View>
      <FlatList
        data={chats}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{}}
        keyExtractor={(item) => item.id!.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Link
              href={{
                pathname: "./chat/[id]",
                params: {
                  id: String(item.id),
                  name: item.name,
                },
              }}
              asChild
            >
              <Pressable
                onPressIn={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                }}
              >
                <View style={styles.chat}>
                  <ThemedText style={typography.h1}>{item.name.toUpperCase()}</ThemedText>
                  <ThemedText>4 Users</ThemedText>
                </View>
              </Pressable>
            </Link>
          );
        }}
      />
      <GeneralBottomSheet isOpen={isNewChatSheetOpen} onDismiss={closeNewChatSheet} snapPoints={["35%"]}>
        <NewChatBottomSheet onCancel={closeNewChatSheet} onConfirm={closeNewChatSheet} />
      </GeneralBottomSheet>
    </SafeAreaView>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    chat: {
      borderColor: theme.foreground,
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.foreground,
    },
  });
}
