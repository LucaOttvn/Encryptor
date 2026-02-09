import {ThemedText} from "@/components/themed-text";
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
  const styles = createStyles();

  return (
    <SafeAreaView edges={["left", "right"]}>
      <FlatList
        data={chats}
        style={{
          height: "100%",
        }}
        contentContainerStyle={{
          rowGap: 12,
          paddingTop: 10
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Link href="/chat" asChild>
              <Pressable>
                <View style={styles.chat}>
                  <ThemedText>{item.name}</ThemedText>
                </View>
              </Pressable>
            </Link>
          );
        }}
      />
    </SafeAreaView>
  );
}

function createStyles() {
  return StyleSheet.create({
    chat: {
      backgroundColor: "blue",
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
  });
}
