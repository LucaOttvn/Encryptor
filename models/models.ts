export type Chat = {
    id: number,
    type: ChatTypes
    name: string
}

export type Message = {
    id: number,
    text: string
}

export enum ChatTypes {
  group = "group",
  single = "single",
}