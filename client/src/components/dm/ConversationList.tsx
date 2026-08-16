import ConversationItem from "./ConversationItem"

const conversations = [
  { id: "1", name: "Sarah", status: "online" as const, statusText: "Online", initials: "S", lastMessage: "Hey! How's the project going?", time: "2m", unread: 2 },
  { id: "2", name: "Alex", status: "offline" as const, statusText: "Offline", initials: "A", lastMessage: "Sounds good, let me know when you're ready", time: "1h", unread: 0 },
  { id: "3", name: "Emma", status: "away" as const, statusText: "Away", initials: "E", lastMessage: "I'll review the PR tonight", time: "3h", unread: 1 },
  { id: "4", name: "Mike", status: "online" as const, statusText: "Online", initials: "M", lastMessage: "Can you share the design files?", time: "5h", unread: 0 },
]

function ConversationList() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-4">
        <span className="text-[13px] font-semibold text-white">All Conversations — {conversations.length}</span>
      </div>
      {conversations.map((conv) => (
        <ConversationItem key={conv.id} {...conv} />
      ))}
    </div>
  )
}

export default ConversationList
