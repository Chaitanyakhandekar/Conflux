import mongoose, { Schema } from "mongoose";

const notificationSchema =
    new Schema({

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            required: true
        },

        actorId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },

        entityId: {
            type: Schema.Types.ObjectId
        },

        entityType: {
            type: String
        },

        requestId: {
            type: Schema.Types.ObjectId,
            ref: "Request"
        },

        title: String,

        content: String,

        isRead: {
            type: Boolean,
            default: false
        },

        readAt: {
            type: Date
        },

        metaData: {
            type: Object
        }

    }, { timestamps: true })


notificationSchema.methods.markRead =
    async function () {

        this.isRead = true
        this.readAt = new Date()

        await this.save({
            validateBeforeSave: false
        })
    }


export const Notification =
    mongoose.model(
        "Notification",
        notificationSchema
    )