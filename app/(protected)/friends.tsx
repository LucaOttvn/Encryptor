import {GeneralBottomSheet} from "@/components/bottomsheets/GeneralBottomSheet";
import NewFriendBottomSheet from "@/components/bottomsheets/NewFriendBottomSheet";
import AddButton from "@/components/buttons/AddButton";
import {ThemedText} from "@/components/themed-text";
import {useAuth} from "@/src/context/AuthContext";
import {User} from "@/src/models/models";
import {getFriendships} from "@/src/services/friendships/getFriendships";
import {useState, useEffect} from "react";
import {FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Users() {
  const {user} = useAuth();

  const [friends, setFriends] = useState<User[]>([]);
  const [isNewFriendSheetOpen, setIsNewFriendSheetOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const friendsResult: User[] = await getFriendships(user.uid);
      setFriends(friendsResult);
    })();
  }, [user]);

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{flex: 1, padding: 10}}>
      <FlatList style={{flex: 1}} data={friends} keyExtractor={(item) => item.id!.toString()} showsVerticalScrollIndicator={false} renderItem={({item}) => <ThemedText>- {item.name}</ThemedText>} />
      <AddButton onPress={() => setIsNewFriendSheetOpen(true)} text="New Friend" />
      <GeneralBottomSheet isOpen={isNewFriendSheetOpen} onDismiss={() => setIsNewFriendSheetOpen(false)} snapPoints={["35%"]}>
        <NewFriendBottomSheet onCancel={() => setIsNewFriendSheetOpen(false)} onConfirm={() => {}}/>
      </GeneralBottomSheet>
    </SafeAreaView>
  );
}
