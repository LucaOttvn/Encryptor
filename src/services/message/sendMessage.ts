import { addDoc, collection, getFirestore } from "@react-native-firebase/firestore";
import { Message } from "../../models/models";

export async function sendMessage(message: Message) {

    const db = getFirestore();

    try {
        await addDoc(collection(db, "messages"), message);
    } catch (error) {
        console.error(error)
    }
}
