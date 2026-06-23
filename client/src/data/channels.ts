export interface Channel {
  id: string
  name: string
  type: "text" | "voice" | "dm"
  users?: string[]
  isActive?: boolean
  hasNotification?: boolean
}

export interface ChannelSection {
  label: string
  items: Channel[]
}

export const channelSections: ChannelSection[] = [
  {
    label: "TEXT CHANNELS",
    items: [
      { id: "t1", name: "general", type: "text" },
      { id: "t2", name: "memes", type: "text", hasNotification: true },
      { id: "t3", name: "backend-help", type: "text", isActive: true },
      { id: "t4", name: "frontend-help", type: "text" },
      { id: "t5", name: "announcements", type: "text" },
    ],
  },
  {
    label: "VOICE CHANNELS",
    items: [
      { id: "v1", name: "General Voice", type: "voice", users: ["Alex", "Rohan"] },
      { id: "v2", name: "Coding Room", type: "voice", users: ["Sarah"] },
      { id: "v3", name: "Chill Zone", type: "voice", users: [] },
    ],
  },
  {
    label: "DIRECT MESSAGES",
    items: [
      { id: "d1", name: "Sarah", type: "dm" },
      { id: "d2", name: "Alex", type: "dm" },
      { id: "d3", name: "Mike", type: "dm" },
    ],
  },
]
