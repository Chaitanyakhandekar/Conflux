import { Plus, Compass } from "lucide-react"
import { servers } from "../../data/servers"

function AppSidebar() {
  return (
    <aside className="w-[72px] h-full bg-[#08101F] flex flex-col items-center py-3 flex-shrink-0 gap-2">
      {servers.slice(0, 4).map((server) => (
        <button
          key={server.id}
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${server.gradient} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 hover:rounded-[14px] transition-all duration-200 relative ${
            server.id === "1" ? "rounded-[14px]" : ""
          }`}
          title={server.name}
        >
          {server.initials}
          {server.id === "1" && (
            <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-[4px] h-8 rounded-r-full bg-white shadow-[0_0_12px_rgba(139,125,255,0.4)]" />
          )}
        </button>
      ))}

      <div className="w-8 h-[2px] rounded-full bg-[rgba(255,255,255,0.06)] my-1" />

      <button
        className="w-12 h-12 rounded-2xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E] hover:text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-200 flex-shrink-0"
        title="Add Server"
      >
        <Plus size={22} />
      </button>

      <button
        className="w-12 h-12 rounded-2xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#94A3B8] hover:bg-[#8B7DFF] hover:text-white hover:shadow-[0_0_20px_rgba(139,125,255,0.25)] transition-all duration-200 flex-shrink-0"
        title="Explore Public Servers"
      >
        <Compass size={20} />
      </button>

      <div className="flex-1" />

      <div className="flex flex-col items-center gap-2 pb-1">
        <div className="relative group cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] shadow-[0_0_16px_rgba(139,125,255,0.2)] flex items-center justify-center text-white text-xs font-semibold">
            Y
          </div>
          <span className="absolute -bottom-[2px] -right-[2px] w-[12px] h-[12px] bg-[#22C55E] rounded-full border-[3px] border-[#08101F] shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-[4px] h-0 rounded-r-full bg-white group-hover:h-5 transition-all duration-200 shadow-[0_0_12px_rgba(139,125,255,0.4)]" />
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar
