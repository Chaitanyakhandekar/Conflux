import mongoose, { Document, Model } from "mongoose";

export type ChannelType = "TEXT" | "VOICE";

export interface IChannel extends Document {
    name: string;
    serverId: mongoose.Types.ObjectId;
    categoryId?: mongoose.Types.ObjectId;
    position: number;
    type: ChannelType;
    createdBy?: mongoose.Types.ObjectId | string;
}

export interface IChannelMethods {
    isVoiceChannel(): boolean;
}

export type ChannelDataType = {
    name: string
    serverId: mongoose.Types.ObjectId | string
    categoryId: mongoose.Types.ObjectId | string
    position?: number;
    type: ChannelType;
    createdBy?: string;
}

export interface ChannelModel extends Model<IChannel, {}, IChannelMethods> { }
