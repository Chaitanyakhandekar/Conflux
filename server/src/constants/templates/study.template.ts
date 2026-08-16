import {
    ChannelType,
    ServerTemplate
} from "./template.types";

export const studyTemplate: ServerTemplate = {
    name: "Study Group",

    categories: [

        {
            name: "📢 INFORMATION",
            channels: [
                { name: "welcome", type: ChannelType.TEXT },
                { name: "announcements", type: ChannelType.ANNOUNCEMENT },
                { name: "resources", type: ChannelType.TEXT }
            ]
        },

        {
            name: "📚 STUDY",
            channels: [
                { name: "general", type: ChannelType.TEXT },
                { name: "questions", type: ChannelType.TEXT },
                { name: "notes", type: ChannelType.TEXT },
                { name: "assignments", type: ChannelType.TEXT }
            ]
        },

        {
            name: "🧠 DISCUSSIONS",
            channels: [
                { name: "coding", type: ChannelType.TEXT },
                { name: "interview-prep", type: ChannelType.TEXT },
                { name: "off-topic", type: ChannelType.TEXT }
            ]
        },

        {
            name: "🎙 VOICE CHANNELS",
            channels: [
                { name: "Study Room", type: ChannelType.VOICE },
                { name: "Discussion", type: ChannelType.VOICE },
                { name: "Doubt Solving", type: ChannelType.VOICE }
            ]
        }
    ]
};