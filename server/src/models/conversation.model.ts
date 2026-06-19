import mongoose, { Schema } from "mongoose";

const conversationSchema =
    new Schema({

        participants: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],

        isGroup: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true })


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
    mongoose.model(
        "Conversation",
        conversationSchema
    )