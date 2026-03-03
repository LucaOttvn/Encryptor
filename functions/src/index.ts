import { setGlobalOptions } from "firebase-functions/v2";
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Limits concurrency by allowing at most 10 instances of your functions to run at once (helps control cost / downstream load)
setGlobalOptions({ maxInstances: 10 });

initializeApp();
const db = getFirestore();

type Chat = {
    name: string;
    members: string[];
};

type Message = {
    chatId: string;
    senderId: string;
    text?: string;
};

/**
 * This method exports a cloud function named notifyNewMessage.
 * It triggers for any new document created under messages/*.
 */
export const notifyNewMessage = onDocumentCreated(
    "messages/{messageId}",
    async (event) => {
        const snap = event.data;
        if (!snap) return;

        const msg = snap.data() as Message;
        if (!msg.chatId || !msg.senderId) {
            logger.warn("Message missing chatId/senderId", { messageId: snap.id, msg });
            return;
        }

        const chatSnap = await db.doc(`chats/${msg.chatId}`).get();
        if (!chatSnap.exists) {
            logger.warn("Chat not found", { chatId: msg.chatId, messageId: snap.id });
            return;
        }

        const chat = chatSnap.data() as Chat;
        const members = chat.members ?? [];
        // Filter out the message sender from the recipients array since they doesn't need to receive the notification
        const recipientUids = members.filter((uid) => uid && uid !== msg.senderId);

        // Fetch tokens in parallel
        const userSnaps = await Promise.all(
            recipientUids.map((uid) => db.doc(`users/${uid}`).get())
        );

        const tokens = userSnaps
            .map((s) => s.get("expoPushToken") as string | undefined)
            .filter((t): t is string => typeof t === "string" && t.length > 0);

        if (tokens.length === 0) {
            logger.info("No expoPushTokens for recipients", {
                chatId: msg.chatId,
                recipientCount: recipientUids.length,
            });
            return;
        }

        const payload = {
            to: tokens,
            sound: "default",
            title: chat.name || "New message",
            body: msg.text?.slice(0, 140) || "New message",
            data: { chatId: msg.chatId, messageId: snap.id },
        };

        const res = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const text = await res.text();
            logger.error("Expo push failed", { status: res.status, text });
            return;
        }

        logger.info("Push sent", {
            chatId: msg.chatId,
            sentTo: tokens.length,
            messageId: snap.id,
        });
    }
);
