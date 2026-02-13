import FriendshipsList from "@/components/FriendshipsList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Users() {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <FriendshipsList />
    </SafeAreaView>
  );
}
