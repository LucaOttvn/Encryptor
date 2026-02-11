import {
    collection,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query,
    where,
    documentId,
} from "@react-native-firebase/firestore";
import { MessageDisplay } from "../models/models";

const chunk = <T,>(arr: T[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

export async function getMessages(chatId: string): Promise<MessageDisplay[]> {
    console.log('fetching messages')

    const db = getFirestore();

    // Fetch messages
    const q = query(
        collection(db, "messages"),
        where("chatId", "==", chatId),
        orderBy("createdAt", "desc"),
        limit(100),
    );

    const snap = await getDocs(q);

    const messages = snap.docs
        .map((docSnap: any) => ({ id: docSnap.id, ...docSnap.data() }))
        .reverse();

    // Fetch users for senderIds
    const senderIds = Array.from(
        new Set(messages.map((m: any) => m.senderId).filter(Boolean))
    );

    const usersById: Record<string, any> = {};

    for (const ids of chunk(senderIds, 10)) {
        const usersSnap = await getDocs(
            query(collection(db, "users"), where(documentId(), "in", ids))
        );

        usersSnap.docs.forEach((u: any) => {
            usersById[u.id] = u.data();
        });
    }

    return messages.map((m: any) => ({
        ...m,
        senderName: usersById[m.senderId]?.name ?? "Unknown",
    }));
}
