import {typography} from "@/src/constants/theme";
import {useAuth} from "@/src/context/AuthContext";
import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {useState} from "react";
import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import MainButton from "../buttons/MainButton";
import {ThemedText} from "../themed-text";
import {updateUser} from "@/src/services/user/updateUser";

type SettingsBottomSheetProps = {
  onCancel: () => void;
  onConfirm: () => void;
  username: string;
  handleUsername: (input: string) => void;
};

export default function SettingsBottomSheet(props: SettingsBottomSheetProps) {
  const {theme} = useTheme();
  const {user} = useAuth();

  const styles = createStyles(theme);
  const [error, setError] = useState<string>();
  
  async function handleConfirm() {
    try {
      if (!user) return;
      await updateUser(user.uid, {
        username: props.username,
      });
      props.onConfirm();
    } catch (error) {
      console.log(error);
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
        placeholder="Username"
        style={{...typography.h1, ...styles.friendNameInput}}
        placeholderTextColor={theme.grey}
        onChangeText={(value) => {
          props.handleUsername(value);
          setError(undefined);
        }}
        value={props.username}
      />

      {error && <ThemedText style={{color: "red", marginHorizontal: "auto"}}>{error}</ThemedText>}

      <View style={styles.footer}>
        <MainButton text="Cancel" onPress={props.onCancel} />
        <MainButton text="Confirm" onPress={handleConfirm} />
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
