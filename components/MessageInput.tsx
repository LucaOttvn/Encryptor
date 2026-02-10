import {ColorPalette, useTheme} from "@/context/ThemeContext";
import {Ionicons} from "@expo/vector-icons";
import {useRef} from "react";
import {Animated, Easing, View, StyleSheet, TextInput, Pressable} from "react-native";

type MessageInputProps = {
  message: string;
  handleInput: (value: string) => any;
};

/**
 * This is the input field component for the chat.
 * It handles user's input and cool animations.
 */
export default function MessageInput(props: MessageInputProps) {
  const {theme} = useTheme();

  const styles = createStyles(theme);

  const widthAnim = useRef(new Animated.Value(1)).current;

  const shrink = () => {
    Animated.timing(widthAnim, {
      toValue: 0.85,
      duration: 180,
      delay: 100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const expand = () => {
    Animated.timing(widthAnim, {
      toValue: 1,
      duration: 180,
      delay: 100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  };

  const send = () => {
    // const text = message.trim();
    // if (!text) return;
    // setMessage("");
  };

  return (
    <View style={styles.inputBar}>
      <Animated.View style={{...styles.input, flex: widthAnim}}>
        <TextInput onChangeText={props.handleInput} value={props.message} placeholder="Message" placeholderTextColor="grey" onFocus={shrink} onBlur={expand} />
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
      color: theme.foreground,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    sendBtn: {
      paddingHorizontal: 16,
      position: "absolute",
      right: 0,
    },
  });
}
