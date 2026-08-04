export type ServerType = {
  icon: React.JSX.Element | "<></>",
  label: string,
  desc: string,
  type: "GAMING" | "STUDY" | "DEVELOPER" | "STARTUP" | "CUSTOM"
}

export type CreateServerType = {
  description: string,
  serverType: "GAMING" | "STUDY" | "DEVELOPER" | "STARTUP" | "CUSTOM"
}

export type IdealServerType = {
  _id: string | any
  name: string
  serverType: "GAMING" | "STUDY" | "DEVELOPER" | "STARTUP" | "CUSTOM"
  description: string,
  serverIcon?:string,
  createdAt: Date
  updatedAt: Date
  gradient?: string
}

export type ChannelType = {
  categoryId: string
  createdAt: string | Date
  createdBy: string
  name: string
  position: number
  serverId: string
  type: "TEXT" | "VOICE" | "ANNOUNCEMENT"
  updatedAt: string | Date
  __v?: string
  _id: string
}

export type CategoryType = {
  channels: ChannelType[]
  createdAt: string | Date
  createdBy: string
  name: string
  position: number
  serverId: string
  updatedAt: string | Date
  _id: string
}