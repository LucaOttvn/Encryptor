import { addDoc, collection, getFirestore } from "@react-native-firebase/firestore";
import { Chat } from "../../models/models";

export async function createChat(chat: Chat) {

    const db = getFirestore();

    try {
        await addDoc(collection(db, "chats"), chat);
    } catch (error) {
        console.error(error)
    }
}
