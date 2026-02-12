import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {TextInput, StyleSheet} from "react-native";

type TextInputComponentProps = {
  placeholder: string;
};

export default function TextInputComponent(props: TextInputComponentProps) {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return <TextInput placeholder={props.placeholder} style={styles.input}></TextInput>;
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: 30,
      borderColor: theme.foreground,
      paddingHorizontal: 15,
      paddingVertical: 15
    },
  });
}
