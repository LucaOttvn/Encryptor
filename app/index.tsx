import {ThemedText} from "@/components/themed-text";
import { typography } from "@/constants/theme";
import {ColorPalette, useTheme} from "@/context/ThemeContext";
import {Chat, ChatTypes} from "@/models/models";
import {Link} from "expo-router";
import {FlatList, View, StyleSheet, Pressable} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const chats: Chat[] = [
  {
    id: 1,
    type: ChatTypes.single,
    name: "Sect",
  },
  {
    id: 2,
    type: ChatTypes.single,
    name: "Group 1",
  },
  {
    id: 3,
    type: ChatTypes.single,
    name: "User 1",
  },
  {
    id: 4,
    type: ChatTypes.single,
    name: "User 2",
  },
];

export default function Home() {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView>
      <FlatList
        data={chats}
        style={{
          height: "100%",
        }}
        contentContainerStyle={{
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Link href="/chat" asChild>
              <Pressable>
                <View style={styles.chat}>
                  <ThemedText style={typography.h1}>{item.name.toUpperCase()}</ThemedText>
                  <ThemedText>This is the last message</ThemedText>
                </View>
              </Pressable>
            </Link>
          );
        }}
      />
    </SafeAreaView>
  );
}

function createStyles(theme: ColorPalette) {
  return StyleSheet.create({
    chat: {
      backgroundColor: "",
      borderColor: theme.foreground,
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
  });
}
