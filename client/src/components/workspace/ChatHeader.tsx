import { Search, Phone, Videotape, Pin, Users, Menu, Hash } from "lucide-react"
import { useUI } from "../../contexts/UIContext"

interface ChatHeaderProps {
  onMenuClick?: () => void
}

function ChatHeader({ onMenuClick }: ChatHeaderProps) {
  const { setShowSearch, setShowNotifications } = useUI()

  return (
    <header className="h-[48px] flex items-center justify-between px-4 shadow-[0_1px_0_rgba(255,255,255,0.04)] bg-[#091223] flex-shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="lg:hidden text-[#94A3B8] hover:text-white transition-colors flex-shrink-0"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <Hash size={22} className="text-[#94A3B8] flex-shrink-0" />
          <h2 className="text-white text-[15px] font-semibold truncate">backend-help</h2>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4 text-[#94A3B8]">
        <button className="hover:text-[#8B7DFF] transition-colors">
          <Phone size={20} />
        </button>
        <button className="hover:text-[#8B7DFF] transition-colors">
          <Videotape size={20} />
        </button>
        <button className="hover:text-[#8B7DFF] transition-colors">
          <Pin size={18} />
        </button>
        <button onClick={() => setShowNotifications(true)} className="hover:text-[#8B7DFF] transition-colors relative">
          <Users size={20} />
        </button>
        <div className="w-[1px] h-6 bg-[rgba(255,255,255,0.06)]" />
        <div className="relative" onClick={() => setShowSearch(true)}>
          <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search"
            readOnly
            className="w-[144px] h-[28px] bg-[rgba(255,255,255,0.03)] rounded-[6px] pl-7 pr-2 text-sm text-white placeholder-[#64748B] outline-none border border-[rgba(255,255,255,0.06)] cursor-pointer"
          />
        </div>
      </div>

      <div className="flex md:hidden items-center gap-2 text-[#94A3B8]">
        <button onClick={() => setShowSearch(true)} className="hover:text-white transition-colors p-1">
          <Search size={18} />
        </button>
        <button onClick={() => setShowNotifications(true)} className="hover:text-white transition-colors p-1">
          <Users size={18} />
        </button>
      </div>
    </header>
  )
}

export default ChatHeader
