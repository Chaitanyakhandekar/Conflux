import Modal from "../ui/Modal"
import { Mic, Headphones } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
  channelName: string | null
}

function VoiceJoinModal({ open, onClose, channelName }: Props) {
  return (
    <Modal open={open} onClose={onClose} width="440px">
      <div className="p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[rgba(139,125,255,0.12)] flex items-center justify-center mx-auto">
          <Headphones size={28} className="text-[#8B7DFF]" />
        </div>

        <h2 className="text-[20px] font-bold text-white mt-4">Join Voice Channel</h2>
        <p className="text-[14px] text-[#94A3B8] mt-1">
          You are about to join <span className="text-white font-medium">{channelName}</span>
        </p>

        <div className="flex items-center justify-center gap-6 mt-5">
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <Mic size={18} className="text-[#22C55E]" />
            Microphone On
          </div>
          <div className="flex items-center gap-2 text-sm text-[#94A3B8]">
            <Headphones size={18} className="text-[#22C55E]" />
            Headphones On
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <button onClick={onClose} className="px-5 py-2 text-sm text-[#94A3B8] hover:text-white transition-colors">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-[8px] bg-[#22C55E] text-white text-sm font-semibold hover:bg-[#16A34A] shadow-[0_0_16px_rgba(34,197,94,0.2)] transition-all duration-200 flex items-center gap-2">
            <Headphones size={16} />
            Join Voice
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default VoiceJoinModal
