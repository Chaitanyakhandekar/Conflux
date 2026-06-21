import mongoose, { Document, Model } from "mongoose";

export type ChannelType = "TEXT" | "VOICE";

export interface IChannel extends Document {
    name: string;
    serverId: mongoose.Types.ObjectId;
    categoryId?: mongoose.Types.ObjectId;
    position: number;
    type: ChannelType;
    createdBy?: string;
}

export interface IChannelMethods {
    isVoiceChannel(): boolean;
}

export interface ChannelModel extends Model<IChannel, {}, IChannelMethods> { }
