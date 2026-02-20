import { typography } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Friendship, User } from "@/src/models/models";
import { getUser } from "@/src/services/user/getUser";
import { useEffect, useState } from "react";
import { View } from "react-native";
import SwipeableComponent from "../swipeable/SwipeableComponent";
import FriendSwipeableActions from "../swipeable/actions/FriendSwipeableActions";
import { ThemedText } from "../themed-text";

type SwipeableFriendCardProps = {
  friendship: Friendship;
};

export default function SwipeableFriendCard(props: SwipeableFriendCardProps) {
  const {user} = useAuth();
  const {theme} = useTheme();
  const [friend, setFriend] = useState<User>();

  useEffect(() => {
    (async () => {
      if (!user) return;

      const friendId = props.friendship.members.find((uid) => uid !== user.uid);

      if (!friendId) {
        console.log("No friend id found");
        return;
      }

      const friend: User = await getUser(friendId);

      setFriend(friend);
    })();
  }, [user, props.friendship.members]);

  if (!friend) return <ThemedText>Loading friend...</ThemedText>;

  return (
    <SwipeableComponent actions={() => <FriendSwipeableActions friendshipId={props.friendship.id!} />}>
      <View
        style={{
          backgroundColor: theme.background,
          paddingTop: 10,
        }}
      >
        <ThemedText style={{...typography.digitalH1, color: theme.accent}}>{friend.name}</ThemedText>
        <ThemedText>{friend.email}</ThemedText>
      </View>
    </SwipeableComponent>
  );
}
