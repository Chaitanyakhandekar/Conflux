import { messages } from "../../data/messages"
import MessageItem from "./MessageItem"

function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}

      <div className="flex items-center gap-3 py-2">
        <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
        <span className="text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase flex-shrink-0">
          NEW MESSAGES
        </span>
        <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
      </div>
    </div>
  )
}

export default MessageList
