import {GeneralBottomSheet} from "@/components/bottomsheets/GeneralBottomSheet";
import NewChatBottomSheet from "@/components/bottomsheets/NewChatBottomSheet";
import AddButton from "@/components/buttons/AddButton";
import MainButton from "@/components/buttons/MainButton";
import UserSwipeableActions from "@/components/swipeable/actions/ChatSwipeableActions";
import SwipeableComponent from "@/components/swipeable/SwipeableComponent";
import {ThemedText} from "@/components/themed-text";
import TopBar from "@/components/TopBar";
import {typography} from "@/src/constants/theme";
import {useAuth} from "@/src/context/AuthContext";
import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {Chat} from "@/src/models/models";
import {subscribeToChats} from "@/src/services/chat/subscribeToChats";

import * as Haptics from "expo-haptics";
import {Link, router} from "expo-router";
import {useEffect, useState} from "react";
import {FlatList, Keyboard, Pressable, StyleSheet, View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Home() {
  const {theme} = useTheme();
  const {user} = useAuth();

  const [chats, setChats] = useState<Chat[]>([]);
  const [isNewChatSheetOpen, setIsNewChatSheetOpen] = useState<boolean>(false);
  const styles = createStyles(theme);

  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToChats(
      user.uid,
      (updatedChats) => {
        setChats(updatedChats);
      },
      console.error,
    );
    return () => unsub();
  }, [user]);

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
      <TopBar
        leftButton={{
          text: "Settings",
          onPress: () => router.push("/settings"),
        }}
        righButton={{
          text: "Friends",
          onPress: () => router.push("/friends"),
        }}
      />
      <FlatList
        data={chats}
        style={{
          flex: 1,
        }}
        keyExtractor={(item) => item.id!.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <SwipeableComponent actions={() => UserSwipeableActions({chatId: item.id!})}>
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
                    <ThemedText style={{...typography.digitalH1, color: theme.accent}}>{item.name.toUpperCase()}</ThemedText>
                    <ThemedText style={{}}>{`${item.members.length} User${item.members.length === 1 ? "" : "s"}`}</ThemedText>
                  </View>
                </Pressable>
              </Link>
            </SwipeableComponent>
          );
        }}
      />
      <AddButton onPress={() => setIsNewChatSheetOpen(true)} text="New Chat" />
      <GeneralBottomSheet isOpen={isNewChatSheetOpen} onDismiss={closeNewChatSheet}>
        <NewChatBottomSheet onCancel={closeNewChatSheet} onConfirm={closeNewChatSheet} />
      </GeneralBottomSheet>
    </SafeAreaView>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    chat: {
      backgroundColor: theme.background,
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 0,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 20,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.lightGrey,
    },
  });
}
