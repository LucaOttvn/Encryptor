import { doc, getDoc, getFirestore } from "@react-native-firebase/firestore";
import { User } from "../../models/models";

export async function getUsers(uids: string[]): Promise<User[]> {
  const db = getFirestore();

  const snaps = await Promise.all(
    uids.map(uid => getDoc(doc(db, "users", uid)))
  );

  return snaps
    .filter(s => s.exists())
    .map(s => ({ id: s.id, ...s.data() }) as User);
}
