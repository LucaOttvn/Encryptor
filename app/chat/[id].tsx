import MessageComponent from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import { Message, messages } from "@/models/models";
import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Chat() {
  const {id, name: chatName} = useLocalSearchParams<{id: string; name?: string}>();

  const [message, setMessage] = useState<string>("");

  const listRef = useRef<FlatList<Message>>(null);
  const didAutoScroll = useRef(false);

  const headerHeight = useHeaderHeight();

  const keyboardVerticalOffset =
    Platform.OS === "ios"
      ? headerHeight // usually enough; if you still see a gap, try headerHeight + insets.top
      : 0;

  const scrollToBottom = useCallback((animated = false) => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({animated});
    });
  }, []);

  function handleInput(next: string) {
    setMessage(next);
  }

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
            keyExtractor={(item) => item.id.toString()}
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

          <MessageInput message={message} handleInput={handleInput} scrollToBottom={scrollToBottom}/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
