import { useState } from "react"
import { X } from "lucide-react"
import Modal from "../ui/Modal"

interface AddContactModalProps {
  open: boolean
  onClose: () => void
}

function AddContactModal({ open, onClose }: AddContactModalProps) {
  const [email, setEmail] = useState("")

  const handleSend = () => {
    setEmail("")
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} width="440px">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-semibold text-white">Add New Contact</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-[13px] font-medium text-[#94A3B8] mb-2">Username or Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username or Email"
            className="w-full h-[42px] px-4 rounded-[8px] bg-[#070B17] text-[14px] text-white placeholder-[#6B7280] border border-[rgba(255,255,255,0.06)] outline-none focus:border-[rgba(139,125,255,0.3)] transition-colors"
          />
        </div>

        <button
          onClick={handleSend}
          className="w-full h-[42px] rounded-[8px] bg-[#8B7DFF] text-white text-[14px] font-semibold hover:bg-[#7C6BFF] transition-all duration-200"
        >
          Send Request
        </button>
      </div>
    </Modal>
  )
}

export default AddContactModal
