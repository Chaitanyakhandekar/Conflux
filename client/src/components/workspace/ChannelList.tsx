import { Hash, ChevronDown, Circle } from "lucide-react"
import { channelSections } from "../../data/channels"
import { users } from "../../data/users"

function ChannelList() {
  const getUserOnline = (username: string) => {
    const user = users.find((u) => u.username === username)
    return user?.online ?? false
  }

  return (
    <div className="flex-1 overflow-y-auto px-[14px] space-y-5">
      {channelSections.map((section) => (
        <div key={section.label}>
          <div className="flex items-center gap-1.5 mb-1">
            <ChevronDown size={12} className="text-white" />
            <span className="text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase">
              {section.label}
            </span>
          </div>

          <div className="space-y-[2px]">
            {section.items.map((channel) => {
              const isActive = channel.isActive
              const isDM = section.type === "dm"
              const online = isDM ? getUserOnline(channel.name) : false

              return (
                <div
                  key={channel.id}
                  className={`flex items-center gap-2 px-3 h-9 rounded-[10px] cursor-pointer text-sm transition-colors ${
                    isActive
                      ? "bg-[#1D2540] text-white"
                      : "text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)] hover:text-white"
                  }`}
                >
                  {isDM ? (
                    <div className="relative">
                      <Circle
                        size={8}
                        fill={online ? "#22C55E" : "#4B5563"}
                        color={online ? "#22C55E" : "#4B5563"}
                      />
                    </div>
                  ) : (
                    <Hash size={16} className="opacity-60 flex-shrink-0" />
                  )}
                  <span className="truncate flex-1">
                    {isDM ? channel.name : channel.name}
                  </span>
                  {channel.hasNotification && (
                    <span className="w-2 h-2 rounded-full bg-[#7C6BFF] flex-shrink-0" />
                  )}
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
