import { useState } from "react"
import Modal from "../ui/Modal"
import { Hash, Volume2, Megaphone, Lock } from "lucide-react"

const channelTypes = [
  { id: "text", icon: Hash, label: "Text Channel", desc: "Post text, images, and stickers" },
  { id: "voice", icon: Volume2, label: "Voice Channel", desc: "Hang out with voice and video" },
  { id: "announcement", icon: Megaphone, label: "Announcement Channel", desc: "Share important updates" },
]

interface Props {
  open: boolean
  onClose: () => void
}

function CreateChannelModal({ open, onClose }: Props) {
  const [selectedType, setSelectedType] = useState("text")
  const [channelName, setChannelName] = useState("")
  const [isPrivate, setIsPrivate] = useState(false)

  return (
    <Modal open={open} onClose={onClose} width="480px">
      <div className="p-6">
        <h2 className="text-[20px] font-bold text-white">Create Channel</h2>

        <div className="flex gap-2 mt-5">
          {channelTypes.map((t) => {
            const Icon = t.icon
            const active = selectedType === t.id
            return (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-[8px] border transition-all duration-200 ${
                  active
                    ? "bg-[rgba(139,125,255,0.12)] border-[#8B7DFF]"
                    : "bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.06)]"
                }`}
              >
                <Icon size={22} className={active ? "text-[#8B7DFF]" : "text-[#94A3B8]"} />
                <span className={`text-xs font-medium ${active ? "text-white" : "text-[#94A3B8]"}`}>{t.label}</span>
              </button>
            )
          })}
        </div>

        <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mt-5 block mb-2">
          Channel Name
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">#</span>
          <input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="new-channel"
            className="w-full h-[40px] bg-[rgba(255,255,255,0.03)] rounded-[8px] pl-8 pr-3 text-sm text-white placeholder-[#64748B] outline-none border border-[rgba(255,255,255,0.06)] focus:border-[#8B7DFF] transition-all"
          />
        </div>

        <label className="flex items-center gap-3 mt-4 cursor-pointer">
          <button
            onClick={() => setIsPrivate(!isPrivate)}
            className={`w-[44px] h-[24px] rounded-full transition-colors relative ${
              isPrivate ? "bg-[#8B7DFF]" : "bg-[rgba(255,255,255,0.08)]"
            }`}
          >
            <div
              className={`w-[18px] h-[18px] rounded-full bg-white absolute top-[3px] transition-all duration-200 ${
                isPrivate ? "left-[23px]" : "left-[3px]"
              }`}
            />
          </button>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white flex items-center gap-2">
              <Lock size={14} /> Private Channel
            </span>
            <span className="text-[12px] text-[#94A3B8]">Only selected members can access this channel</span>
          </div>
        </label>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#94A3B8] hover:text-white transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-[8px] bg-[#8B7DFF] text-white text-sm font-semibold hover:bg-[#7C6BFF] shadow-[0_0_12px_rgba(139,125,255,0.15)] transition-all duration-200">
            Create Channel
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateChannelModal
