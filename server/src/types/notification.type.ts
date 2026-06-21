import mongoose, { Document, Model } from "mongoose";

export interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    actorId?: mongoose.Types.ObjectId;
    entityId?: mongoose.Types.ObjectId;
    entityType?: string;
    requestId?: mongoose.Types.ObjectId;
    title?: string;
    content?: string;
    isRead: boolean;
    readAt?: Date;
    metaData?: object;
}

export interface INotificationMethods {
    markRead(): Promise<void>;
}

export interface NotificationModel extends Model<INotification, {}, INotificationMethods> { }
