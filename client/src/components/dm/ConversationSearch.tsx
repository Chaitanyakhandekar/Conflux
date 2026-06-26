import { Search } from "lucide-react"

interface ConversationSearchProps {
  value: string
  onChange: (value: string) => void
}

function ConversationSearch({ value, onChange }: ConversationSearchProps) {
  return (
    <div className="px-6 pt-4 flex-shrink-0">
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search conversations..."
          className="w-full h-[42px] pl-11 pr-4 rounded-[10px] bg-[#070B17] text-[14px] text-white placeholder-[#6B7280] border border-[rgba(255,255,255,0.06)] outline-none focus:border-[rgba(139,125,255,0.3)] transition-colors"
        />
      </div>
    </div>
  )
}

export default ConversationSearch
