import mongoose, { Document, Model } from "mongoose"

export interface IServer extends Document {
    name: string
    description?: string
    serverType?: "GAMING" | "DEVELOPER" | "STARTUP" | "STUDY" | "CUSTOM"
    ownerId: mongoose.Types.ObjectId
}

export interface IServerMethods {
    isOwner: (userId: string) => boolean
}

export type ServerInfoType = {
    name?: string | undefined
    description?: string
    serverType?: "GAMING" | "DEVELOPER" | "STARTUP" | "STUDY" | "CUSTOM"
    ownerId?: mongoose.Types.ObjectId
}

export interface ServerModel extends Model<IServer, {}, IServerMethods> { }