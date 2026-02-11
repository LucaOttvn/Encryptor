import {
    collection,
    doc,
    getDoc,
    getFirestore,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
    type Unsubscribe,
} from "@react-native-firebase/firestore";

type Message = { senderId: string; text: string; createdAt?: any; chatId: string };
type User = { name: string };

export function subscribeToMessages(
    chatId: string,
    onMessages: (msgs: any[]) => void,
): Unsubscribe {
    const db = getFirestore();
    const usersCache: Record<string, User> = {};

    const q = query(
        collection(db, "messages"),
        where("chatId", "==", chatId),
        orderBy("createdAt", "desc"),
        limit(100),
    );

    // Define the callback that's gonna be called when something changes in the collection
    return onSnapshot(q, async (snap) => {
        const messagesFromDB: Message[] = snap.docs.map((d: any) => ({ id: d.id, ...(d.data() as Message) })).reverse();

        // Get an array of single senderIds
        const senderIds: string[] = Array.from(new Set(messagesFromDB.map(m => m.senderId).filter(Boolean)));

        // Store the promise callbacks to retrieve the users related to the senderIds
        const fetchAndCacheUser = async (uid: string) => {
            if (usersCache[uid]) return;
            
            const snap = await getDoc(doc(db, "users", uid));
            const user = snap.exists() ? (snap.data() as User) : { name: "Unknown" };
            
            usersCache[uid] = user;
        };
        
        // For each senderId, fetch the relative user
        await Promise.all(senderIds.map(fetchAndCacheUser));

        const hydrated = messagesFromDB.map((m: any) => ({
            ...m,
            senderName: usersCache[m.senderId]?.name ?? "Unknown",
        }));

        onMessages(hydrated);
    });
}
