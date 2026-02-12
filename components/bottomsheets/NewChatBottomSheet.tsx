import {typography} from "@/src/constants/theme";
import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {getSharedStyles} from "@/src/utils";
import {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {useMemo} from "react";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemedText} from "../themed-text";

export default function NewChatBottomSheet() {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const sharedStyles = useMemo(() => getSharedStyles(theme), [theme]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
      edges={["bottom", "left", "right"]}
    >
      <ThemedText style={{...typography.h1, marginHorizontal: "auto"}}>New chat</ThemedText>
      <BottomSheetTextInput placeholder="Insert chat name" style={sharedStyles.input}></BottomSheetTextInput>
      <View style={styles.footer}>
        <ThemedText>Cancel</ThemedText>
        <ThemedText>Confirm</ThemedText>
      </View>
    </SafeAreaView>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    footer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      borderTopColor: theme.foreground,
      borderTopWidth: 1,
      paddingBottom: 10,
      paddingTop: 20,
    },
  });
}
