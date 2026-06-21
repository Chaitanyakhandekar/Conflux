import mongoose, { Schema } from "mongoose";
import {
    IMessage,
    IMessageMethods,
    MessageModel
} from "../types/message.type.ts";

const messageSchema = new Schema<IMessage, MessageModel, IMessageMethods>({

    message: {
        type: String,
        trim: true
    },

    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    channelId: {
        type: Schema.Types.ObjectId,
        ref: "Channel"
    },

    conversationId: {
        type: Schema.Types.ObjectId,
        ref: "Conversation"
    },

    attachments: [{
        secure_url: String,
        public_id: String
    }],

    isSeen: {
        type: Boolean,
        default: false
    },

    seenBy: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    isReply: {
        type: Boolean,
        default: false
    },

    replyTo: {
        type: Schema.Types.ObjectId,
        ref: "Message"
    },

    reactions: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        emoji: String
    }],

    isSystemMessage: {
        type: Boolean,
        default: false
    },

    systemMessageType: {
        type: String
    },

    seenAt: {
        type: Date
    }

}, { timestamps: true })


/**
 * @description Schema method to mark a message as seen by a user.
 * @param userId
 */
messageSchema.methods.markSeen =
    async function (userId: string) {

        this.isSeen = true
        this.seenAt = new Date()

        this.seenBy.push(new mongoose.Types.ObjectId(userId))

        await this.save({
            validateBeforeSave: false
        })
    }


/**
 * @description Schema method to add a reaction to a message.
 * @param userId
 * @param emoji
 */
messageSchema.methods.addReaction =
    async function (
        userId: string,
        emoji: string
    ) {

        this.reactions.push({
            userId: new mongoose.Types.ObjectId(userId),
            emoji
        })

        await this.save({
            validateBeforeSave: false
        })

    }


/**
 * @description Schema method to edit the message content.
 * @param content
 */
messageSchema.methods.editMessage =
    async function (
        content: string
    ) {

        this.message = content

        await this.save({
            validateBeforeSave: false
        })

    }


messageSchema.index({
    channelId: 1,
    createdAt: -1
})

export const Message =
    mongoose.model<IMessage, MessageModel>("Message", messageSchema)