export type Chat = {
    id: number,
    type: ChatTypes
    name: string
}

export enum ChatTypes {
  group = "group",
  single = "single",
}