import { ChevronDown, Hash, Volume2, Plus, Headphones } from "lucide-react"
import { channelSections } from "../../data/channels"

function ChannelList() {
  return (
    <div className="flex-1 overflow-y-auto px-2 space-y-4">
      {channelSections.map((section) => (
        <div key={section.label}>
          <div className="flex items-center justify-between group px-2 mb-1">
            <div className="flex items-center gap-1">
              <ChevronDown size={10} className="text-[#94A3B8]" />
              <span className="text-[12px] font-semibold tracking-wide text-[#6B7280] uppercase">
                {section.label}
              </span>
            </div>
            {section.label !== "DIRECT MESSAGES" && (
              <button className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-white transition-all">
                <Plus size={14} />
              </button>
            )}
          </div>

          <div className="space-y-[1px]">
            {section.items.map((channel) => {
              const isActive = channel.isActive
              const isVoice = channel.type === "voice"
              const isDM = channel.type === "dm"

              return (
                <div
                  key={channel.id}
                  className={`flex items-center gap-1.5 px-2 h-[34px] rounded-[6px] cursor-pointer text-sm transition-all duration-200 group ${
                    isActive
                      ? "bg-[rgba(139,125,255,0.14)] text-white shadow-[0_0_12px_rgba(139,125,255,0.06)]"
                      : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.03)] hover:text-white"
                  }`}
                >
                  {isVoice ? (
                    <Volume2 size={16} className="flex-shrink-0 text-[#94A3B8]" />
                  ) : isDM ? (
                    <span className="w-[6px] h-[6px] rounded-full bg-[#22C55E] flex-shrink-0 shadow-[0_0_6px_rgba(34,197,94,0.3)]" />
                  ) : (
                    <Hash size={18} className="flex-shrink-0 opacity-70" />
                  )}
                  <span className="truncate flex-1 text-[15px]">{channel.name}</span>

                  {isVoice && (
                    <span className="hidden group-hover:flex items-center text-[12px] text-[#22C55E] gap-1 flex-shrink-0">
                      {channel.users && channel.users.length > 0 && (
                        <>{channel.users.length}</>
                      )}
                    </span>
                  )}

                  {isVoice && channel.users && channel.users.length > 0 && (
                    <span className="flex items-center gap-1 text-[12px] text-[#22C55E] flex-shrink-0 lg:hidden group-hover:lg:flex">
                      <Headphones size={12} />
                    </span>
                  )}

                  {channel.hasNotification && (
                    <span className="w-2 h-2 rounded-full bg-[#8B7DFF] flex-shrink-0 shadow-[0_0_6px_rgba(139,125,255,0.4)]" />
                  )}

                  <button className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-white ml-auto flex-shrink-0 transition-all">
                    <Plus size={14} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChannelList
