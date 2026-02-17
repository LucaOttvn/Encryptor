import { addDoc, collection, getFirestore } from "@react-native-firebase/firestore";
import { Friendship } from "../../models/models";

export async function createFriendship(friendship: Friendship) {

    const db = getFirestore();

    try {
        await addDoc(collection(db, "friendships"), friendship);
    } catch (error) {
        console.error(error)
    }
}
