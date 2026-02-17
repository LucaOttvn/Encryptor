import { Chat } from "@/src/models/models";
import {
    collection,
    getFirestore,
    onSnapshot,
    query,
    where,
    type FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export function subscribeToChats(
    userId: string,
    onUpdate: (chats: Chat[]) => void,
    onError?: (error: unknown) => void
) {
    const db = getFirestore();
    const q = query(
        collection(db, "chats"),
        where("members", "array-contains", userId)

    );

    const unsubscribe = onSnapshot(
        q,
        (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
            const chats: Chat[] = snap.docs
                .map((doc) => ({ id: doc.id, ...doc.data() as Chat }))
                .reverse();

            onUpdate(chats);
        },
        (err) => {
            onError?.(err);
        }
    );

    return unsubscribe;
}
