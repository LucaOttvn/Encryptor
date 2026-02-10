import MessageComponent from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import {Message} from "@/models/models";
import {useState} from "react";
import {FlatList, KeyboardAvoidingView, Platform} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export const messages: Message[] = [
  {id: 1, text: "Hey, are you free for a quick chat?"},
  {id: 2, text: "Yeah, what’s up?"},
  {id: 3, text: "Did you push the latest changes?"},
  {id: 4, text: "Not yet—doing a quick clean-up first."},
  {id: 5, text: "Ok. Any blockers?"},
  {id: 6, text: "No blockers, just finishing up tests."},
  {id: 7, text: "Nice. Can you review my PR later?"},
  {id: 8, text: "Sure—send the link."},
  {id: 9, text: "PR #184, it’s mostly UI tweaks."},
  {id: 10, text: "Got it. I’ll check it after dinner."},
  {id: 11, text: "Did you see the animation delay issue?"},
  {id: 12, text: "Yep—delay is in ms, not seconds."},
  {id: 13, text: "Ahh that explains it."},
  {id: 14, text: "Also need to stop the previous animation sometimes."},
  {id: 15, text: "Are we still on for tomorrow?"},
  {id: 16, text: "Yes—same time works for me."},
  {id: 17, text: "Cool. Want to sync 10 min before?"},
  {id: 18, text: "Sure, works."},
  {id: 19, text: "By the way, the UI looks clean."},
  {id: 20, text: "Thanks—still tweaking spacing and keyboard behavior."},
  {id: 21, text: "Should we add read receipts?"},
  {id: 22, text: "Later—let’s ship the basics first."},
  {id: 23, text: "Fair. What about message pagination?"},
  {id: 24, text: "We can add it when the list gets large."},
  {id: 25, text: "Ok. Any preference for IDs?"},
  {id: 26, text: "Numbers for mocks, UUIDs in prod."},
  {id: 27, text: "Makes sense."},
  {id: 28, text: "Ping me if anything breaks."},
  {id: 29, text: "Will do. Thanks!"},
  {id: 30, text: "All right, talk soon."},
];
export default function Chat() {
  const [message, setMessage] = useState<string>("");

  function handleInput() {
    // setMessage()
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0}>
        <FlatList style={{flex: 1}} data={messages} keyExtractor={(item) => item.id.toString()} showsVerticalScrollIndicator={false} renderItem={({item}) => <MessageComponent text={item.text} />} />
        <MessageInput message={message} handleInput={handleInput} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
