import { collection, getDocs, getFirestore, query } from "@react-native-firebase/firestore";

// TODO: filter the chats based on the users (user 1 can't get the chats of user 2 if it's not included in them)
export async function getChats() {
    const db = getFirestore();

    const q = query(collection(db, "chats"));

    const snap = await getDocs(q);

    return snap.docs.map((document: any) => ({ id: document.id, ...document.data() })).reverse();
}