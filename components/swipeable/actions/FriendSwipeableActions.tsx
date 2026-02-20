import {ThemedText} from "@/components/themed-text";
import {useTheme} from "@/src/context/ThemeContext";
import { deleteFriendship } from "@/src/services/friendships/deleteFriendship";
import {getSharedStyles} from "@/src/utils";
import React from "react";
import { Alert } from "react-native";
import {RectButton} from "react-native-gesture-handler";

type FriendSwipeableActionsProps = {
  friendshipId: string
}

export default function FriendSwipeableActions(props: FriendSwipeableActionsProps) {
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
            deleteFriendship(props.friendshipId)
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
