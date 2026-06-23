import { Compass, GitBranch, Activity, MessageSquare, Plus, Settings } from "lucide-react"

const navItems = [
  { icon: Compass, active: true },
  { icon: GitBranch, active: false },
  { icon: Activity, active: false },
  { icon: MessageSquare, active: false },
]

function AppSidebar() {
  return (
    <aside className="w-[70px] h-full bg-[#0A0F1A] flex flex-col items-center py-3 flex-shrink-0 border-r border-[rgba(255,255,255,0.06)]">
      <div className="w-10 h-10 rounded-lg bg-[#7C6BFF] flex items-center justify-center">
        <div className="grid grid-cols-2 gap-[3px]">
          <div className="w-[6px] h-[6px] rounded-sm bg-white" />
          <div className="w-[6px] h-[6px] rounded-sm bg-white" />
          <div className="w-[6px] h-[6px] rounded-sm bg-white" />
          <div className="w-[6px] h-[6px] rounded-sm bg-white" />
        </div>
      </div>

      <div className="w-[1px] h-5 bg-[rgba(255,255,255,0.06)] my-4" />

      <nav className="flex flex-col items-center gap-5 flex-1">
        {navItems.map((item, i) => (
          <button
            key={i}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              item.active
                ? "bg-[#7C6BFF] text-white"
                : "bg-[rgba(255,255,255,0.04)] text-[#94A3B8] hover:bg-[rgba(255,255,255,0.08)]"
            }`}
          >
            <item.icon size={18} />
          </button>
        ))}
      </nav>

      <button className="w-10 h-10 rounded-xl bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-[#94A3B8] hover:bg-[rgba(255,255,255,0.08)] transition-colors mb-4">
        <Plus size={18} />
      </button>

      <div className="flex flex-col items-center gap-2 pb-2">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
            JD
          </div>
          <span className="absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] bg-[#22C55E] rounded-full border-2 border-[#0A0F1A]" />
        </div>
        <button className="text-[#94A3B8] hover:text-white transition-colors">
          <Settings size={16} />
        </button>
      </div>
    </aside>
  )
}

export default AppSidebar
