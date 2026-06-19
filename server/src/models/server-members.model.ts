import mongoose, { Schema } from "mongoose";

const serverMemberSchema = new Schema({

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


serverMemberSchema.methods.hasRole =
    function (roleId: string): boolean {

        return this.roleIds.some(
            (id: mongoose.Types.ObjectId) =>
                id.toString() === roleId
        )
    }


serverMemberSchema.methods.banMember =
    async function () {

        this.isBanned = true

        await this.save({
            validateBeforeSave: false
        })
    }


export const ServerMember =
    mongoose.model(
        "ServerMember",
        serverMemberSchema
    )