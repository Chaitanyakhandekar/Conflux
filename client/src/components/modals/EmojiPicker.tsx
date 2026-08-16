import { useState } from "react"
import Popover from "../ui/Popover"
import { Search } from "lucide-react"

const emojiCategories = [
  {
    name: "Smileys",
    emojis: ["😀", "😂", "🥹", "😊", "😎", "🤔", "😴", "🤩", "🥳", "😏", "😌", "🙃", "😉", "🤗", "🫡", "😇", "🥰", "😍", "🤪", "😜"],
  },
  {
    name: "Gaming",
    emojis: ["🎮", "🕹️", "👾", "🎯", "🎲", "♟️", "🃏", "🎳", "🏆", "🥇", "🎪", "🎨"],
  },
  {
    name: "Animals",
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐸", "🐵", "🐔", "🐧", "🐦", "🦄"],
  },
  {
    name: "Food",
    emojis: ["🍕", "🍔", "🌮", "🍜", "🍣", "🍩", "🍪", "☕", "🧋", "🍺", "🥂", "🍰", "🍦", "🥨"],
  },
  {
    name: "Symbols",
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💔", "🔥", "⭐", "💯", "✅", "❌", "💀", "☠️", "👑", "🎉"],
  },
]

interface Props {
  open: string | null
  onClose: () => void
}

function EmojiPicker({ open, onClose }: Props) {
  const [search, setSearch] = useState("")

  const filtered = search
    ? emojiCategories.flatMap((c) =>
        c.emojis.filter((e) => e.includes(search)),
      )
    : null

  return (
    <Popover open={!!open} onClose={onClose} className="w-[320px]" bottom="60px" right="100px">
      <div className="p-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search emojis"
            className="w-full h-[32px] bg-[rgba(255,255,255,0.03)] rounded-[6px] pl-8 pr-3 text-sm text-white placeholder-[#64748B] outline-none border border-[rgba(255,255,255,0.06)]"
          />
        </div>

        <div className="max-h-[260px] overflow-y-auto mt-3 space-y-3">
          {(filtered ? [{ name: "Results", emojis: filtered }] : emojiCategories).map((cat) => (
            <div key={cat.name}>
              <span className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider block mb-1">
                {cat.name}
              </span>
              <div className="grid grid-cols-8 gap-[2px]">
                {cat.emojis.map((emoji, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-[rgba(255,255,255,0.04)] text-lg transition-colors"
                    onClick={onClose}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popover>
  )
}

export default EmojiPicker
