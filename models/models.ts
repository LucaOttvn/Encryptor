export type Chat = {
    id: number,
    type: ChatTypes
    name: string
}

export type Message = {
    id: number,
    text: string,
    createdAt: string
}

export enum ChatTypes {
  group = "group",
  single = "single",
}

export const messages: Message[] = [
  { id: 1, text: "Hey, are you free for a quick chat?", createdAt: "09:14" },
  { id: 2, text: "Yeah, what’s up?", createdAt: "09:15" },
  { id: 3, text: "Did you push the latest changes?", createdAt: "09:17" },
  { id: 4, text: "Not yet—doing a quick clean-up first.", createdAt: "09:19" },
  { id: 5, text: "Ok. Any blockers?", createdAt: "09:20" },
  { id: 6, text: "No blockers, just finishing up tests.", createdAt: "09:22" },
  { id: 7, text: "Nice. Can you review my PR later?", createdAt: "09:25" },
  { id: 8, text: "Sure—send the link.", createdAt: "09:26" },
  { id: 9, text: "PR #184, it’s mostly UI tweaks.", createdAt: "09:29" },
  { id: 10, text: "Got it. I’ll check it after dinner.", createdAt: "09:31" },
  { id: 11, text: "Did you see the animation delay issue?", createdAt: "09:33" },
  { id: 12, text: "Yep—delay is in ms, not seconds.", createdAt: "09:35" },
  { id: 13, text: "Ahh that explains it.", createdAt: "09:36" },
  { id: 14, text: "Also need to stop the previous animation sometimes.", createdAt: "09:38" },
  { id: 15, text: "Are we still on for tomorrow?", createdAt: "09:41" },
  { id: 16, text: "Yes—same time works for me.", createdAt: "09:42" },
  { id: 17, text: "Cool. Want to sync 10 min before?", createdAt: "09:45" },
  { id: 18, text: "Sure, works.", createdAt: "09:47" },
  { id: 19, text: "By the way, the UI looks clean.", createdAt: "09:49" },
  { id: 20, text: "Thanks—still tweaking spacing and keyboard behavior.", createdAt: "09:52" },
  { id: 21, text: "Should we add read receipts?", createdAt: "09:54" },
  { id: 22, text: "Later—let’s ship the basics first.", createdAt: "09:56" },
  { id: 23, text: "Fair. What about message pagination?", createdAt: "09:58" },
  { id: 24, text: "We can add it when the list gets large.", createdAt: "10:01" },
  { id: 25, text: "Ok. Any preference for IDs?", createdAt: "10:03" },
  { id: 26, text: "Numbers for mocks, UUIDs in prod.", createdAt: "10:06" },
  { id: 27, text: "Makes sense.", createdAt: "10:08" },
  { id: 28, text: "Ping me if anything breaks.", createdAt: "10:10" },
  { id: 29, text: "Will do. Thanks!", createdAt: "10:12" },
  { id: 30, text: "All right, talk soon.", createdAt: "10:15" },
];