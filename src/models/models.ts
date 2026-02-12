import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type User = {
  id: string
  name: string,
  friends: string[]
}

export type Chat = {
  id?: string,
  name: string
}

// TODO: friendship status (pending/accepted/blocked)
export type Friendship = {
  userA: string
  userB: string
}

export type Message = {
  id?: string;
  chatId: string;
  text: string;
  senderId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp | FirebaseFirestoreTypes.FieldValue;
};

export type MessageDisplay = Message & {
  senderName: string;
};

export enum ChatTypes {
  group = "group",
  single = "single",
}