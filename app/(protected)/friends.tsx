import {GeneralBottomSheet} from "@/components/bottomsheets/GeneralBottomSheet";
import NewFriendBottomSheet from "@/components/bottomsheets/NewFriendBottomSheet";
import AddButton from "@/components/buttons/AddButton";
import SwipeableFriendCard from "@/components/cards/SwipeableFriendCard";

import TopBar from "@/components/TopBar";
import {useAuth} from "@/src/context/AuthContext";
import {Friendship} from "@/src/models/models";
import {subscribeToFriendships} from "@/src/services/friendships/subscribeToFriendships";
import {router} from "expo-router";
import {useEffect, useState} from "react";
import {FlatList, Keyboard} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

/**
 * List of the logged user's friends.
 * @returns 
 */
export default function Users() {
  const {user} = useAuth();

  const [friendships, setFriendships] = useState<Friendship[]>([]);
  const [isNewFriendSheetOpen, setIsNewFriendSheetOpen] = useState(false);
  const [newFriendEmail, setNewFriendEmail] = useState("");

  // Start the subscription to the friendships collection to immediately show updates on change
  useEffect(() => {
    if (!user) return;
    const unsub = subscribeToFriendships(user.uid, (updatedFriendships) => {
      setFriendships(updatedFriendships);
    });
    return () => unsub();
  }, [user]);

  function handleNewFriendEmail(input: string) {
    setNewFriendEmail(input);
  }

  function closeNewChatSheet() {
    Keyboard.dismiss();
    setIsNewFriendSheetOpen(false);
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
        data={friendships}
        keyExtractor={(item) => item.id!.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <SwipeableFriendCard friendship={item} />}
      />
      <AddButton onPress={() => setIsNewFriendSheetOpen(true)} text="New Friend" />
        
      <GeneralBottomSheet isOpen={isNewFriendSheetOpen} onDismiss={closeNewChatSheet} snapPoints={["25%"]}>
        <NewFriendBottomSheet onCancel={closeNewChatSheet} onConfirm={closeNewChatSheet} newFriendEmail={newFriendEmail} handleNewFriendEmail={handleNewFriendEmail} />
      </GeneralBottomSheet>
    </SafeAreaView>
  );
}
