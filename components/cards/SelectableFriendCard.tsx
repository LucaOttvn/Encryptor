import { typography } from "@/src/constants/theme";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeContext";
import { Friendship, User } from "@/src/models/models";
import { getUser } from "@/src/services/user/getUser";
import { useEffect, useState } from "react";
import MainButton from "../buttons/MainButton";
import { ThemedText } from "../themed-text";

type SelectableFriendCardProps = {
  friendship: Friendship;
  selectedIds: Set<string>;
  handleSelected: (ids: string) => void;
};

export default function SelectableFriendCard(props: SelectableFriendCardProps) {
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

  const isFriendSelected = props.selectedIds.has(friend.id);

  return <MainButton text={friend.name} textStyle={{...typography.digitalH1, color: isFriendSelected ? theme.accent : theme.grey}} onPress={() => props.handleSelected(friend.id)} />;
}
