import {Pressable, StyleProp, TextStyle, ViewStyle} from "react-native";
import {ThemedText} from "./themed-text";
import * as Haptics from "expo-haptics";

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
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
        if (props.onPress) props.onPress();
      }}
    >
      <ThemedText>{props.text}</ThemedText>
    </Pressable>
  );
}
