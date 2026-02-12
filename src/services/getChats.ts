import { collection, getDocs, getFirestore, query } from "@react-native-firebase/firestore";

export async function getChats() {
    const db = getFirestore();

    const q = query(collection(db, "chats"));

    const snap = await getDocs(q);

    return snap.docs.map((document: any) => ({ id: document.id, ...document.data() })).reverse();
}