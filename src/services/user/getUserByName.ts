import { collection, getDocs, getFirestore, limit, query, where } from "@react-native-firebase/firestore";

export async function getUserByName(name: string) {
  const db = getFirestore();
  const q = query(collection(db, "users"), where("name", "==", name), limit(1));
  const snap = await getDocs(q);
  const d = snap.docs[0];
  return d ? { id: d.id, ...d.data() } : null;
}
