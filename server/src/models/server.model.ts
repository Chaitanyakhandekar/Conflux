import mongoose, { Schema } from "mongoose";
import {
    IServer,
    IServerMethods,
    ServerModel
} from "../types/server.type.ts";

const serverSchema = new Schema<IServer, ServerModel, IServerMethods>({

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        trim: true
    },

    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true })


/**
 * @description Schema method to check if a user is the owner of the server.
 * @param userId
 * @returns boolean
 */
serverSchema.methods.isOwner = function (userId: string): boolean {
    return this.ownerId.toString() === userId
}


export const Server =
    mongoose.model<IServer, ServerModel>("Server", serverSchema)
