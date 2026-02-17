import { User } from "@/src/models/models";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "@react-native-firebase/firestore";
import { getUsers } from "../user/getUsers";

export async function getFriendships(loggedUid: string): Promise<User[]> {
    const db = getFirestore();

    const q = query(
        collection(db, "friendships"),
        where("members", "array-contains", loggedUid)
    );

    const snap = await getDocs(q);

    // Return friend UIDs (the other member)
    const friendsUIDs = snap.docs
        .map((d: any) => d.get("members") as string[])
        .map((members: string[]) => members.find((uid) => uid !== loggedUid))

    return getUsers(friendsUIDs)
}
