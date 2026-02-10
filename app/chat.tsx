import MessageInput from "@/components/MessageInput";
import { ThemedText } from "@/components/themed-text";
import { Message } from "@/models/models";
import { useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const messages: Message[] = [
  {
    id: 1,
    text: "First message",
  },
  {
    id: 2,
    text: "Second message",
  },
  {
    id: 3,
    text: "Third message",
  },
  {
    id: 4,
    text: "Fourth message",
  },
  {
    id: 5,
    text: "Fifth message",
  },
  {
    id: 6,
    text: "Sixth message",
  },
  {
    id: 7,
    text: "Seventh message",
  },
];
// ...
export default function Chat() {
  const [message, setMessage] = useState<string>("");

  function handleInput() {
    // setMessage()
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0}>
        <FlatList
          style={{flex: 1}}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View>
              <ThemedText>{item.text}</ThemedText>
            </View>
          )}
        />
        <MessageInput message={message} handleInput={handleInput} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
