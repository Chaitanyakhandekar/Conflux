import { Plus, Gift, Sticker, Paperclip, Smile, Send } from "lucide-react"
import { useUI } from "../../contexts/UIContext"

function MessageInput() {
  const { setShowEmojiPicker, setShowAttachmentMenu } = useUI()

  return (
    <div className="px-4 pb-4 pt-1 flex-shrink-0">
      <div className="flex items-end gap-2 bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] rounded-[10px] px-4 py-[10px] border border-[rgba(255,255,255,0.06)]">
        <button className="text-[#94A3B8] hover:text-white transition-colors flex-shrink-0 pb-1">
          <Plus size={20} />
        </button>
        <input
          type="text"
          placeholder="Message #backend-help"
          className="flex-1 bg-transparent text-sm text-white placeholder-[#64748B] outline-none leading-[20px]"
        />
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button className="w-8 h-8 rounded-[4px] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(139,125,255,0.1)] transition-colors">
            <Gift size={20} />
          </button>
          <button className="w-8 h-8 rounded-[4px] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(139,125,255,0.1)] transition-colors">
            <Sticker size={20} />
          </button>
          <button
            onClick={() => setShowAttachmentMenu(true)}
            className="w-8 h-8 rounded-[4px] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(139,125,255,0.1)] transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <button
            onClick={() => setShowEmojiPicker("input")}
            className="w-8 h-8 rounded-[4px] flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(139,125,255,0.1)] transition-colors"
          >
            <Smile size={20} />
          </button>
          <div className="w-[1px] h-6 bg-[rgba(255,255,255,0.06)] mx-1" />
          <button className="w-8 h-8 rounded-[6px] flex items-center justify-center bg-[#8B7DFF] text-white hover:bg-[#7C6BFF] shadow-[0_0_16px_rgba(139,125,255,0.25)] hover:shadow-[0_0_24px_rgba(139,125,255,0.35)] transition-all duration-200">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageInput
