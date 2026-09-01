export const socketEvents = {
    connection: {
        CONNECT: "connect",
        DISCONNECT: "disconnect",
        CONNECT_ERROR: "connect_error",
    },

    server: {
        INVITE: "server:invitation",
        JOINED: "server:joined",
        UPDATED: "server:updated",
        DELETED: "server:deleted",
    },

    channel: {
        CREATED: "channel:created",
        UPDATED: "channel:updated",
        DELETED: "channel:deleted",
    },

    message: {
        NEW: "message:new",
        UPDATED: "message:updated",
        DELETED: "message:deleted",
        TYPING: "message:typing",
    },

    member: {
        JOINED: "member:joined",
        LEFT: "member:left",
        UPDATED: "member:updated",
    },

    notification: {
        NEW: "notification:new",
    },
} as const;