import { collection, getDocs, getFirestore, limit, query, where } from "@react-native-firebase/firestore";

export async function getUserByEmail(email: string) {
  const db = getFirestore();
  const q = query(collection(db, "users"), where("email", "==", email), limit(1));
  const snap = await getDocs(q);
  const d = snap.docs[0];
  return d ? { id: d.id, ...d.data() } : null;
}
