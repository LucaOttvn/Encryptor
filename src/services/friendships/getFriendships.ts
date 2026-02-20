import { Friendship } from "@/src/models/models";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "@react-native-firebase/firestore";

export async function getFriendships(loggedUid: string): Promise<Friendship[]> {
    const db = getFirestore();

    const q = query(
        collection(db, "friendships"),
        where("members", "array-contains", loggedUid)
    );

    const snap = await getDocs(q);

    return snap.docs.map((document: any) => ({ id: document.id, ...document.data() })).reverse();
}
