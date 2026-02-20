import {typography} from "@/src/constants/theme";
import {useTheme} from "@/src/context/ThemeContext";
import {getSharedStyles} from "@/src/utils";
import {View} from "react-native";
import MainButton from "./buttons/MainButton";
import {ThemedText} from "./themed-text";

interface TopBarProps {
  leftButton?: {
    text: string;
    onPress: () => void;
  };
  title?: string;
  righButton?: {
    text: string;
    onPress: () => void;
  };
}

export default function TopBar(props: TopBarProps) {
  const {theme} = useTheme();
  const sharedStyles = getSharedStyles(theme);

  return (
    <View style={sharedStyles.topBar}>
      <MainButton
        containerStyle={{
          flex: 1,
        }}
        text={props.leftButton ? props.leftButton.text : ""}
        onPress={props.leftButton ? props.leftButton.onPress : undefined}
      />
      <ThemedText
        style={{
          fontWeight: 'bold',
          color: theme.accent,
          flex: 2,
          textAlign: "center",
          overflowX: "hidden",
          paddingHorizontal: "auto",
        }}
      >
        {props.title || ''}
      </ThemedText>
      <MainButton
        containerStyle={{
          flex: 1,
          alignItems: "flex-end",
        }}
        text={props.righButton ? props.righButton.text : ""}
        onPress={props.righButton ? props.righButton.onPress : undefined}
      />
    </View>
  );
}
