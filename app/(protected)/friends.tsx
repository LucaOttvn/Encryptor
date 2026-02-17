import {GeneralBottomSheet} from "@/components/bottomsheets/GeneralBottomSheet";
import NewFriendBottomSheet from "@/components/bottomsheets/NewFriendBottomSheet";
import AddButton from "@/components/buttons/AddButton";
import {ThemedText} from "@/components/themed-text";
import {useAuth} from "@/src/context/AuthContext";
import {Friendship, User} from "@/src/models/models";
import {createFriendship} from "@/src/services/friendships/createFriendship";
import {getFriendships} from "@/src/services/friendships/getFriendships";
import {getUserByName} from "@/src/services/user/getUserByName";
import {useEffect, useState} from "react";
import {FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Users() {
  const {user} = useAuth();

  const [friends, setFriends] = useState<User[]>([]);
  const [isNewFriendSheetOpen, setIsNewFriendSheetOpen] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [error, setError] = useState<string>();

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
    <SafeAreaView edges={["bottom", "left", "right"]} style={{flex: 1, padding: 10}}>
      <FlatList style={{flex: 1}} data={friends} keyExtractor={(item) => item.id!.toString()} showsVerticalScrollIndicator={false} renderItem={({item}) => <ThemedText>- {item.name}</ThemedText>} />
      <AddButton onPress={() => setIsNewFriendSheetOpen(true)} text="New Friend" />
      <GeneralBottomSheet isOpen={isNewFriendSheetOpen} onDismiss={() => setIsNewFriendSheetOpen(false)} snapPoints={["35%"]}>
        <NewFriendBottomSheet onCancel={() => setIsNewFriendSheetOpen(false)} onConfirm={handleCreateFriend} newFriendName={newFriendName} handleNewFriendName={handleNewFriendName} error={error} />
      </GeneralBottomSheet>
    </SafeAreaView>
  );
}
