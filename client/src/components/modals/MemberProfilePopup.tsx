import Popover from "../ui/Popover"
import { MessageCircle, Phone, ExternalLink } from "lucide-react"
import { users } from "../../data/users"

interface Props {
  open: string | null
  onClose: () => void
}

function MemberProfilePopup({ open, onClose }: Props) {
  const user = users.find((u) => u.username === open)
  if (!user) return null

  return (
    <Popover open={!!open} onClose={onClose} className="w-[320px]" top="50%" left="50%">
      <div className="w-full h-[100px] rounded-t-[8px] bg-gradient-to-r from-[#8B7DFF]/40 to-[#6B5CE7]/40" />

      <div className="px-4 pb-4">
        <div className="relative -mt-12">
          <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] shadow-[0_0_20px_rgba(139,125,255,0.25)] flex items-center justify-center text-white text-xl font-bold border-[4px] border-[#111827]">
            {user.displayName[0]}
          </div>
        </div>

        <div className="mt-2">
          <h3 className="text-lg font-bold text-white">{user.displayName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-[8px] h-[8px] rounded-full ${
              user.online ? "bg-[#22C55E]" : "bg-[#6B7280]"
            }`} />
            <span className={`text-sm ${user.online ? "text-[#22C55E]" : "text-[#6B7280]"}`}>
              {user.status}
            </span>
          </div>

          <div className="mt-3 p-3 rounded-[8px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
            <p className="text-[13px] text-[#94A3B8]">Backend Engineer</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-[4px] bg-[rgba(139,125,255,0.12)] text-[#8B7DFF] text-[11px] font-medium">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] bg-[rgba(255,255,255,0.04)] text-sm text-white hover:bg-[rgba(139,125,255,0.12)] border border-[rgba(255,255,255,0.06)] transition-colors">
            <MessageCircle size={15} />
            Send Message
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[8px] bg-[rgba(255,255,255,0.04)] text-sm text-white hover:bg-[rgba(139,125,255,0.12)] border border-[rgba(255,255,255,0.06)] transition-colors">
            <Phone size={15} />
            Call User
          </button>
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-3 py-2 mt-2 rounded-[8px] text-sm text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors">
          <ExternalLink size={14} />
          View Profile
        </button>
      </div>
    </Popover>
  )
}

export default MemberProfilePopup
