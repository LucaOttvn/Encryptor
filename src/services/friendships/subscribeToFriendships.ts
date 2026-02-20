import { Friendship } from "@/src/models/models";
import {
    collection,
    getFirestore,
    onSnapshot,
    query,
    where,
    type FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";

export function subscribeToFriendships(
    loggedUid: string,
    onUpdate: (friendships: Friendship[]) => void,
    onError?: (error: unknown) => void
) {
    const db = getFirestore();

    const q = query(
        collection(db, "friendships"),
        where("members", "array-contains", loggedUid)
    );

    const unsubscribe = onSnapshot(
        q,
        (snap: FirebaseFirestoreTypes.QuerySnapshot) => {
            const friendships: Friendship[] = snap.docs
                .map((doc) => ({ id: doc.id, ...(doc.data() as Friendship) }))
                .reverse();

            onUpdate(friendships);
        },
        (err) => onError?.(err)
    );

    return unsubscribe;
}
