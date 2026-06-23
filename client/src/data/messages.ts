export interface Message {
  id: string
  username: string
  displayName: string
  timestamp: string
  text: string
  avatar: string
  role: string
  codeSnippet?: {
    filename: string
    language: string
    code: string
  }
  reactions?: { emoji: string; count: number }[]
  replyCount?: number
  attachment?: boolean
}

export const messages: Message[] = [
  {
    id: "1",
    username: "Sarah",
    displayName: "Sarah",
    timestamp: "Today at 10:42 AM",
    text: "Anyone solved Redis pub/sub issue? My subscriber keeps dropping after the connection timeout. Using ioredis with cluster mode.",
    avatar: "",
    role: "Admin",
    codeSnippet: {
      filename: "pubsub.ts",
      language: "typescript",
      code: `const subscriber = new Redis(clusterNodes);\nawait subscriber.subscribe("events");\n\nsubscriber.on("message", (channel, message) => {\n  const parsed = JSON.parse(message);\n  // Handles timeout in cluster mode\n  if (parsed.type === "heartbeat") {\n    await subscriber.ping();\n  }\n});`,
    },
    reactions: [
      { emoji: "🔥", count: 3 },
      { emoji: "💡", count: 5 },
    ],
    replyCount: 4,
  },
  {
    id: "2",
    username: "Alex",
    displayName: "Alex",
    timestamp: "Today at 10:48 AM",
    text: "Check subscriber cleanup logic. You might have dangling listeners. Try wrapping the handler in a try/catch and reconnect on error.",
    avatar: "",
    role: "Moderator",
    reactions: [
      { emoji: "✅", count: 2 },
    ],
    replyCount: 1,
  },
]
