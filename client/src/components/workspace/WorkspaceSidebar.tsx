import { ChevronDown, Phone, Headphones } from "lucide-react"
import ChannelList from "./ChannelList"
import { useUI } from "../../contexts/UIContext"

function WorkspaceSidebar() {
  const { setShowServerDropdown, setShowProfileCard } = useUI()

  return (
    <aside className="w-[240px] h-full bg-[#0C1322] flex flex-col flex-shrink-0">
      <div
        className="h-[48px] flex items-center justify-between px-4 shadow-[0_1px_0_rgba(255,255,255,0.04)] flex-shrink-0 cursor-pointer hover:bg-[rgba(255,255,255,0.03)] transition-colors"
        onClick={() => setShowServerDropdown(true)}
      >
        <h1 className="text-white text-[15px] font-semibold">Conflux Community</h1>
        <ChevronDown size={16} className="text-[#94A3B8]" />
      </div>

      <div className="flex-1 overflow-hidden pt-3">
        <ChannelList />
      </div>

      <div className="h-[52px] flex items-center gap-2 px-3 bg-[#0C1322] border-t border-[rgba(255,255,255,0.04)] flex-shrink-0">
        <div className="relative group cursor-pointer" onClick={() => setShowProfileCard(true)}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] shadow-[0_0_12px_rgba(139,125,255,0.15)] flex items-center justify-center text-white text-[11px] font-semibold">
            Y
          </div>
          <span className="absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] bg-[#22C55E] rounded-full border-[2px] border-[#0C1322] shadow-[0_0_6px_rgba(34,197,94,0.3)]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">You</p>
          <p className="text-[12px] text-[#94A3B8]">Online</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(139,125,255,0.12)] transition-colors">
            <Headphones size={16} />
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(139,125,255,0.12)] transition-colors">
            <Phone size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default WorkspaceSidebar
