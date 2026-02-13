import {User} from "@/src/models/models";
import {View, StyleSheet} from "react-native";
import {ThemedText} from "./themed-text";
import {ColorPalette, useTheme} from "@/src/context/ThemeContext";
import { typography } from "@/src/constants/theme";

type UserCardProps = {
  user: User;
};

export default function UserCard(props: UserCardProps) {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.userCard}>
      <ThemedText style={typography.h3}>{props.user.name}</ThemedText>
    </View>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    userCard: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
  });
}
