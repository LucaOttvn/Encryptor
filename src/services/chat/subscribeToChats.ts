import {
    collection,
    getFirestore,
    onSnapshot,
    query,
    type FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { Chat } from "../models/models";

export function subscribeToChats(
    onUpdate: (chats: Chat[]) => void,
    onError?: (error: unknown) => void
) {
    const db = getFirestore();
    const q = query(collection(db, "chats"));

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
