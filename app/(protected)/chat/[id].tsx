import MessageComponent from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import {MessageDisplay} from "@/src/models/models";
import {subscribeToMessages} from "@/src/services/subscribeToMessages";
import {useHeaderHeight} from "@react-navigation/elements";
import {Stack, useLocalSearchParams} from "expo-router";
import {useCallback, useEffect, useRef, useState} from "react";
import {FlatList, KeyboardAvoidingView, Platform} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Chat() {
  const {id, name: chatName} = useLocalSearchParams<{id: string; name?: string}>();

  const [messages, setMessages] = useState<MessageDisplay[]>([]);
  const didAutoScroll = useRef(false);

  useEffect(() => {
    didAutoScroll.current = false;
    if (!id) return;

    const unsubscribe = subscribeToMessages(id, (msgs) => {
      setMessages(msgs); // msgs should already be MessageDisplay[]
    });

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
    </>
  );
}
