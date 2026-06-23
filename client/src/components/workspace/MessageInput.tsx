import { Bold, Italic, Link, List, Paperclip, Smile, Send } from "lucide-react"

function MessageInput() {
  return (
    <div className="px-6 pb-6 pt-0 flex-shrink-0">
      <div className="rounded-[16px] bg-[#121A2B] border border-[rgba(255,255,255,0.06)] overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 pt-3 pb-1.5 border-b border-[rgba(255,255,255,0.04)]">
          <button className="w-7 h-7 rounded-md flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors">
            <Bold size={15} />
          </button>
          <button className="w-7 h-7 rounded-md flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors">
            <Italic size={15} />
          </button>
          <button className="w-7 h-7 rounded-md flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors">
            <Link size={15} />
          </button>
          <button className="w-7 h-7 rounded-md flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-colors">
            <List size={15} />
          </button>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5">
          <button className="text-[#94A3B8] hover:text-white transition-colors flex-shrink-0">
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            placeholder="Message #general-arch"
            className="flex-1 bg-transparent text-sm text-white placeholder-[#5A6B87] outline-none"
          />
          <button className="text-[#94A3B8] hover:text-white transition-colors flex-shrink-0">
            <Smile size={18} />
          </button>
          <button className="w-9 h-9 rounded-[10px] bg-[#7C6BFF] flex items-center justify-center text-white hover:bg-[#6B5AE8] transition-colors flex-shrink-0">
            <Send size={16} />
          </button>
        </div>
      </div>

      <div className="flex justify-end mt-1.5 pr-1">
        <span className="text-[11px] text-[#5A6B87]">Markdown supported</span>
      </div>
    </div>
  )
}

export default MessageInput
