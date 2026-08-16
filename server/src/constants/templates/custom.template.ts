import {
    ChannelType,
    ServerTemplate
} from "./template.types";

export const customTemplate: ServerTemplate = {
    name: "Custom",

    categories: [

        {
            name: "TEXT CHANNELS",
            channels: [
                { name: "general", type: ChannelType.TEXT },
            ]
        },


        {
            name: "🎙 VOICE CHANNELS",
            channels: [
                { name: "general", type: ChannelType.VOICE },
            ]
        }
    ]
};