import { Plus, Compass, MessageSquare } from "lucide-react"
// import { servers } from "../../data/servers"
import { useUI } from "../../contexts/UIContext"
import { useServer } from "../../hooks/useServer"
import type { IdealServerType } from "../../types/server.type"
import { useCategory } from "../../hooks/useCategory"
import { useAuthStore } from "../../store/auth-store"

function AppSidebar() {
  const { setShowCreateServer, setShowProfileCard, setShowContextServer, setContextMenuPos, showDMHub, setShowDMHub } = useUI()
  const { user } = useAuthStore()
  const { getMyCreatedServers, servers, selectedServer, setSelectedServer } = useServer()
  const { loading,
    setLoading,
    categoryError,
    setCategoryError,
    getServerCategories } = useCategory()

  const handleContext = (e: React.MouseEvent, serverId: string) => {
    e.preventDefault()
    setContextMenuPos({ x: e.clientX, y: e.clientY })
    setShowContextServer(serverId)
  }

  const getCategories = async (server: IdealServerType) => {
    setShowDMHub(false)
    setSelectedServer(server)
    await getServerCategories(server._id)
  }

  return (
    <aside className="w-[72px] h-full bg-[#08101F] flex flex-col items-center py-3 flex-shrink-0 gap-2">
      <button
        onClick={() => setShowDMHub(true)}
        className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 relative ${showDMHub
          ? "bg-[#8B7DFF] text-white shadow-[0_0_20px_rgba(139,125,255,0.18)]"
          : "bg-[rgba(255,255,255,0.03)] text-[#94A3B8] hover:bg-[#8B7DFF] hover:text-white hover:shadow-[0_0_20px_rgba(139,125,255,0.25)]"
          }`}
        title="Direct Messages"
      >
        <MessageSquare size={20} />
        {showDMHub && (
          <span className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-[4px] h-8 rounded-r-full bg-white shadow-[0_0_12px_rgba(139,125,255,0.4)]" />
        )}
      </button>

      <div className="w-8 h-[2px] rounded-full bg-[rgba(255,255,255,0.06)] my-1" />

      {servers.slice(0, 4).map((server: IdealServerType) => (
        <button
          key={server._id}
          onContextMenu={(e) => handleContext(e, server._id)}
          onClick={() => { getCategories(server) }}
          title={server.name}
          className={`group relative flex-shrink-0 w-12 h-12 flex items-center justify-center
      rounded-2xl hover:rounded-[14px] transition-all duration-300 ease-out
      text-white text-xs font-bold
      ring-1 ring-white/5
      hover:shadow-[0_4px_16px_rgba(139,92,246,0.35)]
      hover:scale-105 active:scale-95
      ${server._id ? "rounded-[14px]" : ""}
    `}
        >
          <img
            className="w-full h-full object-fit rounded-2xl"
            src={server?.serverIcon} alt={server?.name?.charAt(0)?.toLocaleUpperCase()} />
        </button>
      ))}

      <div className="w-8 h-[2px] rounded-full bg-[rgba(255,255,255,0.06)] my-1" />

      <button
        onClick={() => { setShowCreateServer(true); setShowDMHub(false) }}
        className="w-12 h-12 rounded-2xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#22C55E] hover:bg-[#22C55E] hover:text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-200 flex-shrink-0"
        title="Add Server"
      >
        <Plus size={22} />
      </button>

      <button
        onClick={() => setShowDMHub(false)}
        className="w-12 h-12 rounded-2xl bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#94A3B8] hover:bg-[#8B7DFF] hover:text-white hover:shadow-[0_0_20px_rgba(139,125,255,0.25)] transition-all duration-200 flex-shrink-0"
        title="Explore Public Servers"
      >
        <Compass size={20} />
      </button>

      <div className="flex-1" />

      <div className="flex flex-col items-center gap-2 pb-1">
        <div className="relative group cursor-pointer" onClick={() => setShowProfileCard(true)}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] shadow-[0_0_16px_rgba(139,125,255,0.2)] flex items-center justify-center text-white text-xs font-semibold overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={user.avatar.secure_url} alt="" />
          </div>
          <span className="absolute -bottom-[2px] -right-[2px] w-[12px] h-[12px] bg-[#22C55E] rounded-full border-[3px] border-[#08101F] shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-[4px] h-0 rounded-r-full bg-white group-hover:h-5 transition-all duration-200 shadow-[0_0_12px_rgba(139,125,255,0.4)]" />
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar
