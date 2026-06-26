import { useState } from "react"
import { Search, MessageCircle, Archive, Inbox } from "lucide-react"

const recentChats = [
  { id: "1", name: "Sarah", status: "online" as const, initials: "S", unread: 2 },
  { id: "2", name: "Alex", status: "offline" as const, initials: "A", unread: 0 },
  { id: "3", name: "Emma", status: "away" as const, initials: "E", unread: 1 },
  { id: "4", name: "Mike", status: "online" as const, initials: "M", unread: 0 },
]

const statusDotColors = {
  online: "bg-[#22C55E]",
  offline: "bg-[#6B7280]",
  away: "bg-[#F59E0B]",
}

function DMSidebar() {
  const [selected, setSelected] = useState("1")
  const [search, setSearch] = useState("")

  return (
    <aside className="w-[240px] h-full bg-[#0C1322] flex flex-col flex-shrink-0">
      <div className="h-[48px] flex items-center px-4 shadow-[0_1px_0_rgba(255,255,255,0.04)] flex-shrink-0">
        <h1 className="text-white text-[15px] font-semibold">Conversations</h1>
      </div>

      <div className="px-3 pt-3 flex-shrink-0">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full h-[34px] pl-8 pr-3 rounded-[6px] bg-[#070B17] text-[13px] text-white placeholder-[#6B7280] border-none outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pt-4">
        <div className="px-2 mb-2">
          <span className="text-[12px] font-semibold tracking-wide text-[#6B7280] uppercase">Recent Chats</span>
        </div>
        <div className="space-y-[2px]">
          {recentChats.map((chat) => {
            const isActive = selected === chat.id
            return (
              <button
                key={chat.id}
                onClick={() => setSelected(chat.id)}
                className={`w-full flex items-center gap-2.5 px-2 h-[44px] rounded-[6px] transition-all duration-200 ${
                  isActive
                    ? "bg-[rgba(139,125,255,0.14)] text-white shadow-[0_0_12px_rgba(139,125,255,0.06)]"
                    : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.03)] hover:text-white"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] flex items-center justify-center text-white text-[11px] font-semibold">
                    {chat.initials}
                  </div>
                  <span className={`absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] rounded-full border-[2px] border-[#0C1322] ${statusDotColors[chat.status]}`} />
                </div>
                <span className="truncate flex-1 text-sm text-left">{chat.name}</span>
                {chat.unread > 0 && (
                  <span className="w-[18px] h-[18px] rounded-full bg-[#8B7DFF] text-[10px] font-semibold text-white flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.04)] flex-shrink-0">
        <span className="text-[12px] font-semibold tracking-wide text-[#6B7280] uppercase">Quick Access</span>
        <div className="mt-2 space-y-[2px]">
          {[
            { icon: MessageCircle, label: "All Conversations" },
            { icon: Archive, label: "Archived" },
            { icon: Inbox, label: "Requests" },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-2.5 px-2 h-[34px] rounded-[6px] text-sm text-[#94A3B8] hover:bg-[rgba(255,255,255,0.03)] hover:text-white transition-all duration-200"
            >
              <item.icon size={16} className="flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default DMSidebar
