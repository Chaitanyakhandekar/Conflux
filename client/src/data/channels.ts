export interface Channel {
  id: string
  name: string
  section: string
  hasNotification?: boolean
  isActive?: boolean
}

export interface ChannelSection {
  label: string
  type: "channel" | "dm"
  items: Channel[]
}

export const channelSections: ChannelSection[] = [
  {
    label: "ENGINEERING",
    type: "channel",
    items: [
      { id: "1", name: "general-arch", section: "ENGINEERING", isActive: true },
      { id: "2", name: "deploy-logs", section: "ENGINEERING", hasNotification: true },
      { id: "3", name: "rust-refactor", section: "ENGINEERING" },
    ],
  },
  {
    label: "DESIGN",
    type: "channel",
    items: [
      { id: "4", name: "ui-kit-tokens", section: "DESIGN" },
      { id: "5", name: "brand-motion", section: "DESIGN" },
    ],
  },
  {
    label: "MESSAGES",
    type: "dm",
    items: [
      { id: "6", name: "sarah_dev", section: "MESSAGES" },
      { id: "7", name: "alex_ops", section: "MESSAGES" },
    ],
  },
]
