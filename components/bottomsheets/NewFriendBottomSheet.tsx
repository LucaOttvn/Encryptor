import {typography} from "@/src/constants/theme";
import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import MainButton from "../buttons/MainButton";
import {ThemedText} from "../themed-text";

type NewFriendBottomSheetProps = {
  onCancel: () => void;
  onConfirm: () => void;
  newFriendName: string;
  handleNewFriendName: (input: string) => void;
  error?: string;
};

export default function NewFriendBottomSheet(props: NewFriendBottomSheetProps) {
  const {theme} = useTheme();

  const styles = createStyles(theme, props.newFriendName.length);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <BottomSheetTextInput
        placeholder="User name"
        style={{...typography.h1, ...styles.friendNameInput}}
        placeholderTextColor={theme.grey}
        onChangeText={(value) => {
          props.handleNewFriendName(value);
        }}
      />

      {props.error && <ThemedText style={{color: "red", marginHorizontal: 'auto'}}>{props.error}</ThemedText>}

      <View style={styles.footer}>
        <MainButton text="Cancel" onPress={props.onCancel} />
        <MainButton text="Confirm" onPress={props.onConfirm} />
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ColorPalette, inputLength: number) {
  return StyleSheet.create({
    footer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      borderTopColor: theme.grey,
      borderTopWidth: 1,
      paddingBottom: 10,
      paddingTop: 20,
    },
    friendNameInput: {
      color: theme.foreground,
      marginHorizontal: "auto",
      textAlign: inputLength > 0 ? "center" : "right",
    },
  });
}
