import { ThemedText } from "@/components/themed-text";
import { typography } from "@/src/constants/theme";
import { ColorPalette, useTheme } from "@/src/context/ThemeContext";
import { Chat, ChatTypes } from "@/src/models/models";

import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <View style={styles.topBar}>
        {/* <Ionicons name="settings" color={theme.foreground} size={20} /> */}

        <Link href="/settings" asChild>
          <Pressable
            onPressIn={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
            }}
          >
            <ThemedText>Settings</ThemedText>
          </Pressable>
        </Link>
        <ThemedText>User name</ThemedText>
      </View>
      <FlatList
        data={chats}
        style={{
          height: "100%",
        }}
        contentContainerStyle={{}}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Link
              href={{
                pathname: "./chat/[id]",
                params: {
                  id: String(item.id),
                  name: item.name,
                },
              }}
              asChild
            >
              <Pressable
                onPressIn={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                }}
              >
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
      borderColor: theme.foreground,
      borderBottomWidth: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    topBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 10,
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.foreground,
    },
  });
}
