import mongoose, { Document, Model } from "mongoose";

export interface IConversation extends Document {
    participants: mongoose.Types.ObjectId[];
    isGroup: boolean;
}

export interface IConversationMethods {
    hasParticipant(userId: string): boolean;
}

export interface ConversationModel extends Model<IConversation, {}, IConversationMethods> { }
