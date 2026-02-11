import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";


export type Chat = {
  id: number,
  type: ChatTypes
  name: string
}

export type Message = {
  id: string;
  group: string | undefined;
  text: string;
  senderId: string;
  createdAt: FirebaseFirestoreTypes.Timestamp; // store Firestore timestamp
};

export enum ChatTypes {
  group = "group",
  single = "single",
}