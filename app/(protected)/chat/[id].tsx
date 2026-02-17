import {GeneralBottomSheet} from "@/components/bottomsheets/GeneralBottomSheet";
import MainButton from "@/components/buttons/MainButton";
import MessageComponent from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import {ThemedText} from "@/components/themed-text";
import {typography} from "@/src/constants/theme";
import {Chat, MessageDisplay, User} from "@/src/models/models";
import {getChat} from "@/src/services/chat/getChat";
import {subscribeToMessages} from "@/src/services/message/subscribeToMessages";
import {getUsers} from "@/src/services/user/getUsers";
import {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import {useHeaderHeight} from "@react-navigation/elements";
import {Stack, useLocalSearchParams} from "expo-router";
import {useCallback, useEffect, useRef, useState} from "react";
import {FlatList, KeyboardAvoidingView, Platform} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function ChatPage() {
  const {id, name: chatName} = useLocalSearchParams<{id: string; name?: string}>();

  const [messages, setMessages] = useState<MessageDisplay[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const didAutoScroll = useRef(false);

  useEffect(() => {
    didAutoScroll.current = false;
    if (!id) return;

    const unsubscribe = subscribeToMessages(id, (msgs) => {
      setMessages(msgs); // msgs should already be MessageDisplay[]
    });

    // Get chat members from the chat id
    (async () => {
      const currentChat = await getChat(id);
      if (!currentChat) return;
      const chatMembers = await getUsers(currentChat.members);
      setMembers(chatMembers);
    })();

    return unsubscribe;
  }, [id]);

  const listRef = useRef<FlatList<MessageDisplay>>(null);

  const headerHeight = useHeaderHeight();

  const keyboardVerticalOffset = Platform.OS === "ios" ? headerHeight + 10 : 0;

  const scrollToBottom = useCallback((animated = false) => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({animated});
    });
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: chatName ?? `Chat ${id}`,
          headerShown: true,
          headerRight: () => <MainButton text="Settings" containerStyle={{paddingHorizontal: 10}} onPress={() => setIsBottomSheetOpen(true)} />,
        }}
      />

      <SafeAreaView style={{flex: 1}} edges={["bottom", "left", "right"]}>
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={keyboardVerticalOffset}>
          <FlatList
            ref={listRef}
            style={{flex: 1}}
            data={messages}
            keyExtractor={(item) => item.id!.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <MessageComponent message={item} />}
            onLayout={() => {
              if (!didAutoScroll.current) {
                didAutoScroll.current = true;
                scrollToBottom(false);
              }
            }}
            onContentSizeChange={() => {
              if (didAutoScroll.current) scrollToBottom(false);
            }}
          />

          <MessageInput chatId={id} scrollToBottom={scrollToBottom} />
        </KeyboardAvoidingView>
      </SafeAreaView>

      <GeneralBottomSheet isOpen={isBottomSheetOpen} onDismiss={() => setIsBottomSheetOpen(false)}>
        <ThemedText style={{...typography.h2, marginHorizontal: "auto", marginTop: 20}}>Members</ThemedText>
        <BottomSheetFlatList data={members} keyExtractor={(item: User) => item.id!.toString()} renderItem={({item}: any) => <ThemedText>- {item.name}</ThemedText>} style={{flex: 1, marginTop: 40}} />
      </GeneralBottomSheet>
    </>
  );
}
