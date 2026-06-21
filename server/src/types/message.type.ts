import mongoose, { Document, Model } from "mongoose";

export interface IMessageAttachment {
    secure_url: string;
    public_id: string;
}

export interface IMessageReaction {
    userId: mongoose.Types.ObjectId;
    emoji: string;
}

export interface IMessage extends Document {
    message?: string;
    sender: mongoose.Types.ObjectId;
    channelId?: mongoose.Types.ObjectId;
    conversationId?: mongoose.Types.ObjectId;
    attachments: IMessageAttachment[];
    isSeen: boolean;
    seenBy: mongoose.Types.ObjectId[];
    isReply: boolean;
    replyTo?: mongoose.Types.ObjectId;
    reactions: IMessageReaction[];
    isSystemMessage: boolean;
    systemMessageType?: string;
    seenAt?: Date;
}

export interface IMessageMethods {
    markSeen(userId: string): Promise<void>;
    addReaction(userId: string, emoji: string): Promise<void>;
    editMessage(content: string): Promise<void>;
}

export interface MessageModel extends Model<IMessage, {}, IMessageMethods> { }
