import { Chat } from "@/src/models/models";
import { doc, getDoc, getFirestore } from "@react-native-firebase/firestore";

export async function getChat(chatId: string): Promise<Chat> {
  if (!chatId) {
    throw new Error("getChat: chatId is required");
  }

  try {
    const db = getFirestore();
    const ref = doc(db, "chats", chatId);
    const snap = await getDoc(ref);

    if (!snap.exists) {
      throw new Error(`Chat not found: ${chatId}`);
    }

    const data = snap.data();
    
    return { id: snap.id, ...(data as object) } as Chat;

  } catch (error: any) {
    throw error
  }
}
