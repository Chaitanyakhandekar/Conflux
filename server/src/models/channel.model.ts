import mongoose, { Schema } from "mongoose";

const channelSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    serverId: {
        type: Schema.Types.ObjectId,
        ref: "Server",
        required: true
    },

    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },

    position: {
        type: Number,
        default: 0
    },

    type: {
        type: String,
        enum: ["TEXT", "VOICE"],
        default: "TEXT"
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })


channelSchema.methods.isVoiceChannel =
    function (): boolean {

        return this.type === "VOICE"

    }


export const Channel =
    mongoose.model("Channel", channelSchema)