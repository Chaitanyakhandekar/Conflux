import {
    ChannelType,
    ServerTemplate
} from "./template.types";

export const developerTemplate: ServerTemplate = {
    name: "Developer Community",

    categories: [

        {
            name: "📢 INFORMATION",
            channels: [
                { name: "welcome", type: ChannelType.TEXT },
                { name: "announcements", type: ChannelType.ANNOUNCEMENT },
                { name: "rules", type: ChannelType.TEXT }
            ]
        },

        {
            name: "💻 DEVELOPMENT",
            channels: [
                { name: "general", type: ChannelType.TEXT },
                { name: "frontend", type: ChannelType.TEXT },
                { name: "backend", type: ChannelType.TEXT },
                { name: "devops", type: ChannelType.TEXT },
                { name: "mobile", type: ChannelType.TEXT },
                { name: "ai-ml", type: ChannelType.TEXT }
            ]
        },

        {
            name: "🚀 PROJECTS",
            channels: [
                { name: "showcase", type: ChannelType.TEXT },
                { name: "help", type: ChannelType.TEXT },
                { name: "resources", type: ChannelType.TEXT },
                { name: "jobs", type: ChannelType.TEXT }
            ]
        },

        {
            name: "☕ COMMUNITY",
            channels: [
                { name: "memes", type: ChannelType.TEXT },
                { name: "off-topic", type: ChannelType.TEXT }
            ]
        },

        {
            name: "🎙 VOICE CHANNELS",
            channels: [
                { name: "Coding Room", type: ChannelType.VOICE },
                { name: "Pair Programming", type: ChannelType.VOICE },
                { name: "Standup", type: ChannelType.VOICE }
            ]
        }
    ]
};