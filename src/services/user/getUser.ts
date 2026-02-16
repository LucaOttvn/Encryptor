import { doc, getDoc, getFirestore } from "@react-native-firebase/firestore";

export async function getUser(uid: string) {
    const db = getFirestore();
    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
}
