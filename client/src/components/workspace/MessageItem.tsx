import type { Message } from "../../data/messages"
import CodeSnippet from "./CodeSnippet"

interface MessageItemProps {
  message: Message
}

function MessageItem({ message }: MessageItemProps) {
  const getInitials = (name: string) => {
    return name
      .split(/[_\s]/)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "from-green-400 to-emerald-600",
      "from-blue-400 to-indigo-600",
      "from-orange-400 to-red-500",
      "from-pink-400 to-rose-600",
      "from-cyan-400 to-blue-600",
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div className="group">
      <div className="flex gap-3">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAvatarColor(message.username)} flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold`}
        >
          {getInitials(message.username)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-sm font-semibold text-[#22C55E]">{message.username}</span>
            <span className="text-[12px] text-[#94A3B8]">{message.timestamp}</span>
          </div>

          <p className="text-sm text-[#E2E8F0] leading-[1.5] whitespace-pre-wrap">{message.text}</p>

          {message.codeSnippet && (
            <CodeSnippet
              filename={message.codeSnippet.filename}
              language={message.codeSnippet.language}
              code={message.codeSnippet.code}
            />
          )}

          {message.reactions && (
            <div className="flex items-center gap-1.5 mt-2">
              {message.reactions.map((r, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] text-xs"
                >
                  <span>{r.emoji}</span>
                  <span className="text-[#94A3B8]">{r.count}</span>
                </span>
              ))}
            </div>
          )}

          {message.pipelineCard && (
            <div className="mt-3 p-4 rounded-[12px] bg-[#0A1020] border border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">{message.pipelineCard.title}</span>
                <span className="text-[12px] text-[#22C55E] flex items-center gap-1">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#22C55E] inline-block" />
                  {message.pipelineCard.status}
                </span>
              </div>
              <div className="w-full h-[6px] rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#7C6BFF] to-[#22C55E] transition-all"
                  style={{ width: `${message.pipelineCard.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
