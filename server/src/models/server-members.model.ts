import mongoose, { Schema } from "mongoose";
import {
    IServerMember,
    IServerMemberMethods,
    ServerMemberModel
} from "../types/server-members.type.ts";

const serverMemberSchema = new Schema<IServerMember, ServerMemberModel, IServerMemberMethods>({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    serverId: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true
    },

    roleIds: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],

    nickname: {
        type: String
    },

    isMuted: {
        type: Boolean,
        default: false
    },

    isBanned: {
        type: Boolean,
        default: false
    },

    joinedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })


/**
 * @description Schema method to check if the member has a specific role.
 * @param roleId
 * @returns boolean
 */
serverMemberSchema.methods.hasRole =
    function (roleId: string): boolean {

        return this.roleIds.some(
            (id: mongoose.Types.ObjectId) =>
                id.toString() === roleId
        )
    }


/**
 * @description Schema method to ban the member from the server.
 */
serverMemberSchema.methods.banMember =
    async function () {

        this.isBanned = true

        await this.save({
            validateBeforeSave: false
        })
    }


export const ServerMember =
    mongoose.model<IServerMember, ServerMemberModel>(
        "ServerMember",
        serverMemberSchema
    )