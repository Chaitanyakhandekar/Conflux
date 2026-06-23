import Popover from "../ui/Popover"
import { useUI } from "../../contexts/UIContext"
import { Pencil, Settings, LogOut } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
}

function ProfileCard({ open, onClose }: Props) {
  const { setShowSettings } = useUI()

  return (
    <Popover open={open} onClose={onClose} className="w-[340px]" bottom="80px" left="12px">
      <div className="p-4">
        <div className="w-full h-[60px] rounded-[8px] bg-gradient-to-r from-[#8B7DFF]/30 to-[#6B5CE7]/30 mb-14" />

        <div className="relative -mt-20 flex flex-col items-center">
          <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-br from-[#8B7DFF] to-[#6B5CE7] shadow-[0_0_24px_rgba(139,125,255,0.3)] flex items-center justify-center text-white text-2xl font-bold">
            Y
          </div>
          <h3 className="text-lg font-bold text-white mt-2">chaitanya_dev</h3>
          <span className="text-sm text-[#94A3B8]">Chaitanya</span>

          <div className="flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-[rgba(34,197,94,0.12)] text-[#22C55E] text-xs font-medium">
            <span className="w-[6px] h-[6px] rounded-full bg-[#22C55E]" />
            Online
          </div>

          <p className="text-[13px] text-[#94A3B8] mt-3 text-center">
            Full-stack developer building Conflux
          </p>
        </div>

        <div className="mt-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-[6px] text-sm text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)] hover:text-white transition-colors">
            <Pencil size={16} />
            Edit Profile
          </button>
          <button
            onClick={() => { setShowSettings(true); onClose() }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-[6px] text-sm text-[#94A3B8] hover:bg-[rgba(255,255,255,0.04)] hover:text-white transition-colors"
          >
            <Settings size={16} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-[6px] text-sm text-[#ED4245] hover:bg-[rgba(237,66,69,0.08)] transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </Popover>
  )
}

export default ProfileCard
