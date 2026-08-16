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

    ],
  },
  {
    label: "VOICE CHANNELS",
    items: [
      { id: "v1", name: "General Voice", type: "voice", users: ["Alex", "Rohan"] },
    ],
  },
  {
    label: "DIRECT MESSAGES",
    items: [
      { id: "d1", name: "Sarah", type: "dm" },

    ],
  },
]
