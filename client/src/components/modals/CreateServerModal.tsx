import Modal from "../ui/Modal"
import { Server, Users, GraduationCap, Code, Heart, Plus, X } from "lucide-react"

const serverTemplates = [
  { icon: <Gamepad2 size={28} />, label: "Gaming Community", desc: "Play and chat with gamers" },
  { icon: <GraduationCap size={28} />, label: "Study Group", desc: "Learn and collaborate" },
  { icon: <Code size={28} />, label: "Developer Community", desc: "Code and build together" },
  { icon: <Heart size={28} />, label: "Friends", desc: "Hang out with friends" },
]

function Gamepad2(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" x2="10" y1="11" y2="11" /><line x1="8" y1="9" x2="8" y2="13" />
      <line x1="15" x2="15.01" y1="12" y2="12" /><line x1="18" x2="18.01" y1="10" y2="10" />
      <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
    </svg>
  )
}

interface Props {
  open: boolean
  onClose: () => void
}

function CreateServerModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} width="480px">
      <div className="p-6 relative">
        <X
          onClick={() => onClose()}
          size={18} className="absolute top-5 right-5" />
        <h2 className="text-[20px] font-bold text-white text-center">Create Your Server</h2>
        <p className="text-[14px] text-[#94A3B8] text-center mt-1">
          Your server is where you and your community hang out.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5">
          {serverTemplates.map((t) => (
            <button
              key={t.label}
              className="flex flex-col items-center gap-2 p-4 rounded-[8px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(139,125,255,0.08)] hover:border-[#8B7DFF] transition-all duration-200"
            >
              <div className="text-[#8B7DFF]">{t.icon}</div>
              <span className="text-sm font-medium text-white">{t.label}</span>
              <span className="text-[11px] text-[#94A3B8] text-center">{t.desc}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
          <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">OR</span>
          <div className="flex-1 h-[1px] bg-[rgba(255,255,255,0.06)]" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] bg-[#8B7DFF] text-white text-sm font-semibold hover:bg-[#7C6BFF] shadow-[0_0_16px_rgba(139,125,255,0.2)] transition-all duration-200">
          <Plus size={18} />
          Create Custom Server
        </button>
      </div>
    </Modal>
  )
}

export default CreateServerModal
