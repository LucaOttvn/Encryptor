import { deleteDoc, doc, getFirestore } from "@react-native-firebase/firestore/lib/modular";

export async function deleteFriendship(id: string): Promise<void> {
  const db = getFirestore();
  await deleteDoc(doc(db, "friendships", id));
}
