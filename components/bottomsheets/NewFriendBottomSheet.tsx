import { typography } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { ColorPalette, useTheme } from "@/src/context/ThemeContext";
import { Friendship } from "@/src/models/models";
import { createFriendship } from "@/src/services/friendships/createFriendship";
import { getFriendships } from "@/src/services/friendships/getFriendships";
import { validateEmail } from "@/src/utils";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MainButton from "../buttons/MainButton";
import { ThemedText } from "../themed-text";
import { getUserByEmail } from "@/src/services/user/getUserByName";

type NewFriendBottomSheetProps = {
  onCancel: () => void;
  onConfirm: () => void;
  newFriendEmail: string;
  handleNewFriendEmail: (input: string) => void;
};

export default function NewFriendBottomSheet(props: NewFriendBottomSheetProps) {
  const {theme} = useTheme();
  const {user} = useAuth();

  const styles = createStyles(theme, props.newFriendEmail.length);
  const [error, setError] = useState<string>();

  async function handleCreateFriend() {
    try {
      if (!user) return;

      const validationResult = validateEmail(props.newFriendEmail);

      if (!validationResult.ok) throw Error(validationResult.error);

      const friend = await getUserByEmail(props.newFriendEmail);

      if (!friend) throw Error("User not found");

      const loggedUserFriends = await getFriendships(user.uid);

      const isFriendAlready = loggedUserFriends.find((userFriend) => userFriend.id === friend.id);

      if (isFriendAlready) throw Error("This user is already a friend");

      const newFriendship: Friendship = {
        members: [user?.uid, friend.id],
      };

      await createFriendship(newFriendship);

      props.onConfirm();
    } catch (error) {
      setError((error as Error).message);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
      edges={["left", "right", "bottom"]}
    >
      <BottomSheetTextInput
        placeholder="User email"
        style={{...typography.h1, ...styles.friendNameInput}}
        placeholderTextColor={theme.grey}
        onChangeText={(value) => {
          setError(undefined);
          props.handleNewFriendEmail(value);
        }}
      />

      {error && <ThemedText style={{color: "red", marginHorizontal: "auto"}}>{error}</ThemedText>}

      <View style={styles.footer}>
        <MainButton text="Cancel" onPress={props.onCancel} />
        <MainButton text="Confirm" onPress={handleCreateFriend} />
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
      width: "100%",
      color: theme.foreground,
      marginHorizontal: "auto",
      textAlign: "center",
    },
  });
}
