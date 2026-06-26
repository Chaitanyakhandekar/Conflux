import { MessageCircle, MoreHorizontal } from "lucide-react"

interface ConversationItemProps {
  name: string
  status: "online" | "offline" | "away"
  statusText: string
  initials: string
  lastMessage: string
  time: string
  unread: number
}

const statusColors = {
  online: "bg-[#22C55E]",
  offline: "bg-[#6B7280]",
  away: "bg-[#F59E0B]",
}

const statusTextColors = {
  online: "text-[#22C55E]",
  offline: "text-[#6B7280]",
  away: "text-[#F59E0B]",
}

function ConversationItem({ name, status, statusText, initials, lastMessage, time, unread }: ConversationItemProps) {
  return (
    <div className="flex items-center gap-3 px-6 h-[72px] border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200 group cursor-pointer">
      <div className="relative flex-shrink-0">
        <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] flex items-center justify-center text-white text-sm font-semibold">
          {initials}
        </div>
        <span className={`absolute -bottom-[1px] -right-[1px] w-[12px] h-[12px] rounded-full border-[2px] border-[#091223] ${statusColors[status]} shadow-[0_0_6px_rgba(34,197,94,0.3)]`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-medium text-white truncate">{name}</span>
          <span className="text-[12px] text-[#6B7280] flex-shrink-0 ml-2">{time}</span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-[13px] ${statusTextColors[status]}`}>{statusText}</span>
          {lastMessage && (
            <>
              <span className="text-[#6B7280] text-[13px]">·</span>
              <span className="text-[13px] text-[#94A3B8] truncate">{lastMessage}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-shrink-0">
        {unread > 0 && (
          <span className="px-[6px] h-[18px] rounded-full bg-[#8B7DFF] text-[10px] font-semibold text-white flex items-center justify-center">
            {unread}
          </span>
        )}
        <button className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(139,125,255,0.12)] opacity-0 group-hover:opacity-100 transition-all duration-200">
          <MessageCircle size={16} />
        </button>
        <button className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(139,125,255,0.12)] opacity-0 group-hover:opacity-100 transition-all duration-200">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  )
}

export default ConversationItem
