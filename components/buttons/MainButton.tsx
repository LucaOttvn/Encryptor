import {Pressable, StyleProp, TextStyle, ViewStyle} from "react-native";
import * as Haptics from "expo-haptics";
import { ThemedText } from "../themed-text";

type MainButtonProps = {
  text: string;
  onPress?: (x?: any) => any;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function MainButton(props: MainButtonProps) {
  return (
    <Pressable
      hitSlop={10}
      onPressIn={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
      }}
      onPress={() => {
        if (props.onPress) props.onPress();
      }}
    >
      <ThemedText>{props.text}</ThemedText>
    </Pressable>
  );
}
