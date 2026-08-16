
export type ChannelType = "TEXT" | "VOICE" | "ANNOUNCEMENT";

export interface IChannel extends Document {
    name: string;
    serverId: string;
    categoryId?: string;
    position: number;
    type: ChannelType;
    createdBy?: string;
}

export interface IChannelMethods {
    isVoiceChannel(): boolean;
}

export type ChannelDataType = {
    name: string
    serverId: string
    categoryId: string
    position?: number;
    type: ChannelType;
    createdBy?: string;
}

