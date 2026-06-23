import { Reply, Smile, Pin, Copy, Trash2 } from "lucide-react"

function MessageActions() {
  return (
    <div className="absolute -top-[18px] right-3 hidden group-hover:flex items-center gap-[1px] bg-[#111827] border border-[rgba(255,255,255,0.06)] rounded-[8px] shadow-[0_4px_16px_rgba(0,0,0,0.4)] overflow-hidden animate-[fadeSlide_150ms_ease] z-10">
      <button className="w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors" title="Reply">
        <Reply size={16} />
      </button>
      <div className="w-[1px] h-4 bg-[rgba(255,255,255,0.06)]" />
      <button className="w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors" title="Add Reaction">
        <Smile size={16} />
      </button>
      <div className="w-[1px] h-4 bg-[rgba(255,255,255,0.06)]" />
      <button className="w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors" title="Pin">
        <Pin size={16} />
      </button>
      <div className="w-[1px] h-4 bg-[rgba(255,255,255,0.06)]" />
      <button className="w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)] transition-colors" title="Copy Text">
        <Copy size={16} />
      </button>
      <div className="w-[1px] h-4 bg-[rgba(255,255,255,0.06)]" />
      <button className="w-8 h-8 flex items-center justify-center text-[#ED4245] hover:bg-[rgba(237,66,69,0.08)] transition-colors" title="Delete Message">
        <Trash2 size={16} />
      </button>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default MessageActions
