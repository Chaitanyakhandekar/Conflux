import { MessageSquare, UserPlus } from "lucide-react"

interface DMTopTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onAddContact: () => void
}

const tabs = [
  { id: "all", label: "All" },
  { id: "requests", label: "Requests" },
  { id: "suggestions", label: "Suggestions", badge: 17 },
]

function DMTopTabs({ activeTab, onTabChange, onAddContact }: DMTopTabsProps) {
  return (
    <div className="h-[56px] flex items-center justify-between px-6 border-b border-[rgba(255,255,255,0.06)] flex-shrink-0">
      <div className="flex items-center gap-3">
        <MessageSquare size={18} className="text-[#8B7DFF]" />
        <span className="text-white text-[16px] font-semibold">Conversations</span>
      </div>

      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-3 h-[32px] rounded-[6px] text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[rgba(139,125,255,0.14)] text-white"
                : "text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
            }`}
          >
            {tab.label}
            {tab.badge && (
              <span className="ml-1.5 px-1.5 py-[1px] rounded-full bg-[#ED4245] text-[11px] font-semibold text-white">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={onAddContact}
        className="flex items-center gap-1.5 px-4 h-[34px] rounded-[8px] bg-[#8B7DFF] text-white text-sm font-medium hover:bg-[#7C6BFF] transition-all duration-200"
      >
        <UserPlus size={16} />
        <span>Add Contact</span>
      </button>
    </div>
  )
}

export default DMTopTabs
