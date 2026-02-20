import {ThemedText} from "@/components/themed-text";
import {useTheme} from "@/src/context/ThemeContext";
import {getSharedStyles} from "@/src/utils";
import React from "react";
import { Alert } from "react-native";
import {RectButton} from "react-native-gesture-handler";

export default function FriendSwipeableActions() {
  const {theme} = useTheme();
  const sharedStyles = getSharedStyles(theme);

  function askToDelete() {
    Alert.alert(
      "Delete friend?",
      "",
      [
        {text: "Cancel", style: "cancel", onPress: () => {}},
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log('Deleting friend')
          },
        },
      ],
      {cancelable: true},
    );
  }
  return (
    <RectButton style={sharedStyles.swipeableAction} onPress={askToDelete}>
      <ThemedText style={{color: theme.background}}>Delete</ThemedText>
    </RectButton>
  );
}
