import Popover from "../ui/Popover"
import { users } from "../../data/users"

interface Props {
  open: string | null
  onClose: () => void
}

function DMPopup({ open, onClose }: Props) {
  const user = users.find((u) => u.username === open)
  if (!user) return null

  return (
    <Popover open={!!open} onClose={onClose} className="w-[300px]" top="50%" left="50%">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] flex items-center justify-center text-white text-sm font-bold">
            {user.displayName[0]}
          </div>
          <div>
            <h3 className="text-white font-semibold">{user.displayName}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-[6px] h-[6px] rounded-full ${user.online ? "bg-[#22C55E]" : "bg-[#6B7280]"}`} />
              <span className="text-[12px] text-[#94A3B8]">{user.online ? "Online" : "Offline"}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="p-2.5 rounded-[6px] bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
            <p className="text-[13px] text-[#94A3B8]">No recent messages</p>
          </div>
        </div>

        <button className="w-full mt-3 px-4 py-2 rounded-[8px] bg-[#8B7DFF] text-white text-sm font-semibold hover:bg-[#7C6BFF] shadow-[0_0_12px_rgba(139,125,255,0.15)] transition-all duration-200">
          Open Conversation
        </button>
      </div>
    </Popover>
  )
}

export default DMPopup
