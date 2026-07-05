export enum ChannelType {
    TEXT = "TEXT",
    VOICE = "VOICE",
    ANNOUNCEMENT = "ANNOUNCEMENT"
}

export interface ChannelTemplate {
    name: string;
    type: ChannelType;
}

export interface CategoryTemplate {
    name: string;
    channels: ChannelTemplate[];
}

export interface ServerTemplate {
    name: string;
    categories: CategoryTemplate[];
}