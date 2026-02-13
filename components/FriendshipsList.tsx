import {useAuth} from "@/src/context/AuthContext";
import {User} from "@/src/models/models";
import {getFriendships} from "@/src/services/getFriendships";
import {useEffect, useState} from "react";
import {FlatList} from "react-native";
import UserCard from "./UserCard";

export default function FriendshipsList() {
  const {user} = useAuth();

  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const friendsResult: User[] = await getFriendships(user.uid);
      console.log(friendsResult);
      setFriends(friendsResult);
    })();
  }, [user]);

  return (
    <FlatList
      data={friends}
      style={{
        height: '100%'
      }}
      renderItem={({item}) => <UserCard user={item} />}
      keyExtractor={(item) => item.id!.toString()}
    />
  );
}
