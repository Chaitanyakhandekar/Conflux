import mongoose, { Schema } from "mongoose";
import {
    INotification,
    INotificationMethods,
    NotificationModel
} from "../types/notification.type.ts";

const notificationSchema =
    new Schema<INotification, NotificationModel, INotificationMethods>({

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


/**
 * @description Schema method to mark the notification as read.
 */
notificationSchema.methods.markRead =
    async function () {

        this.isRead = true
        this.readAt = new Date()

        await this.save({
            validateBeforeSave: false
        })
    }


export const Notification =
    mongoose.model<INotification, NotificationModel>(
        "Notification",
        notificationSchema
    )