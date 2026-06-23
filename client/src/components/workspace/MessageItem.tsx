import { MessageSquare } from "lucide-react"
import type { Message } from "../../data/messages"
import CodeSnippet from "./CodeSnippet"
import MessageActions from "../modals/MessageActions"

interface MessageItemProps {
  message: Message
  isFirst?: boolean
  sameUser?: boolean
}

function MessageItem({ message, isFirst = true, sameUser = false }: MessageItemProps) {
  const getInitials = (name: string) => name[0].toUpperCase()

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7]",
      "bg-gradient-to-br from-[#FF6B6B] to-[#EE4444]",
      "bg-gradient-to-br from-[#22C55E] to-[#16A34A]",
      "bg-gradient-to-br from-[#F59E0B] to-[#D97706]",
      "bg-gradient-to-br from-[#EC4899] to-[#DB2777]",
      "bg-gradient-to-br from-[#06B6D4] to-[#0891B2]",
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  if (!isFirst && sameUser) {
    return (
      <div className="group relative hover:bg-[rgba(255,255,255,0.015)] px-4 py-[2px] -mx-4 transition-colors duration-200">
        <MessageActions />
        <div className="flex gap-4">
          <div className="w-10 flex-shrink-0 invisible" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#E2E8F0] leading-[1.4]">{message.text}</p>
            {message.codeSnippet && (
              <CodeSnippet
                filename={message.codeSnippet.filename}
                language={message.codeSnippet.language}
                code={message.codeSnippet.code}
              />
            )}
            {renderReactions()}
          </div>
        </div>
      </div>
    )
  }

  function renderReactions() {
    if (!message.reactions?.length) return null
    return (
      <div className="flex items-center gap-1 mt-1.5 flex-wrap">
        {message.reactions.map((r, i) => (
          <button
            key={i}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] text-xs hover:bg-[rgba(139,125,255,0.08)] hover:border-[rgba(139,125,255,0.15)] transition-colors"
          >
            <span>{r.emoji}</span>
            <span className="text-[#94A3B8]">{r.count}</span>
          </button>
        ))}
        {message.replyCount && (
          <button className="flex items-center gap-1 text-[12px] text-[#8B7DFF] hover:text-[#9B8CFF] ml-1 transition-colors">
            <MessageSquare size={12} />
            <span>{message.replyCount} replies</span>
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="group relative hover:bg-[rgba(255,255,255,0.015)] px-4 py-[2px] -mx-4 transition-colors duration-200">
      <MessageActions />
      <div className="flex gap-4">
        <div className={`w-10 h-10 rounded-full ${getAvatarColor(message.username)} flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold mt-[2px] shadow-[0_0_12px_rgba(139,125,255,0.08)]`}>
          {getInitials(message.username)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-sm font-medium text-white hover:text-[#8B7DFF] cursor-pointer transition-colors">
              {message.displayName}
            </span>
            <span className="text-[11px] text-[#94A3B8]">{message.timestamp}</span>
          </div>
          <p className="text-sm text-[#E2E8F0] leading-[1.4] whitespace-pre-wrap">{message.text}</p>
          {message.codeSnippet && (
            <CodeSnippet
              filename={message.codeSnippet.filename}
              language={message.codeSnippet.language}
              code={message.codeSnippet.code}
            />
          )}
          {renderReactions()}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
