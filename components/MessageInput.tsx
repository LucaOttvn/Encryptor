import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {Message} from "@/src/models/models";
import {sendMessage} from "@/src/services/sendMessage";
import {Ionicons} from "@expo/vector-icons";
import {getAuth} from "@react-native-firebase/auth";
import {serverTimestamp} from "@react-native-firebase/firestore";
import * as Haptics from "expo-haptics";
import {useRef, useState} from "react";
import {Animated, Easing, Pressable, StyleSheet, TextInput, View} from "react-native";

type MessageInputProps = {
  chatId: string;
  scrollToBottom: (animated?: boolean) => void;
};

/**
 * This is the input field component for the chat.
 * It handles user's input and cool animations.
 */
export default function MessageInput(props: MessageInputProps) {
  const {theme} = useTheme();

  const [message, setMessage] = useState<string>("");

  function handleInput(next: string) {
    setMessage(next);
  }

  const styles = createStyles(theme);

  const widthAnim = useRef(new Animated.Value(1)).current;

  const shrink = () => {
    props.scrollToBottom(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    Animated.timing(widthAnim, {
      toValue: 0.85,
      duration: 180,
      delay: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const expand = () => {
    Animated.timing(widthAnim, {
      toValue: 1,
      duration: 180,
      delay: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  async function send() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    if (message === "") return;

    handleInput("");

    const uid = getAuth().currentUser?.uid;
    if (!uid) throw new Error("Not logged in");

    const newMessage: Message = {
      text: message,
      senderId: uid,
      createdAt: serverTimestamp(),
      chatId: props.chatId,
    };
    await sendMessage(newMessage);
  }

  return (
    <View style={styles.inputBar}>
      <Animated.View style={{...styles.input, flex: widthAnim}}>
        <TextInput
          onChangeText={handleInput}
          value={message}
          placeholder="Message"
          placeholderTextColor="grey"
          onFocus={shrink}
          onBlur={expand}
          hitSlop={10}
          style={{
            paddingVertical: 16,
            color: theme.foreground,
          }}
        />
      </Animated.View>

      <Pressable onPress={send} style={styles.sendBtn} hitSlop={10}>
        <Ionicons name="send" color={theme.background} size={20} />
      </Pressable>
    </View>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    inputBar: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 30,
      padding: 1,
      backgroundColor: theme.foreground,
      marginHorizontal: 10,
    },
    input: {
      width: "100%",
      backgroundColor: theme.background,
      borderRadius: 30,
      paddingHorizontal: 20,
    },
    sendBtn: {
      paddingHorizontal: 16,
      position: "absolute",
      right: 0,
    },
  });
}
