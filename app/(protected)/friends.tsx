import {GeneralBottomSheet} from "@/components/bottomsheets/GeneralBottomSheet";
import NewFriendBottomSheet from "@/components/bottomsheets/NewFriendBottomSheet";
import AddButton from "@/components/buttons/AddButton";
import MainButton from "@/components/buttons/MainButton";
import FriendSwipeableActions from "@/components/swipeable/actions/FriendSwipeableActions";
import SwipeableComponent from "@/components/swipeable/SwipeableComponent";
import {ThemedText} from "@/components/themed-text";
import TopBar from "@/components/TopBar";
import {typography} from "@/src/constants/theme";
import {useAuth} from "@/src/context/AuthContext";
import {useTheme} from "@/src/context/ThemeContext";
import {Friendship, User} from "@/src/models/models";
import {createFriendship} from "@/src/services/friendships/createFriendship";
import {getFriendships} from "@/src/services/friendships/getFriendships";
import {getUserByName} from "@/src/services/user/getUserByName";
import {getSharedStyles} from "@/src/utils";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import {FlatList, View} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Users() {
  const {user} = useAuth();
  const {theme} = useTheme();

  const [friends, setFriends] = useState<User[]>([]);
  const [isNewFriendSheetOpen, setIsNewFriendSheetOpen] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [error, setError] = useState<string>();

  const sharedStyles = getSharedStyles(theme);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const friendsResult: User[] = await getFriendships(user.uid);
      setFriends(friendsResult);
    })();
  }, [user]);

  async function handleCreateFriend() {
    try {
      if (!user) return;

      const friend = await getUserByName(newFriendName);

      if (!friend) throw Error("User not found");

      const loggedUserFriends = await getFriendships(user.uid);

      const isFriendAlready = loggedUserFriends.find((userFriend) => userFriend.id === friend.id);

      if (isFriendAlready) throw Error("This user is already a friend");

      const newFriendship: Friendship = {
        members: [user?.uid, friend.id],
      };

      await createFriendship(newFriendship);
    } catch (error) {
      setError((error as Error).message);
    }
  }

  function handleNewFriendName(input: string) {
    setError(undefined);
    setNewFriendName(input);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopBar
        title="Friends"
        leftButton={{
          text: "Back",
          onPress: () => router.back(),
        }}
      />
      <FlatList
        style={{flex: 1, paddingHorizontal: 10}}
        contentContainerStyle={{
          gap: 10,
        }}
        data={friends}
        keyExtractor={(item) => item.id!.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <SwipeableComponent actions={() => <FriendSwipeableActions />}>
            <View
              style={{
                backgroundColor: theme.background,
                paddingVertical: 10,
              }}
            >
              <ThemedText style={{...typography.digitalH1, color: theme.accent}}>{item.name}</ThemedText>
              <ThemedText>Test</ThemedText>
            </View>
          </SwipeableComponent>
        )}
      />
      <AddButton onPress={() => setIsNewFriendSheetOpen(true)} text="New Friend" />
      <GeneralBottomSheet isOpen={isNewFriendSheetOpen} onDismiss={() => setIsNewFriendSheetOpen(false)} snapPoints={["35%"]}>
        <NewFriendBottomSheet onCancel={() => setIsNewFriendSheetOpen(false)} onConfirm={handleCreateFriend} newFriendName={newFriendName} handleNewFriendName={handleNewFriendName} error={error} />
      </GeneralBottomSheet>
    </SafeAreaView>
  );
}
