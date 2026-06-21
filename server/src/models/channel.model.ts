import mongoose, { Schema } from "mongoose";
import {
    IChannel,
    IChannelMethods,
    ChannelModel
} from "../types/channel.type.ts";

const channelSchema = new Schema<IChannel, ChannelModel, IChannelMethods>({

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


/**
 * @description Schema method to check if this channel is a voice channel.
 * @returns boolean
 */
channelSchema.methods.isVoiceChannel =
    function (): boolean {

        return this.type === "VOICE"

    }


export const Channel =
    mongoose.model<IChannel, ChannelModel>("Channel", channelSchema)