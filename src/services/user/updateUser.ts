import { doc, getFirestore, setDoc } from "@react-native-firebase/firestore";
import { User } from "../../models/models";

export async function updateUser(
    id: string,
    updatedFields: Partial<User>
): Promise<void> {
    const db = getFirestore();
    await setDoc(doc(db, "users", id), updatedFields, { merge: true });
}
