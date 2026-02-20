import { getAuth } from "@react-native-firebase/auth";
import { doc, getFirestore, setDoc } from "@react-native-firebase/firestore";

/**
 * This upsert method (update/insert) is called after each sign-in.
 * If the just-logged user doesn’t exist in the "users" collection yet, it creates a new one, otherwise it merges/updates the provided fields.
 */
export async function upsertUser() {
  const authUser = getAuth().currentUser;
  if (!authUser) throw new Error("Not logged in");

  const db = getFirestore();

  await setDoc(
    doc(db, "users", authUser.uid),
    { name: authUser.displayName ?? "Unknown", email: authUser.email },
    { merge: true }
  );
}
