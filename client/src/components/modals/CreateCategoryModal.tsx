import { useState, useRef, useEffect } from "react"
import Modal from "../ui/Modal"
import { useServerStore } from "../../store/server-store."
import { useAuthStore } from "../../store/auth-store"
import { useCategory } from "../../hooks/useCategory"
import { Smile } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
}

// Curated list of popular emoji and icons (emojis that look like icons)
const EMOJI_CATEGORIES = [
  {
    name: "Popular Icons",
    emojis: ["📁", "💬", "🎮", "🔊", "🛡️", "⭐", "🔥", "✨", "💡", "🔔", "🧭", "🌐", "ℹ️", "💻", "❤️", "🏆"]
  },
  {
    name: "Smileys",
    emojis: ["😀", "😊", "😂", "🤣", "😍", "😎", "🤔", "🤫", "🤯", "🥳", "😴", "😈", "👽", "👾", "🤖", "👻"]
  },
  {
    name: "Activities & Objects",
    emojis: ["👑", "🚀", "🛸", "📢", "📌", "🎨", "🛠️", "⚙️", "🔑", "🔒", "📚", "🏆", "🎵", "📹", "🍕", "🍟"]
  }
]

function CreateCategoryModal({ open, onClose }: Props) {
  const [categoryName, setCategoryName] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)

  const { selectedServer } = useServerStore()
  const { createCategory, loading } = useCategory()
  const { user } = useAuthStore()

  // Close emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".emoji-picker-btn")
      ) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleEmojiSelect = (emoji: string) => {
    const input = inputRef.current
    if (!input) {
      setCategoryName((prev) => prev + emoji)
      return
    }

    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? 0
    const text = input.value
    const before = text.substring(0, start)
    const after = text.substring(end, text.length)

    const newText = before + emoji + after
    setCategoryName(newText)

    // Keep focus and position cursor right after the newly inserted emoji
    setTimeout(() => {
      input.focus()
      const newCursorPos = start + emoji.length
      input.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const handleCreate = async () => {
    if (!categoryName.trim() || !selectedServer || !user) return;

    await createCategory({
      name: categoryName,
      serverId: selectedServer._id,
      createdBy: user._id
    })
    
    setCategoryName("")
    setShowEmojiPicker(false)
    onClose()
  }

  const handleClose = () => {
    setCategoryName("")
    setShowEmojiPicker(false)
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} width="480px" className="overflow-visible">
      <div className="p-6">
        <h2 className="text-[20px] font-bold text-white">Create Category</h2>

        <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mt-5 block mb-2">
          Category Name
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="New Category"
            className="w-full h-[40px] bg-[rgba(255,255,255,0.03)] rounded-[8px] pl-3 pr-10 text-sm text-white placeholder-[#64748B] outline-none border border-[rgba(255,255,255,0.06)] focus:border-[#8B7DFF] transition-all"
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="emoji-picker-btn absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#8B7DFF] transition-colors focus:outline-none cursor-pointer"
            title="Insert Emoji"
          >
            <Smile size={18} />
          </button>

          {showEmojiPicker && (
            <div
              ref={pickerRef}
              className="absolute right-0 top-[45px] z-50 w-[280px] bg-[#1E1F22] border border-[rgba(255,255,255,0.08)] rounded-[12px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-3 space-y-3"
            >
              <div className="text-xs font-semibold text-[#F2F3F5] border-b border-[rgba(255,255,255,0.06)] pb-1.5 flex justify-between items-center">
                <span>Select Emoji / Icon</span>
                <span className="text-[10px] text-[#8B7DFF] font-medium">Click to insert</span>
              </div>
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {EMOJI_CATEGORIES.map((category) => (
                  <div key={category.name} className="space-y-1">
                    <span className="text-[9px] font-bold text-[#94A3B8] tracking-wider uppercase block">
                      {category.name}
                    </span>
                    <div className="grid grid-cols-6 gap-1">
                      {category.emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => handleEmojiSelect(emoji)}
                          className="h-8 w-8 text-base flex items-center justify-center rounded-[6px] hover:bg-[rgba(255,255,255,0.08)] transition-all hover:scale-110 active:scale-95 cursor-pointer text-white"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <button onClick={handleClose} className="px-4 py-2 text-sm text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!categoryName.trim() || loading}
            className="px-5 py-2 rounded-[8px] bg-[#8B7DFF] text-white text-sm font-semibold hover:bg-[#7C6BFF] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(139,125,255,0.15)] transition-all duration-200 cursor-pointer"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CreateCategoryModal
