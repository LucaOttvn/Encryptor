import {ThemedText} from "@/components/themed-text";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Users() {
  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <ThemedText>Test users</ThemedText>
    </SafeAreaView>
  );
}
