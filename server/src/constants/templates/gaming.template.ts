import {
    ChannelType,
    ServerTemplate
} from "./template.types";

export const gamingTemplate: ServerTemplate = {
    name: "Gaming Community",

    categories: [

        {
            name: "📢 INFORMATION",
            channels: [
                {
                    name: "welcome",
                    type: ChannelType.TEXT
                },
                {
                    name: "announcements",
                    type: ChannelType.ANNOUNCEMENT
                },
                {
                    name: "rules",
                    type: ChannelType.TEXT
                }
            ]
        },

        {
            name: "💬 TEXT CHANNELS",
            channels: [
                {
                    name: "general",
                    type: ChannelType.TEXT
                },
                {
                    name: "game-chat",
                    type: ChannelType.TEXT
                },
                {
                    name: "screenshots",
                    type: ChannelType.TEXT
                },
                {
                    name: "clips",
                    type: ChannelType.TEXT
                },
                {
                    name: "memes",
                    type: ChannelType.TEXT
                }
            ]
        },

        {
            name: "🎙 VOICE CHANNELS",
            channels: [
                {
                    name: "General",
                    type: ChannelType.VOICE
                },
                {
                    name: "Squad 1",
                    type: ChannelType.VOICE
                },
                {
                    name: "Squad 2",
                    type: ChannelType.VOICE
                },
                {
                    name: "AFK",
                    type: ChannelType.VOICE
                }
            ]
        }
    ]
};