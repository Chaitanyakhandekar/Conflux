import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({

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


messageSchema.methods.markSeen =
    async function (userId: string) {

        this.isSeen = true
        this.seenAt = new Date()

        this.seenBy.push(userId)

        await this.save({
            validateBeforeSave: false
        })
    }


messageSchema.methods.addReaction =
    async function (
        userId: string,
        emoji: string
    ) {

        this.reactions.push({
            userId,
            emoji
        })

        await this.save({
            validateBeforeSave: false
        })

    }


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
    mongoose.model("Message", messageSchema)