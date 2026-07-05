import {
    ChannelType,
    ServerTemplate
} from "./template.types";

export const startupTemplate: ServerTemplate = {
    name: "Startup Team",

    categories: [

        {
            name: "📢 INFORMATION",
            channels: [
                { name: "announcements", type: ChannelType.ANNOUNCEMENT }
            ]
        },

        {
            name: "💼 WORK",
            channels: [
                { name: "general", type: ChannelType.TEXT },
                { name: "ideas", type: ChannelType.TEXT },
                { name: "roadmap", type: ChannelType.TEXT },
                { name: "design", type: ChannelType.TEXT },
                { name: "development", type: ChannelType.TEXT }
            ]
        },

        {
            name: "🤝 SOCIAL",
            channels: [
                { name: "random", type: ChannelType.TEXT }
            ]
        },

        {
            name: "🎙 MEETINGS",
            channels: [
                { name: "General Meeting", type: ChannelType.VOICE },
                { name: "Daily Standup", type: ChannelType.VOICE }
            ]
        }
    ]
};