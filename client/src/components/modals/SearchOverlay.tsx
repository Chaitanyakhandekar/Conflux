import { useState } from "react"
import Modal from "../ui/Modal"
import { Search, MessageSquare, FileText, Users, Hash, Clock } from "lucide-react"

const recentSearches = ["backend-help", "redis pubsub", "system design"]
const filters = [
  { icon: MessageSquare, label: "Messages" },
  { icon: FileText, label: "Files" },
  { icon: Users, label: "Members" },
  { icon: Hash, label: "Channels" },
]

interface Props {
  open: boolean
  onClose: () => void
}

function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("Messages")

  return (
    <Modal open={open} onClose={onClose} width="640px" className="p-0">
      <div className="p-4">
        <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] rounded-[8px] px-3 border border-[rgba(255,255,255,0.06)]">
          <Search size={18} className="text-[#94A3B8] flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Conflux Community"
            className="flex-1 h-[44px] bg-transparent text-sm text-white placeholder-[#64748B] outline-none"
            autoFocus
          />
        </div>

        <div className="flex items-center gap-2 mt-3">
          {filters.map((f) => {
            const Icon = f.icon
            const active = activeFilter === f.label
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors ${
                  active
                    ? "bg-[#8B7DFF] text-white"
                    : "bg-[rgba(255,255,255,0.04)] text-[#94A3B8] hover:bg-[rgba(255,255,255,0.08)]"
                }`}
              >
                <Icon size={14} />
                {f.label}
              </button>
            )
          })}
        </div>

        {!query && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} className="text-[#94A3B8]" />
              <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">Recent</span>
            </div>
            <div className="space-y-1">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-[6px] text-sm text-[#94A3B8] hover:bg-[rgba(255,255,255,0.03)] hover:text-white transition-colors text-left"
                >
                  <Clock size={14} className="opacity-50" />
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default SearchOverlay
