import { User } from "@/src/models/models";
import { doc, getDoc, getFirestore } from "@react-native-firebase/firestore";

export async function getUser(uid: string): Promise<User> {
    try {
        const db = getFirestore();
        const snap = await getDoc(doc(db, "users", uid));

        if (!snap.exists()) throw Error(`User with id ${uid} not found`);

        return { id: snap.id, ...snap.data() } as User;
    } catch (error: any) {
        throw error
    }
}
