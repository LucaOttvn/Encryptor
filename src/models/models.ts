import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type User = {
  id: string
  name: string
  email: string
}

export type Chat = {
  id?: string,
  name: string,
  members: string[]
}

export type Friendship = {
  id?: string
  members: string[]
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