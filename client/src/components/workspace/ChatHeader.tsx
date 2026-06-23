import { Search, Bell, Pin, Users } from "lucide-react"

function ChatHeader() {
  return (
    <header className="h-[70px] flex items-center justify-between px-6 border-b border-[rgba(255,255,255,0.06)] bg-[#0C1322] flex-shrink-0">
      <div className="flex flex-col">
        <h2 className="text-white text-[17px] font-bold leading-tight"># general-arch</h2>
        <p className="text-[13px] text-[#94A3B8] leading-tight mt-[2px]">
          Discussions about system architecture and scalability.
        </p>
      </div>

      <div className="relative w-[240px]">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-[38px] bg-[#0A1020] rounded-[10px] pl-9 pr-4 text-sm text-white placeholder-[#94A3B8] outline-none border border-[rgba(255,255,255,0.06)] focus:border-[#7C6BFF]/50 transition-colors"
        />
      </div>

      <div className="flex items-center gap-[18px] text-[#94A3B8]">
        <button className="hover:text-white transition-colors">
          <Bell size={18} />
        </button>
        <button className="hover:text-white transition-colors">
          <Pin size={18} />
        </button>
        <button className="hover:text-white transition-colors">
          <Users size={18} />
        </button>
      </div>
    </header>
  )
}

export default ChatHeader
