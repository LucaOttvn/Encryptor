import { deleteDoc, doc, getFirestore } from "@react-native-firebase/firestore/lib/modular";


export async function deleteChat(chatId: string) {
    const db = getFirestore();

    try {
        await deleteDoc(doc(db, "chats", chatId));
    } catch (error) {
        console.error(error)
    }
}
