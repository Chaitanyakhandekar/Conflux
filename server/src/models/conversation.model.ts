import mongoose, { Schema } from "mongoose";
import {
    IConversation,
    IConversationMethods,
    ConversationModel
} from "../types/conversation.type.ts";

const conversationSchema =
    new Schema<IConversation, ConversationModel, IConversationMethods>({

        participants: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],

        isGroup: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true })


/**
 * @description Schema method to check if a user is a participant of this conversation.
 * @param userId
 * @returns boolean
 */
conversationSchema.methods.hasParticipant =
    function (userId: string): boolean {

        return this.participants.some(
            (id: mongoose.Types.ObjectId) =>
                id.toString() === userId
        )
    }


conversationSchema.index({
    participants: 1
})


export const Conversation =
    mongoose.model<IConversation, ConversationModel>(
        "Conversation",
        conversationSchema
    )