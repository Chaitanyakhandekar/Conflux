import mongoose, { Document, Model } from "mongoose"

export interface IServer extends Document {
    name: string
    description: string
    ownerId: mongoose.Types.ObjectId
}

export interface IServerMethods {
    isOwner: (userId: string) => boolean
}

export interface ServerModel extends Model<IServer, {}, IServerMethods> { }